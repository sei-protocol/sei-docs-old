import nextra from 'nextra';

const withNextra = nextra({
	latex: { renderer: 'katex' },
	search: {
		codeblocks: false
	},
	defaultShowCopyCode: true,
	mdxOptions: {
		rehypePrettyCodeOptions: {
			theme: {
				light: 'github-light-default',
				dark: 'github-dark-default'
			}
		}
	}
});

export default withNextra({
	productionBrowserSourceMaps: false,
	compress: true,
	experimental: {
		optimizePackageImports: ['sonner', 'viem', 'nextra-theme-docs']
	},
	outputFileTracingIncludes: {
		'/api/chat': ['./lib/search-index.json'],
		'/api/mcp': ['./lib/search-index.json']
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
		reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-test$', '^data-testid$', '^data-cy$'] } : false
	},
	images: {
		unoptimized: false,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sei.io',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'cdn.prod.website-files.com',
				pathname: '/65cb43fecf24523357feada9/**'
			},
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				pathname: '/images/71yb5mbj/**'
			}
		]
	},
	async headers() {
		return [
			{
				source: '/_next/static/css/(.*)',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=3600, immutable' },
					{ key: 'Vercel-CDN-Cache-Control', value: 'public, max-age=3600, immutable' },
					{ key: 'X-Robots-Tag', value: 'noindex' }
				]
			},
			{
				source: '/_next/static/(.*)',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=3600, immutable' },
					{ key: 'Vercel-CDN-Cache-Control', value: 'public, max-age=3600, immutable' }
				]
			},
			{
				source: '/assets/(.*)',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=3600, immutable' },
					{ key: 'Vercel-CDN-Cache-Control', value: 'public, max-age=3600, immutable' }
				]
			},
			{
				source: '/(.*)\\.(png|svg|jpg|jpeg|gif|webp|ico|woff2?)',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=3600, immutable' },
					{ key: 'Vercel-CDN-Cache-Control', value: 'public, max-age=3600, immutable' }
				]
			},
			{
				source: '/(.*)\\.(md|txt)',
				headers: [
					{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
					{ key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' },
					{ key: 'Vercel-CDN-Cache-Control', value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800' },
					{ key: 'X-Robots-Tag', value: 'noindex' }
				]
			},
			{
				source: '/(.*)',
				headers: [
					{ key: 'Cache-Control', value: 'public, max-age=300, s-maxage=3600, stale-while-revalidate=604800' },
					{ key: 'Vercel-CDN-Cache-Control', value: 'public, max-age=300, s-maxage=3600, stale-while-revalidate=604800' }
				]
			}
		];
	},
	async redirects() {
		return [
			{
				source: '/:module(cosmos|cosmwasm)/api/:path*',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/cosmos/:path*',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/cosmwasm/:path*',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/seichain/:path*',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/sei-protocol/:path*',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/cosmos-sdk/api/:path*',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/evm/bridging',
				destination: '/evm/bridging/layerzero',
				permanent: true
			},
			{
				source: '/evm/wallet-integrations',
				destination: '/evm/wallet-integrations/thirdweb',
				permanent: true
			},
			{
				source: '/evm/indexer-providers',
				destination: '/evm/indexer-providers/the-graph',
				permanent: true
			},
			{
				source: '/evm/ai-tooling',
				destination: '/evm/ai-tooling/mcp-server',
				permanent: true
			},
			{
				source: '/evm/agent-kits',
				destination: '/evm/ai-tooling/cambrian-agent-kit',
				permanent: true
			},
			{
				source: '/evm/agent-kits/cambrian-agent-kit',
				destination: '/evm/ai-tooling/cambrian-agent-kit',
				permanent: true
			},
			{
				source: '/evm/cosmwasm-precompiles',
				destination: '/evm/precompiles/cosmwasm-precompiles/example-usage',
				permanent: true
			},
			{
				source: '/evm/bridging/tasks/:task*',
				destination: '/evm/bridging/layerzero',
				permanent: true
			},
			{
				source: '/evm/debugging-with-seid',
				destination: '/evm/debugging-contracts',
				permanent: true
			},
			{
				source: '/evm/evm-transactions',
				destination: '/evm/transactions',
				permanent: true
			},
			{
				source: '/evm/pointers',
				destination: '/evm/reference',
				permanent: true
			},
			{
				source: '/evm/pointers/standard',
				destination: '/evm/reference',
				permanent: true
			},
			{
				source: '/evm/pointers/erc1155',
				destination: '/evm/reference',
				permanent: true
			},
			{
				source: '/evm/pointers/tokenfactory',
				destination: '/evm/reference',
				permanent: true
			},
			{
				source: '/evm/pointers/ibc',
				destination: '/evm/reference',
				permanent: true
			},
			{
				source: '/evm/artifacts',
				destination: '/evm/debugging-contracts',
				permanent: true
			},
			{
				source: '/evm/contracts',
				destination: '/evm/evm-general',
				permanent: true
			},
			{
				source: '/evm/cache',
				destination: '/evm/evm-general',
				permanent: true
			},
			{
				source: '/evm/test',
				destination: '/evm/debugging-contracts',
				permanent: true
			},
			{
				source: '/develop/get-started/local-dependencies',
				destination: '/evm/installing-seid',
				permanent: true
			},
			{
				source: '/develop/media-package',
				destination: '/learn/general-brand-kit',
				permanent: true
			},
			{
				source: '/develop/resources',
				destination: '/learn/pointers',
				permanent: true
			},
			{
				source: '/develop/get-started/spot-exchange-tutorial',
				destination: '/evm/evm-general',
				permanent: true
			},
			{
				source: '/full-node/run-a-sei-validator/validator-faq',
				destination: '/node/validators',
				permanent: true
			},
			{
				source: '/advanced/parallelism',
				destination: '/learn/parallelization-engine',
				permanent: true
			},
			{
				source: '/advanced/governance',
				destination: '/learn/general-governance',
				permanent: true
			},
			{
				source: '/advanced/native-oracle',
				destination: '/learn/oracles',
				permanent: true
			},
			{
				source: '/advanced/ibc-transfers',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/advanced/javascript-reference@next.config.mjs',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/develop/:path*',
				destination: '/evm',
				permanent: true
			},
			{
				source: '/full-node/:path*',
				destination: '/node',
				permanent: true
			},
			{
				source: '/advanced/:path*',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/swagger/:path*',
				destination: '/node/swagger',
				permanent: true
			},
			// Malformed root paths / stray characters
			{
				source: "/'",
				destination: '/',
				permanent: true
			},
			{
				source: '/)',
				destination: '/',
				permanent: true
			},
			{
				source: '/:os(Users|home|root|etc|var|usr|tmp|dev)/:rest*',
				destination: '/node/troubleshooting',
				permanent: true
			},
			{
				source: '/metrics',
				destination: '/',
				permanent: true
			},
			{
				source: '/data',
				destination: '/node',
				permanent: true
			},
			{
				source: '/config',
				destination: '/node',
				permanent: true
			},
			{
				source: '/tmp',
				destination: '/node',
				permanent: true
			},
			{
				source: '/.sei/:path*',
				destination: '/node',
				permanent: true
			},
			{
				source: '/.hermes/:path*',
				destination: '/node',
				permanent: true
			},
			{
				source: '/key_backup/:path*',
				destination: '/node',
				permanent: true
			},
			{
				source: '/sei-config-:rest(.*)',
				destination: '/node',
				permanent: true
			},
			{
				source: '/sei-data-:rest(.*)',
				destination: '/node',
				permanent: true
			},
			{
				source: '/validator_key_',
				destination: '/node',
				permanent: true
			},
			{
				source: '/priv_validator_:rest(.*)',
				destination: '/node',
				permanent: true
			},
			{
				source: '/genesis.json',
				destination: '/node',
				permanent: true
			},
			{
				source: '/block',
				destination: '/node',
				permanent: true
			},
			{
				source: '/learn/mev',
				destination: '/evm/best-practices/optimizing-for-parallelization',
				permanent: true
			},
			{
				source: '/learn/mev-plugins',
				destination: '/evm/best-practices/optimizing-for-parallelization',
				permanent: true
			},
			{
				source: '/mev/:path*',
				destination: '/evm/best-practices/optimizing-for-parallelization',
				permanent: true
			},
			{
				source: '/build-on-sei/evm',
				destination: '/evm/evm-general',
				permanent: true
			},
			{
				source: '/evm/precompiles',
				destination: '/evm/precompiles/example-usage',
				permanent: true
			},
			{
				source: '/evm/precompiles/artifacts/:path*',
				destination: '/evm/debugging-contracts',
				permanent: true
			},
			{
				source: '/evm/MyContract.json',
				destination: '/evm/debugging-contracts',
				permanent: true
			},
			{
				source: '/subgraphs/:path*',
				destination: '/evm/indexer-providers/the-graph',
				permanent: true
			},
			{
				source: '/whitepaper/:path*',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/general-overview',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/general-staking',
				destination: '/learn/general-staking',
				permanent: true
			},
			{
				source: '/general-governance',
				destination: '/learn/general-governance',
				permanent: true
			},
			{
				source: '/general-submit-feedback',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/general-brand-kit',
				destination: '/learn/general-brand-kit',
				permanent: true
			},
			{
				source: '/user-quickstart',
				destination: '/learn/user-quickstart',
				permanent: true
			},
			{
				source: '/user-guides/wallet-setup',
				destination: '/learn/wallet-setup',
				permanent: true
			},
			{
				source: '/user-guides/linking-addresses',
				destination: '/learn/linking-addresses',
				permanent: true
			},
			{
				source: '/user-guides/getting-tokens',
				destination: '/learn/getting-tokens',
				permanent: true
			},
			{
				source: '/user-guides/block-explorers',
				destination: '/learn/block-explorers',
				permanent: true
			},
			{
				source: '/user-guides/bridging',
				destination: '/evm/bridging',
				permanent: true
			},
			{
				source: '/learn/bridging',
				destination: '/evm/bridging',
				permanent: true
			},
			{
				source: '/evm/bridging/third-web',
				destination: '/evm/bridging/thirdweb',
				permanent: true
			},
			{
				source: '/user-guides/wrapped-sei',
				destination: '/evm/tokens',
				permanent: true
			},
			{
				source: '/user-guides/ledger-setup',
				destination: '/learn/ledger-setup',
				permanent: true
			},
			{
				source: '/user-FAQ',
				destination: '/learn/user-quickstart',
				permanent: true
			},
			{
				source: '/dev-intro',
				destination: '/evm',
				permanent: true
			},
			{
				source: '/dev-chains',
				destination: '/learn/dev-chains',
				permanent: true
			},
			{
				source: '/dev-token-standards',
				destination: '/learn/dev-token-standards',
				permanent: true
			},
			{
				source: '/dev-gas',
				destination: '/learn/dev-gas',
				permanent: true
			},
			{
				source: '/dev-transactions',
				destination: '/learn/dev-transactions',
				permanent: true
			},
			{
				source: '/dev-smart-contracts',
				destination: '/evm/evm-general',
				permanent: true
			},
			{
				source: '/dev-querying-state',
				destination: '/evm/querying-the-evm',
				permanent: true
			},
			{
				source: '/dev-interoperability',
				destination: '/learn/dev-interoperability',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/addr',
				destination: '/reference/precompiles/addr',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/bank',
				destination: '/reference/precompiles/bank',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/cosmwasm',
				destination: '/reference/precompiles/cosmwasm',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/distribution',
				destination: '/reference/precompiles/distribution',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/example-usage',
				destination: '/reference/precompiles/example-usage',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/governance',
				destination: '/reference/precompiles/governance',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/ibc',
				destination: '/reference/precompiles/ibc',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/json',
				destination: '/reference/precompiles/json',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/oracle',
				destination: '/reference/precompiles/oracle',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/pointer',
				destination: '/reference/precompiles/pointer',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/pointerview',
				destination: '/reference/precompiles/pointerview',
				permanent: true
			},
			{
				source: '/dev-interoperability/precompiles/staking',
				destination: '/reference/precompiles/staking',
				permanent: true
			},
			{
				source: '/dev-interoperability/pointer-contracts',
				destination: '/reference/pointer-contracts',
				permanent: true
			},
			{
				source: '/dev-frontend-dapps',
				destination: '/evm/building-a-frontend',
				permanent: true
			},
			{
				source: '/dev-node/intro',
				destination: '/node',
				permanent: true
			},
			{
				source: '/dev-node/quickstart',
				destination: '/node/node-operators',
				permanent: true
			},
			{
				source: '/dev-node/node-operators',
				destination: '/node/node-operators',
				permanent: true
			},
			{
				source: '/dev-node/node-configuration',
				destination: '/node/node-configuration',
				permanent: true
			},
			{
				source: '/dev-node/configure-general-settings',
				destination: '/node/configure-general-settings',
				permanent: true
			},
			{
				source: '/dev-node/swagger-docs-endpoint',
				destination: '/node/swagger-docs-endpoint',
				permanent: true
			},
			{
				source: '/dev-node/join-a-network',
				destination: '/node/join-a-network',
				permanent: true
			},
			{
				source: '/dev-node/running-seid',
				destination: '/node/running-seid',
				permanent: true
			},
			{
				source: '/dev-validators/overview',
				destination: '/node/overview',
				permanent: true
			},
			{
				source: '/dev-validators/register',
				destination: '/node/register',
				permanent: true
			},
			{
				source: '/dev-validators/security-practices',
				destination: '/node/security-practices',
				permanent: true
			},
			{
				source: '/dev-validators/restore-validator',
				destination: '/node/restore-validator',
				permanent: true
			},
			{
				source: '/dev-validators/oracle-price-feeder',
				destination: '/node/oracle-price-feeder',
				permanent: true
			},
			{
				source: '/dev-validators/validator-faq',
				destination: '/node/validator-faq',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts/fee-grants',
				destination: '/learn/fee-grants',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts/account-structure',
				destination: '/learn/account-structure',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts/wallet-association',
				destination: '/learn/wallet-association',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts/hardware-wallets',
				destination: '/learn/hardware-wallets',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts/oracles',
				destination: '/learn/oracles',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts/execute-multiple',
				destination: '/learn/execute-multiple',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts/hd-path-coin-types',
				destination: '/learn/hd-path-coin-types',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts/proposals',
				destination: '/learn/proposals',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts/ibc-relayer',
				destination: '/learn/ibc-relayer',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts/differences-with-ethereum',
				destination: '/learn/differences-with-ethereum',
				permanent: true
			},
			{
				source: '/endpoints',
				destination: '/evm',
				permanent: true
			},
			{
				source: '/endpoints/cosmos',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/endpoints/cosmos/api/:slug*',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/endpoints/evm',
				destination: '/evm',
				permanent: true
			},
			{
				source: '/seid',
				destination: '/reference/seid',
				permanent: true
			},
			{
				source: '/seid/:slug*',
				destination: '/reference/seid/:slug*',
				permanent: true
			},
			{
				source: '/dev-tutorials/installing-seid',
				destination: '/evm//installing-seid-cli',
				permanent: true
			},
			{
				source: '/dev-tutorials/building-a-frontend',
				destination: '/evm/building-a-frontend',
				permanent: true
			},
			{
				source: '/dev-tutorials/cosmwasm-general',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/dev-tutorials/evm-general',
				destination: '/evm/evm-general',
				permanent: true
			},
			{
				source: '/dev-tutorials/evm-cli-tutorial',
				destination: '/evm/installing-seid-cli',
				permanent: true
			},
			{
				source: '/dev-tutorials/tokenfactory-tutorial',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/dev-tutorials/tokenfactory-allowlist',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/dev-tutorials/nft-contract-tutorial',
				destination: '/evm/evm-hardhat',
				permanent: true
			},
			{
				source: '/dev-tutorials/pointer-contracts',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/dev-tutorials/multi-sig-accounts',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/dev-tutorials/ibc-protocol',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/dev-tutorials/ledger-ethers',
				destination: '/evm/ledger-ethers',
				permanent: true
			},
			{
				source: '/resources-resources',
				destination: '/evm/solidity-resources',
				permanent: true
			},
			{
				source: '/resources-tools-and-resources',
				destination: '/evm/solidity-resources',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/wallets',
				destination: '/learn/wallets',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/explorers',
				destination: '/learn/explorers',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/rpc-providers',
				destination: '/learn/rpc-providers',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/indexers/indexers',
				destination: '/learn/indexers',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/indexers/the-graph',
				destination: '/providers/indexers/the-graph',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/indexers/goldrush',
				destination: '/providers/indexers/goldrush',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/centralized-exchanges',
				destination: '/learn/centralized-exchanges',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/faucets',
				destination: '/learn/faucet',
				permanent: true
			},
			{
				source: '/providers/faucets',
				destination: '/learn/faucet',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/oracles/oracles',
				destination: '/providers/oracles',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/bridges',
				destination: '/providers/bridges',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/nfts',
				destination: '/providers/nfts',
				permanent: true
			},
			{
				source: '/dev-ecosystem-providers/ecosystem-map',
				destination: '/providers/ecosystem-map',
				permanent: true
			},
			{
				source: '/introduction/overview',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/learn/about-sei',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/providers/wallets',
				destination: '/learn/wallets',
				permanent: true
			},
			{
				source: '/learn/differences-with-ethereum',
				destination: '/evm/differences-with-ethereum',
				permanent: true
			},
			{
				source: '/learn/mcp-server',
				destination: '/evm/ai-tooling/mcp-server',
				permanent: true
			},
			{
				source: '/evm/precompiles/cosmwasm-precompiles',
				destination: '/evm/precompiles/cosmwasm-precompiles/example-usage',
				permanent: true
			},
			{
				source: '/cosmos.crypto.secp256k1.PubKey',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/learn/general-submit-feedback',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/.sei_backup',
				destination: '/node',
				permanent: true
			},
			{
				source: '/.sei_backup/:path*',
				destination: '/node',
				permanent: true
			},
			{
				source: '/node/priv_validator_state.json.tmp',
				destination: '/node',
				permanent: true
			},
			{
				source: '/misc/:path*',
				destination: '/node',
				permanent: true
			},
			{
				source: '/cosmos-sdk/building-a-frontend',
				destination: '/evm/building-a-frontend',
				permanent: true
			},
			{
				source: '/cosmos-sdk/cosm-wasm-general',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/cosmos-sdk/nft-contract-tutorial',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/cosmos-sdk/tokenfactory-allowlist',
				destination: '/learn/dev-token-standards',
				permanent: true
			},
			{
				source: '/evm/nft-contract-tutorial',
				destination: '/evm/evm-general',
				permanent: true
			},
			{
				source: '/learn/user-FAQ',
				destination: '/learn/user-quickstart',
				permanent: true
			},
			{
				source: '/dev-advanced-concepts-actions-and-blinks',
				destination: '/evm/evm-general',
				permanent: true
			},
			{
				source: '/evm/cosmwasm-precompiles/:slug*',
				destination: '/evm/precompiles/cosmwasm-precompiles/:slug*',
				permanent: true
			},
			{
				source: '/cosmos-sdk/querying-state',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/sei-backup-:rest(.*)',
				destination: '/node/troubleshooting',
				permanent: true
			},
			{
				source: '/evm/ibc-protocol',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/evm/best-practices',
				destination: '/evm/best-practices/optimizing-for-parallelization',
				permanent: true
			},
			{
				source: '/evm/ai-tooling/src/:rest*',
				destination: '/evm/ai-tooling/mcp-server',
				permanent: true
			},
			{
				source: '/evm/components/:rest*',
				destination: '/evm/building-a-frontend',
				permanent: true
			},
			{
				source: '/evm/wagmi',
				destination: '/evm/building-a-frontend',
				permanent: true
			},
			{
				source: '/evm/web3authContext',
				destination: '/evm/wallet-integrations/thirdweb',
				permanent: true
			},
			{
				source: '/evm/App',
				destination: '/evm/building-a-frontend',
				permanent: true
			},
			{
				source: '/tools/:path*',
				destination: '/evm',
				permanent: true
			},
			{
				source: '/learn/wrapped-sei@next.config.mjs',
				destination: '/evm/tokens',
				permanent: true
			},
			{
				source: '/cosmos-sdk/fee-grants',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/.bashrc',
				destination: '/',
				permanent: true
			},
			{
				source: '/cosmwasm.wasm.v1.MsgExecuteContract',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/cosmos.bank.v1beta1.MsgSend',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/evm/indexer-providers/alchemy',
				destination: '/evm/indexer-providers/goldsky',
				permanent: true
			},
			{
				source: '/evm/oracles',
				destination: '/evm/oracles/chainlink',
				permanent: true
			},
			{
				source: '/learn/oracle-security',
				destination: '/learn/oracles',
				permanent: true
			},
			{
				source: '/evm/precompiles/p256',
				destination: '/evm/precompiles/p256-precompile',
				permanent: true
			},
			{
				source: '/evm/precompiles/P256',
				destination: '/evm/precompiles/p256-precompile',
				permanent: true
			},
			{
				source: '/evm/precompiles/cosmwasm-precompiles/pointer',
				destination: '/learn/pointers',
				permanent: true
			},
			{
				source: '/evm/installing-seid',
				destination: '/evm/installing-seid-cli',
				permanent: true
			},
			{
				source: '/build',
				destination: '/evm',
				permanent: true
			},
			{
				source: '/learn/general-overview',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/introduction/dex-optimizations',
				destination: '/learn/parallelization-engine',
				permanent: true
			},
			{
				source: '/front-end-development/react-tutorial',
				destination: '/evm/building-a-frontend',
				permanent: true
			},
			{
				source: '/interoperability/precompiles/cosmwasm',
				destination: '/evm/precompiles/cosmwasm-precompiles/example-usage',
				permanent: true
			},
			{
				source: '/interoperability/precompiles/cosmwasm/:slug*',
				destination: '/evm/precompiles/cosmwasm-precompiles/:slug*',
				permanent: true
			},
			{
				source: '/interoperability/precompiles/:slug*',
				destination: '/evm/precompiles/:slug*',
				permanent: true
			},
			{
				source: '/interoperability/overview',
				destination: '/learn/dev-interoperability',
				permanent: true
			},
			{
				source: '/interoperability/pointer-contracts',
				destination: '/learn/pointers',
				permanent: true
			},
			{
				source: '/nodes-and-validators/joining-testnets',
				destination: '/node',
				permanent: true
			},
			{
				source: '/nodes-and-validators/seinami-incentivized-testnet',
				destination: '/node',
				permanent: true
			},
			{
				source: '/oracle/oracle-participation',
				destination: '/learn/oracles',
				permanent: true
			},
			{
				source: '/overview',
				destination: '/',
				permanent: true
			},
			{
				source: '/quickstart/nft-contract-tutorial',
				destination: '/evm/evm-foundry',
				permanent: true
			},
			{
				source: '/reference/cosmos',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/running-validator/:slug*',
				destination: '/node/validators',
				permanent: true
			},
			{
				source: '/running-sei-node/:slug*',
				destination: '/node',
				permanent: true
			},
			{
				source: '/running-validator/validator-faq',
				destination: '/node/validators',
				permanent: true
			},
			{
				source: '/order-matching/:slug*',
				destination: '/evm',
				permanent: true
			},
			{
				source: '/smart-contracts-and-local-development/set-up-a-local-network',
				destination: '/node',
				permanent: true
			},
			{
				source: '/learn/wallet-setup',
				destination: '/learn/wallets',
				permanent: true
			},
			{
				source: '/node/oracle-price-feeder',
				destination: '/learn/oracles',
				permanent: true
			},
			{
				source: '/node/oracle-pricefeeder',
				destination: '/learn/oracles',
				permanent: true
			},
			{
				source: '/governance',
				destination: '/learn/general-governance',
				permanent: true
			},
			{
				source: '/learn/getting-tokens',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/learn/linking-addresses',
				destination: '/learn/accounts',
				permanent: true
			},
			{
				source: '/node/security-practices',
				destination: '/node',
				permanent: true
			},
			{
				source: '/reference/precompiles/:slug*',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/wallets/wallet-integration',
				destination: '/learn/wallets',
				permanent: true
			},
			{
				source: '/interacting-with-sei',
				destination: '/learn',
				permanent: true
			},
			{
				source: '/node/validator-faq',
				destination: '/node/validators',
				permanent: true
			},
			{
				source: '/cosmos-sdk/execute-multiple',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/Jay',
				destination: '/',
				permanent: true
			},
			{
				source: '/evm/vrf',
				destination: '/evm/vrf/pyth-network-vrf',
				permanent: true
			},
			{
				source: '/evm/lib/providers',
				destination: '/learn/rpc-providers',
				permanent: true
			},
			{
				source: '/learn/wrapped-sei',
				destination: '/evm/tokens',
				permanent: true
			},
			{
				source: '/evm/debug-tracing',
				destination: '/evm/tracing',
				permanent: true
			},
			{
				source: '/evm/cosmwasm-precompiles/bank',
				destination: '/evm/precompiles/cosmwasm-precompiles/bank',
				permanent: true
			},
			{
				source: '/evm/dappradar-guide',
				destination: '/evm/analytics-setup',
				permanent: true
			},
			{
				source: '/evm/optimizing-for-parallelization',
				destination: '/evm/best-practices/optimizing-for-parallelization',
				permanent: true
			},
			{
				source: '/cosmos-sdk/multi-sig-accounts',
				destination: '/cosmos-sdk',
				permanent: true
			},
			{
				source: '/cosmos-sdk/networks',
				destination: '/cosmos-sdk',
				permanent: true
			},
			// AI supported files
			{
				source: '/:path*/skill',
				destination: '/:path*/skill.md',
				permanent: true
			},
			{
				source: '/:path*/agents',
				destination: '/:path*/agents.md',
				permanent: true
			}
		];
	}
});
