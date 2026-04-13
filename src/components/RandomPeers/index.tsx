'use client';

import { useEffect, useState } from 'react';

const PEERS: Record<string, string[]> = {
	mainnet: [
		'd53ab7681ed0df3d3249fc0132df7c3a131c9c1a@45.250.253.40:51656',
		'4ee8aea5bb58e9038d72e74322e3bba755287398@202.8.8.183:11956',
		'81409623ae4da3ec7b400cf640dea0b0999a964b@57.128.230.96:51556',
		'61a5be64b5215786fe5da712584678d0626636b5@87.249.137.71:51556',
		'f83c536f43df9a5d900cd3c2f702c04d7dddc7b5@136.243.67.45:11956',
		'b8d600a2f568576b5a2df5ee649cf9b809389064@162.19.62.176:26756',
		'57860b18ed3e1bbe8901ba73f2e63c7e6fe8b3d3@57.129.54.81:26656',
		'04fc6bba6c5c33034811612dca31c7adda24b299@91.134.60.37:16856',
		'de64b779c7f4091e6f1765f5ca4c46f9d3011732@65.108.70.106:46656',
		'3be6b24cf86a5938cce7d48f44fb6598465a9924@p2p.state-sync.pacific-1.seinetwork.io:26656',
		'70e0c91b83b5ed1beaca798267f2debdf97dac10@18.156.6.83:26656',
		'dd6b1ae002a15c1c8a38e05660f49a93c75d4159@148.251.181.225:26656'
	],
	testnet: [
		'71beea83970431f55816eee5f066a611a1dc80f7@p2p.state-sync.atlantic-2.seinetwork.io:26656',
		'65c257f9275beb1b99ca169ef89743c034b15db0@3.76.192.224:26656',
		'33588592e477c5238ff2a5d8dc765f85790ef853@23.109.47.225:26656',
		'babc3f3f7804933265ec9c40ad94f4da8e9e0017@testnet-seed.rhinostake.com:11956',
		'8542cd7e6bf9d260fef543bc49e59be5a3fa9074@seed.publicnode.com:56656'
	]
};

function pickRandom(arr: string[], n: number): string[] {
	const shuffled = [...arr];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled.slice(0, n);
}

const CopyIcon = ({ className }: { className?: string }) => (
	<svg
		role='img'
		aria-label='Copy'
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={className}>
		<path d='M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
		<path d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
	</svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
	<svg
		role='img'
		aria-label='Copied'
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={className}>
		<path d='M5 12l5 5l10 -10' />
	</svg>
);

export function RandomPeers({ format = 'bash', network = 'mainnet' }: { format?: 'bash' | 'toml'; network?: 'mainnet' | 'testnet' }) {
	const [peers, setPeers] = useState<string[]>([]);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const pool = PEERS[network];
		setPeers(pickRandom(pool, Math.min(5, pool.length)));
	}, [network]);

	const peerString = peers.join(',');
	const displayText = format === 'toml' ? `persistent-peers = "${peerString}"` : `PEERS="${peerString}"`;

	const handleCopy = () => {
		navigator.clipboard.writeText(displayText);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	if (peers.length === 0) return null;

	return (
		<div className='not-prose'>
			<div className='relative'>
				<pre className='shiki'>
					<code style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{displayText}</code>
				</pre>
				<div className='absolute top-3 right-3 flex items-center gap-1.5'>
					<button
						type='button'
						onClick={handleCopy}
						className='p-1.5 rounded-md text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors'
						title='Copy to clipboard'>
						{copied ? <CheckIcon className='h-4 w-4 text-green-500' /> : <CopyIcon className='h-4 w-4' />}
					</button>
				</div>
			</div>
		</div>
	);
}
