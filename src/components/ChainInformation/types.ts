export type ChainParams = {
	/** Hex‑encoded chain ID (e.g. '0x531') */
	chainId: string;
	chainName: string;
	rpcUrls: string[];
	nativeCurrency: {
		name: string;
		symbol: string;
		decimals: number;
	};
	blockExplorerUrls: string[];
};

export type NetworkEntry = {
	name: string;
	chainId: string;
	hexChainId?: string;
	rpcUrl: string;
	explorerLinks: { name: string; url: string }[];
	chainParams: ChainParams;
};
