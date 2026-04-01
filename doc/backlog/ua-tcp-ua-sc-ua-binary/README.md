# UA-TCP UA-SC UA-Binary

**Specification**: OPC 10000-6 (Mappings), version 1.05  
**Category**: Transport  
**Profile URI**: `http://opcfoundation.org/UA-Profile/Transport/uatcp-uasc-uabinary`  

## Overview

This facet defines the three-layer protocol stack that all OPC UA TCP clients must implement:

| Layer | Document | Description |
|-------|----------|-------------|
| UA-TCP | [protocol-ua-tcp.md](./protocol-ua-tcp.md) | TCP framing and Hello/Ack handshake |
| UA-SC (UA Secure Conversation) | [ua-secure-conversation.md](./ua-secure-conversation.md) | SecureChannel establishment and message security |
| UA Binary | [ua-binary-encoding.md](./ua-binary-encoding.md) | Binary serialization of all OPC UA data types |

## Required Conformance Units

| Status | Document | Conformance Unit |
|--------|----------|-----------------|
| ✅ | [protocol-ua-tcp.md](./protocol-ua-tcp.md) | Protocol UA TCP |
| ✅ | [ua-binary-encoding.md](./ua-binary-encoding.md) | UA Binary Encoding |
| ✅ | [ua-secure-conversation.md](./ua-secure-conversation.md) | UA Secure Conversation |
