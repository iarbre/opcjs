import {
  DataValue,
  DiagnosticInfo,
  ReadRequest,
  ReadResponse,
  StatusCode,
  TimestampsToReturnEnum,
  getLogger,
} from 'opcjs-base'
import type { ILogger } from 'opcjs-base'

import type { IAddressSpace } from '../addressSpace/iAddressSpace.js'
import type { Session } from '../sessions/session.js'
import { makeResponseHeader } from './responseHeader.js'

/**
 * Handles the OPC UA `Read` service.
 *
 * Reads one or more node-attributes from the address space, applies
 * `maxAge` semantics (ignored — always live values), and stamps results
 * according to `timestampsToReturn`.
 *
 * @see OPC UA Part 4 §5.10.2
 */
export class AttributeService {
  private readonly logger: ILogger

  constructor(private readonly addressSpace: IAddressSpace) {
    this.logger = getLogger('services.AttributeService')
  }

  /**
   * Handles `ReadRequest` → `ReadResponse`.
   *
   * Iterates `nodesToRead`, calls {@link IAddressSpace.read} for each, and
   * stamps timestamps based on `timestampsToReturn`.
   *
   * @param request - Decoded `ReadRequest` from the client
   * @param session - Validated session (provided for audit / future use)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  read(request: ReadRequest, session: Session): ReadResponse {
    const requestHandle = request.requestHeader?.requestHandle ?? 0
    const nodesToRead = request.nodesToRead ?? []
    const timestampsToReturn = request.timestampsToReturn ?? TimestampsToReturnEnum.Neither

    this.logger.debug(`Read ${nodesToRead.length} node(s)`)

    const now = new Date()

    const results = nodesToRead.map(item => {
      if (item.nodeId == null) {
        return new DataValue(undefined, StatusCode.BadNodeIdInvalid)
      }

      const raw = this.addressSpace.read(item.nodeId, item.attributeId)

      return applyTimestamps(raw, timestampsToReturn, now)
    })

    const response = new ReadResponse()
    response.responseHeader = makeResponseHeader(requestHandle)
    response.results = results
    response.diagnosticInfos = new Array<DiagnosticInfo>(results.length).fill(new DiagnosticInfo())
    return response
  }
}

/**
 * Copy a `DataValue` applying the `timestampsToReturn` filter.
 *
 * OPC UA Part 4 §7.35:
 *   - Source: only sourceTimestamp is set (as provided by the address space)
 *   - Server: only serverTimestamp is set
 *   - Both: both are set
 *   - Neither: no timestamps are set
 */
function applyTimestamps(
  dv: DataValue,
  ttr: TimestampsToReturnEnum,
  serverNow: Date,
): DataValue {
  const wantSource =
    ttr === TimestampsToReturnEnum.Source || ttr === TimestampsToReturnEnum.Both
  const wantServer =
    ttr === TimestampsToReturnEnum.Server || ttr === TimestampsToReturnEnum.Both

  return new DataValue(
    dv.value,
    dv.statusCode,
    // Source timestamp is the responsibility of the address space; never substitute server time.
    wantSource ? dv.sourceTimestamp : undefined,
    wantServer ? serverNow : undefined,
  )
}
