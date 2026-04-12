import type { NetworkEntry } from './types';

// For Adding Sei to MetaMask
export const SEI_MAINNET_CHAIN_PARAMS = {
	chainId: '0x531', // 1329 in decimal
	chainName: 'Sei Network',
	rpcUrls: ['https://evm-rpc.sei-apis.com'],
	nativeCurrency: {
		name: 'Sei',
		symbol: 'SEI',
		decimals: 18
	},
	blockExplorerUrls: ['https://seiscan.io']
};

// Testnet (atlantic-2)
export const SEI_TESTNET_CHAIN_PARAMS = {
	chainId: '0x530', // 1328 in decimal
	chainName: 'Sei Testnet',
	rpcUrls: ['https://evm-rpc-testnet.sei-apis.com'],
	nativeCurrency: {
		name: 'Sei',
		symbol: 'SEI',
		decimals: 18
	},
	blockExplorerUrls: ['https://testnet.seiscan.io']
};

export const networks: NetworkEntry[] = [
	{
		type: 'EVM',
		name: 'Mainnet',
		chainId: '1329',
		hexChainId: '0x531',
		rpcUrl: 'https://evm-rpc.sei-apis.com',
		explorerLinks: [
			{ name: 'Seiscan', url: 'https://seiscan.io' },
			{ name: 'SeiStream', url: 'https://seistream.app' }
		],
		chainParams: SEI_MAINNET_CHAIN_PARAMS
	},
	{
		type: 'EVM',
		name: 'Testnet',
		chainId: '1328',
		hexChainId: '0x530',
		rpcUrl: 'https://evm-rpc-testnet.sei-apis.com',
		explorerLinks: [
			{ name: 'Seiscan', url: 'https://testnet.seiscan.io' },
			{ name: 'SeiStream', url: 'https://testnet.seistream.app' }
		],
		chainParams: SEI_TESTNET_CHAIN_PARAMS
	},
	{
		type: 'Cosmos',
		name: 'Mainnet',
		chainId: 'pacific-1',
		rpcUrl: 'https://rpc.sei-apis.com',
		explorerLinks: [{ name: 'Mintscan', url: 'https://www.mintscan.io/sei' }]
	},
	{
		type: 'Cosmos',
		name: 'Testnet',
		chainId: 'atlantic-2',
		rpcUrl: 'https://rpc-testnet.sei-apis.com',
		explorerLinks: [{ name: 'Mintscan', url: 'https://www.mintscan.io/sei-testnet' }]
	}
];

export async function addOrSwitchSeiNetwork(chain_params: any) {
	if (typeof window === 'undefined' || !(window as any).ethereum) {
		throw new Error('MetaMask is not installed');
	}
	try {
		// Try switching to Sei
		await (window as any).ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chain_params.chainId }]
		});
	} catch (switchError: any) {
		// This error code indicates the chain has not been added to MetaMask
		if (switchError.code === 4902) {
			await (window as any).ethereum.request({
				method: 'wallet_addEthereumChain',
				params: [chain_params]
			});
		} else {
			// Some other error
			throw switchError;
		}
	}
}
