import type { Chain } from 'viem';
import { sei, seiTestnet } from 'viem/chains';

export type ChainConfigs = {
	[chainId: string]: ChainConfig;
};

export type ChainConfig = {
	restUrl: string;
	rpcUrl: string;
	explorerUrl?: string;
};

export type EvmChainConfigs = {
	[chainId: string]: Chain;
};

// Cosmos configs
export const CHAIN_CONFIGS: ChainConfigs = {
	'pacific-1': {
		restUrl: 'https://rest.sei-apis.com/',
		rpcUrl: 'https://rpc.sei-apis.com',
		explorerUrl: 'https://seiscan.io'
	},
	'atlantic-2': {
		restUrl: 'https://rest-testnet.sei-apis.com',
		rpcUrl: 'https://rpc-testnet.sei-apis.com/',
		explorerUrl: 'https://testnet.seiscan.io'
	}
};

export const EVM_CHAIN_CONFIGS: EvmChainConfigs = {
	'pacific-1': sei,
	'atlantic-2': seiTestnet
};
