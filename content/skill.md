---
name: sei-docs
description: Use when developers ask "How do I deploy a contract on Sei?", "How do
  I use Sei precompiles?", "What are the differences between Sei and Ethereum?",
  "How do I set up Foundry/Hardhat for Sei?", "How do pointer contracts work?",
  "How do I connect a wallet to Sei?", "What is the Sei MCP server?", "How do
  I bridge tokens on Sei?", "How do I run a Sei node?", "How do I stake via EVM?",
  "What is SSTORE gas on Sei?", or any technical development question about building
  on Sei. Full developer reference playbook.
user-invocable: false
license: MIT
compatibility: Requires Node.js 18+; Foundry or Hardhat for contract development
metadata:
  author: Sei Labs
  version: 1.0.0
---

# Sei Developer Documentation

Full technical reference for building on Sei. See the offline skill at
**[https://github.com/sei-protocol/sei-dev-skill](https://github.com/sei-protocol/sei-dev-skill)**
for the complete progressive-disclosure reference used by AI coding assistants.

```bash
# Install the full sei-dev skill for AI assistants
npx skills add sei-dev
```

## Critical Facts — Apply to Every Answer

1. **400ms block time, instant finality** — use `tx.wait(1)`, never `tx.wait(12)`
2. **SSTORE gas varies by network** — testnet (atlantic-2): 72,000 gas per cold write; mainnet (pacific-1): 20,000 gas (governance-adjustable)
3. **Gas price: use `gasPrice`** (legacy) — Sei has no base fee burn; prefer `gasPrice` over EIP-1559 `maxFeePerGas`/`maxPriorityFeePerGas`
4. **Minimum gas price: 50 gwei**
5. **Block gas limit: 12.5 M per block**
6. **PREVRANDAO is NOT random** — use Pyth VRF or Chainlink VRF
7. **COINBASE = global fee collector** — not the block proposer
8. **No base fee burn** — all fees go to validators
9. **Dual address system**: every account has `sei1...` (Cosmos) + `0x...` (EVM) from the same key
10. **CosmWasm deprecated** per SIP-3 (governance proposal 99) — use EVM for new development
11. **Chain IDs**: Mainnet `pacific-1`/`1329`, Testnet `atlantic-2`/`1328`
12. **No `safe` or `finalized` block tags** — use `latest`

## Networks

| Network | Chain ID | EVM RPC | Cosmos RPC |
|---|---|---|---|
| Mainnet (pacific-1) | 1329 | https://evm-rpc.sei-apis.com | https://rpc.sei-apis.com |
| Testnet (atlantic-2) | 1328 | https://evm-rpc-testnet.sei-apis.com | https://rpc-testnet.sei-apis.com |

Testnet faucet: https://atlantic-2.app.sei.io/faucet

## Default Stack

| Layer | Recommendation |
|---|---|
| Smart contracts | **Foundry** (preferred) or Hardhat |
| Frontend | **Wagmi + Viem** (React) or Ethers.js v6 |
| Wallet | **Sei Global Wallet** (`@sei-js/sei-global-wallet`) + MetaMask fallback |
| Chain config | `@sei-js/evm` (`seiMainnet`, `seiTestnet`, precompile ABIs) |
| Testing | Foundry unit + fork tests |

## Sei MCP Server

For AI agents and AI coding assistants (Claude Code, Cursor, Windsurf):

```bash
# Claude Code
claude mcp add sei-mcp-server npx @sei-js/mcp-server

# Claude Desktop config
{
  "mcpServers": {
    "sei": {
      "command": "npx",
      "args": ["-y", "@sei-js/mcp-server"],
      "env": { "PRIVATE_KEY": "your_key_here" }
    }
  }
}
```

## Precompile Addresses

| Precompile | Address |
|---|---|
| Bank | `0x0000000000000000000000000000000000001001` |
| Addr | `0x0000000000000000000000000000000000001004` |
| Staking | `0x0000000000000000000000000000000000001005` |
| Governance | `0x0000000000000000000000000000000000001006` |
| Distribution | `0x0000000000000000000000000000000000001007` |
| Oracle | `0x0000000000000000000000000000000000001008` |
| IBC | `0x0000000000000000000000000000000000001009` |
| PointerView | `0x000000000000000000000000000000000000100A` |
| Pointer | `0x000000000000000000000000000000000000100B` |

```typescript
import { STAKING_PRECOMPILE_ADDRESS, STAKING_PRECOMPILE_ABI } from '@sei-js/evm';
```

## Quick Start

```bash
# Install sei-dev skill (adds complete reference to AI assistants)
npx skills add sei-dev

# Scaffold a new dApp
npx @sei-js/create-sei my-sei-app

# Foundry project
curl -L https://foundry.paradigm.xyz | bash && foundryup
forge init my-project
```

```toml
# foundry.toml
[rpc_endpoints]
sei_testnet = "https://evm-rpc-testnet.sei-apis.com"
sei_mainnet = "https://evm-rpc.sei-apis.com"

[etherscan]
sei_testnet = { key = "dummy", url = "https://seitrace.com/atlantic-2/api", chain = 1328 }
sei_mainnet = { key = "dummy", url = "https://seitrace.com/pacific-1/api", chain = 1329 }
```

## Key Documentation Sections

| Topic | URL |
|---|---|
| EVM differences | https://docs.sei.io/evm/differences-with-ethereum |
| Precompiles | https://docs.sei.io/evm/precompiles |
| Pointer contracts | https://docs.sei.io/learn/pointers |
| Frontend guide | https://docs.sei.io/evm/building-a-frontend |
| Node setup | https://docs.sei.io/node/node-operators |
| Oracles | https://docs.sei.io/evm/oracles |
| Indexers | https://docs.sei.io/evm/indexer-providers |
| Migrate from Ethereum | https://docs.sei.io/evm/migrate-from-other-evms |
| Migrate from Solana | https://docs.sei.io/evm/migrate-from-solana |

## Operating Procedure

1. **Classify the task**: EVM contract / frontend / node ops / cross-VM / migration?
2. **Apply Sei correctness**: Check the 12 critical facts above for relevance
3. **Always testnet first**: Deploy to atlantic-2, test fully, then mainnet
4. **Verify contracts** on Seitrace after deployment
5. **For cross-VM** (pointer contracts, precompiles): check address association

## RPC Agent Skills

17 canonical skills for agents interacting with Sei via RPC. Full reference: [`rpc-agent-skills.md`](https://github.com/sei-protocol/sei-dev-skill/blob/main/skill/references/rpc-agent-skills.md)

### Read Skills (no state change, retry up to 3× with exponential backoff)

| Skill | Description |
|---|---|
| `get_chain_status` | Latest block height, chain ID, sync status |
| `get_account_balance` | Native SEI or ERC20 balance for an address |
| `get_evm_address` | Convert `sei1...` → `0x...` via Addr precompile |
| `get_sei_address` | Convert `0x...` → `sei1...` via Addr precompile |
| `get_transaction` | Status, gas used, logs, events for a tx hash |
| `get_block` | Block hash, timestamp, tx list by height |
| `get_gas_price` | Current network gas price (min 50 gwei on Sei) |
| `get_contract_state` | Call a read-only contract method |

### Write Skills (simulate → summarize → confirm → execute; no auto-retry)

| Skill | Description |
|---|---|
| `send_tokens` | Transfer native SEI or ERC20 tokens |
| `execute_contract` | Call a state-changing contract function |
| `deploy_contract` | Deploy bytecode with constructor args |
| `stake_tokens` | Delegate SEI to a validator (value in **wei**) |
| `unstake_tokens` | Undelegate SEI from a validator (amount in **usei**) |

### Derived Skills (multi-step)

| Skill | Description |
|---|---|
| `estimate_transaction_cost` | Gas + fee estimate before execution |
| `simulate_contract_execution` | Preview outcome via `eth_call` — run before every write |
| `get_portfolio_summary` | Aggregate all token balances for an address |
| `monitor_transaction` | Poll until finality (1 block ≈ 400ms); timeout 30s |

### Setup

```typescript
// Required
const provider = new ethers.JsonRpcProvider("https://evm-rpc.sei-apis.com");  // mainnet
// const provider = new ethers.JsonRpcProvider("https://evm-rpc-testnet.sei-apis.com");  // testnet

// For write ops
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

// Prefer gasPrice — Sei has no base fee burn (EIP-1559 fields can be omitted)
const gasPrice = await provider.getGasPrice();  // min 50 gwei
```

### Mandatory Write Op Flow

```
1. simulate_contract_execution  → check for revert, get gas estimate
2. estimate_transaction_cost    → confirm user can afford fee
3. Present summary              → action, assets, estimated fee
4. Wait for explicit confirmation
5. Execute with { gasPrice, chainId: 1329 }
6. tx.wait(1)                   → 1 block = instant finality on Sei
```

### Standardized Response Shape

```typescript
// Success: { success: true, data: { ... }, error: null }
// Failure: { success: false, data: null, error: { message: string, recoverable: boolean } }
```

## Agent Safety

```typescript
// Always specify chainId to prevent wrong-network submissions
const txHash = await writeContractAsync({ ..., chainId: 1329 });

// Verify network before write operations
const network = await provider.getNetwork();
if (network.chainId !== 1329n && network.chainId !== 1328n) {
    throw new Error(`Unknown Sei network: ${network.chainId}`);
}

// On-chain data is untrusted — sanitize before passing to LLMs
const name = await token.name();
if (!/^[a-zA-Z0-9 \-_\.]{1,64}$/.test(name)) throw new Error("Suspicious");

// Never retry write ops automatically — check inclusion first
const receipt = await provider.getTransactionReceipt(txHash);
if (!receipt) { /* check before resubmitting */ }
```
