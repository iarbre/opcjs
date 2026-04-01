# Security Admin – Certificate Management

**Facet**: Core 2022 Client Facet  
**Type**: Optional  
**Status**: ❌ Not implemented  

## Description

The Security Admin – Certificate Management conformance unit extends the [Security Administration](./security-administration.md) required CU with active certificate lifecycle management capabilities:

1. **Trust list management** — the client exposes an API to add / remove trusted CA certificates and individual application certificates.
2. **Certificate store** — certificates and private keys are stored in a persistent, OS-protected location (e.g. Windows Certificate Store, Linux file-based PKI directory).
3. **Certificate revocation** — the client can check CRL (Certificate Revocation List) or use OCSP to determine whether a server certificate has been revoked.
4. **Self-signed certificate generation** — the client can generate its own self-signed application instance certificate for use in secure connections.
5. **Certificate renewal** — the client can renew its own certificate before it expires.

### OPC UA PKI directory structure (OPC 10000-6 §6.2)

```
pki/
  own/
    certs/         # Application instance certificates (own)
    private/       # Private keys
  trusted/
    certs/         # Trusted server certificates and CA certs
    crl/           # Certificate Revocation Lists
  rejected/
    certs/         # Auto-rejected server certificates (for manual review)
  issuers/
    certs/         # Issuer (intermediate CA) certificates
    crl/           # Issuer CRLs
```

### Certificate validation procedure (OPC 10000-6 §6.2)

When the client receives a server certificate during `CreateSession`:
1. Check that the certificate is syntactically valid (X.509 v3).
2. Check the `Subject Alternative Names` extension includes the server's `applicationUri`.
3. Build a chain from the server certificate to a trusted root CA.
4. Verify no certificate in the chain appears in a CRL.
5. Check that none of the certificates in the chain have expired.
6. Apply the `unknownCertificatePolicy` if the chain cannot be completed.

## Specification References

| Reference | Section | Topic |
|-----------|---------|-------|
| OPC 10000-2 §4.4 | Application Authentication | Certificate-based identity model |
| OPC 10000-6 §6.2 | Certificate Management | PKI directory layout and validation rules |
| OPC 10000-6 §6.2.4 | Issuer Certificates | Intermediate CA handling |
| OPC 10000-6 §6.2.5 | CRL | Revocation checking |
| OPC 10000-12 §6 | GDS Pull Model | Certificate management via GDS server |

Online: https://reference.opcfoundation.org/Core/Part2/v105/docs/4.4  
Online: https://reference.opcfoundation.org/Core/Part6/v105/docs/6.2

## Implementation Gap

The `trustedCAs` and `unknownCertificatePolicy` fields are stored in `SecurityConfiguration` but not actively used.  
No PKI directory management, certificate generation, CRL checking, or chain validation is implemented.

## Work Required

1. Implement an `ICertificateStore` interface with `addTrusted()`, `removeTrusted()`, `listTrusted()`, `reject()`, `getOwn()` operations.
2. Implement X.509 chain validation using the Web Crypto API or a Node.js crypto library.
3. Implement CRL loading and revocation checking.
4. Wire `ICertificateStore` into `SessionHandler.createNewSession()` to validate the server certificate received in `CreateSessionResponse`.
5. Add a self-signed certificate generation utility.

## Related Conformance Units

- [Security Administration](./security-administration.md) (required, prerequisite)
- [SecurityPolicy – None](../security-policy-none/README.md)
