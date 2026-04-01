# SecurityPolicy – None

**Specification**: OPC 10000-7 §7.x (Profiles) + OPC 10000-6 §6.1, version 1.05  
**Profile URI**: `http://opcfoundation.org/UA-Profile/Security/None`  
**Policy URI**: `http://opcfoundation.org/UA/SecurityPolicy#None`  
**Category**: Security  

## Overview

The SecurityPolicy – None profile specifies that a client can communicate without any message-level security.  
All cryptographic operations (signing, encryption, key derivation) are no-ops.

> **Warning**: SecurityPolicy None must never be used in production environments as it provides no protection against eavesdropping, tampering, or spoofing.

## Required Conformance Units

| Status | Document | Conformance Unit |
|--------|----------|-----------------|
| ✅ | [asymmetric-encryption-algorithm-none.md](./asymmetric-encryption-algorithm-none.md) | AsymmetricEncryptionAlgorithm_None |
| ✅ | [asymmetric-signature-algorithm-none.md](./asymmetric-signature-algorithm-none.md) | AsymmetricSignatureAlgorithm_None |
| ✅ | [key-derivation-algorithm-none.md](./key-derivation-algorithm-none.md) | KeyDerivationAlgorithm_None |
| ✅ | [security-none-create-activate-session.md](./security-none-create-activate-session.md) | Security None CreateSession ActivateSession |
| ✅ | [security-policy-none-limits.md](./security-policy-none-limits.md) | SecurityPolicy_None_Limits |
| ✅ | [symmetric-encryption-algorithm-none.md](./symmetric-encryption-algorithm-none.md) | SymmetricEncryptionAlgorithm_None |
| ✅ | [symmetric-signature-algorithm-none.md](./symmetric-signature-algorithm-none.md) | SymmetricSignatureAlgorithm_None |

## Optional Conformance Units

| Status | Document | Conformance Unit |
|--------|----------|-----------------|
| ✅ | [security-none-create-activate-session-v1.md](./security-none-create-activate-session-v1.md) | Security None CreateSession ActivateSession 1.0 |
