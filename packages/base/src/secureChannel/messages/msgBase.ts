import { BinaryWriter } from "../../codecs/binary/binaryWriter";
import { IEncryptionAlgorithm } from "../../cryption/iEncryptionAlgorithm";
import { MsgHeader } from "./msgHeader";
import { MsgSequenceHeader } from "./msgSequenceHeader";

export abstract class MsgBase {
    static DecryptAndVerify(
        data: Uint8Array,
        encryptionAlgorithm: IEncryptionAlgorithm,
        headerLength: number): Uint8Array {

        if (encryptionAlgorithm.IsAuthenticated()) {
            throw new Error("Not implemented");
        } else {
            // decrypt
            const dataToDecrypt = data.slice(headerLength, data.length);
            const decryptedData = encryptionAlgorithm.Decrypt(dataToDecrypt);

            // verify
            const signatureLength = encryptionAlgorithm.GetSignatureLength();
            const receivedData = decryptedData.slice(0, decryptedData.length - signatureLength);
            if (signatureLength > 0) {
                const receivedSignature = decryptedData.slice(decryptedData.length - signatureLength);
                const verificationBytes = new Uint8Array([
                    ...dataToDecrypt.slice(0, headerLength),
                    ...decryptedData.slice(0, decryptedData.length - signatureLength)
                ]);
                const isValid = encryptionAlgorithm.VerifySignature(verificationBytes, receivedSignature);
                if (!isValid) {
                    throw new Error("Signature verification failed");
                }
            }

            return receivedData;
        }
    }

    protected Encrypt(
        buffer: BinaryWriter,
        encryptionAlgorithm: IEncryptionAlgorithm, headerSize: number, paddingPosition: number): Uint8Array {

        if (encryptionAlgorithm.IsAuthenticated()) {
            // todo: implement authenticated encryption
            throw new Error("Not implemented");
        } else {
            // add padding bytes
            // https://reference.opcfoundation.org/Core/Part6/v105/docs/6.7.2.5.1
            if (encryptionAlgorithm.HasPadding()) {
                const bytesToWrite = buffer.getLength() - headerSize;
                const padding = encryptionAlgorithm.GetPadding(bytesToWrite)
                buffer.insertBytesAt(padding, paddingPosition);
            }
            
            // write message size so signature is correct
            const dataSize = buffer.getLength();
            const encryptedDataSize = encryptionAlgorithm.GetEncryptedSize(dataSize);
            buffer.writeUInt32At(encryptedDataSize, 4); // update message size

            // calculate signature
            const signature = encryptionAlgorithm.CalculateSignature(buffer.getData());
            buffer.writeBytes(signature);

            // encrypt
            const encryptedData = encryptionAlgorithm.Encrypt(
                buffer.getData().slice(headerSize));

            return encryptedData;
        }
    }

    public abstract encode(
        buffer: BinaryWriter,
        encryptionAlgorithm: IEncryptionAlgorithm): void;

    constructor(public header: MsgHeader, public sequenceHeader: MsgSequenceHeader, public body: unknown) {}
}