---
title: 'USDC on Sei'
description: 'Guide to integrating USDC stablecoin on Sei using Viem and Node.js for transfers and balance checks.'
keywords: ['USDC', 'Sei', 'Circle', 'stablecoin', 'ERC-20', 'Viem', 'payments', 'token transfer', 'web3', 'cryptocurrency']
---

# USDC on Sei (Developers)

## Addresses and Decimals

- Testnet (atlantic-2) USDC: [`0x4fCF1784B31630811181f670Aea7A7bEF803eaED`](https://testnet.seiscan.io/address/0x4fCF1784B31630811181f670Aea7A7bEF803eaED)
- Mainnet (pacific-1) USDC: [`0xe15fC38F6D8c56aF07bbCBe3BAf5708A2Bf42392`](https://seiscan.io/address/0xe15fC38F6D8c56aF07bbCBe3BAf5708A2Bf42392)
- Decimals: `6`

## Overview

USDC is a digital dollar issued by [Circle](http://developers.circle.com), also known as a stablecoin, running on many of the world's leading blockchains. Designed to represent US dollars on the internet, USDC is backed 100% by highly liquid cash and cash-equivalent assets so that it's always redeemable 1:1 for USD. It is commonly used for payments, trading, and on/off-ramps in web3 apps.

On the **Sei**, USDC can be transferred like any standard ERC-20 token — enabling fast, secure, and programmable digital dollar transactions.

This guide walks you through building a standalone index.js script using **Viem** and **Node.js** to check your USDC balance and send a test transfer to another address. The sample is a minimal, generic ERC‑20 flow using USDC as the example token.

### Prerequisites

- Node.js v18+ with "type": "module" in package.json
- viem and dotenv installed
- Sei wallet with USDC and SEI for gas on your selected network (default: testnet).
- To get testnet USDC on Sei, use the [Circle Faucet](https://faucet.circle.com) or use [Circle’s CCTP v2](https://replit.com/@buildoncircle/cctp-v2-web-app?v=1#README.md) Sample application to transfer USDC cross-chain to your Sei wallet.
- Private key and recipient address stored in a .env file
- Optional: set `SEI_NETWORK=testnet|mainnet` (defaults to `testnet`)

## Project Setup

Follow these steps to set up your project and environment:

- Initialize a Node.js project and install dependencies: create a project folder and run:

```shell
npm init -y
npm install viem dotenv
```

- **Prepare environment variables**: In the project root, create a file named .env and add your private key and recipient address:

```
PRIVATE_KEY=<YOUR_PRIVATE_KEY>       # 0x-prefixed 64-hex-character key
RECIPIENT_ADDRESS=0x<RECIPIENT_ADDRESS>
# Optional (defaults to testnet): testnet | mainnet
SEI_NETWORK=testnet
```

- **Create the script file**: Create an index.js file in the project directory. We will build this script step by step in the next section. Ensure that your Node environment can handle ES module imports (the code uses import syntax).

## Script Breakdown

Open index.js in your editor and add the following sections. Each part of the script is explained below:

1\. Import Modules and Define Chain/Token Constants: First, import required functions from Viem and set up constants for Sei networks (testnet and mainnet) and the USDC token contract.

This includes chain ID, RPC URL, token address, decimals, and a minimal ABI for the USDC contract’s balanceOf and transfer functions (just the function signatures we need):

```ts
import 'dotenv/config';
import { createPublicClient, createWalletClient, http, formatUnits, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

// --- Chain and Contract Config ---
const seiTestnet = {
	id: 1328,
	name: 'Sei Atlantic-2 Testnet',
	network: 'sei-atlantic-2',
	nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
	rpcUrls: { default: { http: ['https://evm-rpc-testnet.sei-apis.com'] } },
	blockExplorers: { default: { url: 'https://testnet.seiscan.io' } },
	testnet: true
};

const seiMainnet = {
	id: 1329,
	name: 'Sei Mainnet (pacific-1)',
	network: 'sei-pacific-1',
	nativeCurrency: { name: 'Sei', symbol: 'SEI', decimals: 18 },
	rpcUrls: { default: { http: ['https://evm-rpc.sei-apis.com'] } },
	blockExplorers: { default: { url: 'https://seiscan.io' } },
	testnet: false
};

// --- Network selection (default: testnet) ---
const NETWORK = (process.env.SEI_NETWORK || 'testnet').toLowerCase();
const chain = NETWORK === 'mainnet' ? seiMainnet : seiTestnet;

// --- USDC Addresses and ABI ---
const USDC_ADDRESSES = {
	testnet: '0x4fCF1784B31630811181f670Aea7A7bEF803eaED',
	mainnet: '0xe15fC38F6D8c56aF07bbCBe3BAf5708A2Bf42392'
};
const USDC_ADDRESS = NETWORK === 'mainnet' ? USDC_ADDRESSES.mainnet : USDC_ADDRESSES.testnet;
const USDC_DECIMALS = 6;
const USDC_ABI = [
	{
		name: 'balanceOf',
		type: 'function',
		stateMutability: 'view',
		inputs: [{ name: 'account', type: 'address' }],
		outputs: [{ name: '', type: 'uint256' }]
	},
	{
		name: 'transfer',
		type: 'function',
		stateMutability: 'nonpayable',
		inputs: [
			{ name: 'to', type: 'address' },
			{ name: 'amount', type: 'uint256' }
		],
		outputs: [{ name: '', type: 'bool' }]
	}
];
```

2\. **Load Environment Variables and Validate Input:**

Next, load the private key and recipient from the environment and validate them. The script checks that the variables exist and that the recipient address looks valid, then normalizes the private key string:

```ts
// --- Environment Variables ---
const PRIVATE_KEY_RAW = process.env.PRIVATE_KEY;
const RECIPIENT = process.env.RECIPIENT_ADDRESS || process.env.RECIPIENT;

if (!PRIVATE_KEY_RAW) {
	console.error('Error: Set PRIVATE_KEY in your .env file');
	process.exit(1);
}
if (!RECIPIENT) {
	console.error('Error: Set RECIPIENT_ADDRESS (or RECIPIENT) in your .env file');
	process.exit(1);
}
if (!/^0x[a-fA-F0-9]{40}$/.test(RECIPIENT)) {
	console.error('Error: Recipient address is not a valid Ethereum address');
	process.exit(1);
}

// --- Private Key Normalization ---
const PRIVATE_KEY = PRIVATE_KEY_RAW.startsWith('0x') ? PRIVATE_KEY_RAW : '0x' + PRIVATE_KEY_RAW;
```

This ensures we have the necessary inputs. If the private key or recipient address is missing or malformed, the script logs an error and exits. The private key is prefixed with "0x" if not already present (Viem expects a 0x-prefixed key).

After this, PRIVATE_KEY is a clean hex string and RECIPIENT is a validated address.

3\. Initialize Viem Clients:

Using the chain config and credentials, we create a public client for reading blockchain data and a wallet client for writing (signing transactions). We also derive an account object from the private key:

```ts
// --- Client Setup ---
const account = privateKeyToAccount(PRIVATE_KEY);
const publicClient = createPublicClient({ chain, transport: http() });
const walletClient = createWalletClient({ account, chain, transport: http() });
```

- privateKeyToAccount converts the hex private key into an account object (with the corresponding address, etc.).
- createPublicClient connects to the selected Sei network RPC for read-only calls (no private key needed).
- createWalletClient uses our account and the RPC to allow sending transactions.

At this point, we’re set up to interact with the selected Sei network: publicClient will call eth_call for contract reads, and walletClient will handle signing and sending transactions from our account.

4\. Main Transfer Logic:

Finally, we write an asynchronous function to perform the USDC transfer. It will check the sender’s USDC balance, ensure it’s sufficient, then invoke the USDC contract’s transfer function.

We also log key info and handle errors:

```ts
// --- Main Transfer Logic ---
(async () => {
	try {
		// Check sender's USDC balance
		const balance = await publicClient.readContract({
			address: USDC_ADDRESS,
			abi: USDC_ABI,
			functionName: 'balanceOf',
			args: [account.address]
		});
		const balanceFormatted = Number(formatUnits(balance, USDC_DECIMALS));
		const amount = 10; // amount of USDC to send (in whole units)
		console.log('Sender:', account.address);
		console.log('Recipient:', RECIPIENT);
		console.log('USDC balance:', balanceFormatted);
		if (amount > balanceFormatted) {
			console.error('Error: Insufficient USDC balance');
			process.exit(1);
		}

		// Convert amount to token decimals and send transfer
		const amountInDecimals = parseUnits(amount.toString(), USDC_DECIMALS);
		const hash = await walletClient.writeContract({
			address: USDC_ADDRESS,
			abi: USDC_ABI,
			functionName: 'transfer',
			args: [RECIPIENT, amountInDecimals]
		});
		console.log('Transfer successful!');
		console.log('Tx hash:', hash);
		const explorerBase =
			chain.blockExplorers && chain.blockExplorers.default && chain.blockExplorers.default.url ? chain.blockExplorers.default.url : 'https://seiscan.io';
		console.log('Explorer:', `${explorerBase}&tx=${hash}`);
	} catch (err) {
		console.error('Transfer failed:', err.message || err);
		process.exit(1);
	}
	process.exit(0);
})();
```

- The script uses publicClient.readContract to call the USDC contract’s balanceOf(address) and get the sender’s token balance.

- We format the balance from smallest units (6 decimals for USDC) into a human-readable number with formatUnits. The amount is set to 10 USDC in this example – you can adjust this value. We compare the desired amount to the current balance; if insufficient, it logs an error and exits.

- If the balance is adequate, we use parseUnits to convert 10 USDC into the raw token amount (10 \* 10^6, since USDC has 6 decimals).  
  Then walletClient.writeContract calls the USDC contract’s transfer(to, amount) function. This sends a transaction from our account to transfer the tokens. On success, it returns a transaction hash, which we log alongside a URL to view the transaction on the Sei block explorer.

- Errors in the try/catch (for example, RPC issues or a transaction failure) will log “Transfer failed” with the error message. The script ends with process.exit(0) to terminate after completing the async function.

## Run the Script

With index.js completed, you can run the script from your terminal:

```shell
# Default: testnet
node index.js

# Mainnet
SEI_NETWORK=mainnet node index.js
```

The expected output will look like the following if the transfer succeeds (your addresses and values will differ):

```
Sender: 0x1A2b...7890      # your sender address
Recipient: 0x9F8f...1234   # recipient address
USDC balance: 250.0        # current USDC balance of sender
Transfer successful!
Tx hash: 0xabc123...def456 # transaction hash of the transfer
Explorer: https://testnet.seiscan.io/tx/0xabc123...def456
```

You should see “Transfer successful\!” and a transaction hash. You can copy the explorer URL into a browser to view the transaction details on Seiscan.

Continue building by checking for more information in the [Circle Developer Docs.](https://developers.circle.com/)

### Important Notes

- Testnet Only: Sei testnet USDC has no real value. Don’t use mainnet keys or expect real funds.
- Security: Store private keys in `.env`; never commit secrets. Use best practices for key management.
- Gas Fees: You’ll need a small amount of testnet SEI to cover gas.
- Lightweight ABI: Only `balanceOf` and `transfer` are used — enough for simple transfers.
- Viem Behavior: `readContract` and `writeContract` handle reads/writes. The private key is auto-prefixed with `0x`.
