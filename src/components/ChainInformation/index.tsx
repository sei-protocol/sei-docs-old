'use client';

import type React from 'react';
import { CopyButton } from '../CopyText';
import { addOrSwitchSeiNetwork, networks } from './config';
import type { NetworkEntry } from './types';

export const ChainInformation = () => (
	<div className='mt-8 overflow-x-auto'>
		<table className='w-full text-sm border border-neutral-200 dark:border-neutral-700'>
			<thead>
				<tr className='bg-neutral-50 dark:bg-neutral-800/50'>
					<th className='px-3 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300'>Network Type</th>
					<th className='px-3 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300'>Chain Id</th>
					<th className='px-3 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300'>RPC URL</th>
					<th className='px-3 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap'>Explorer URL</th>
					<th className='px-3 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap'>MetaMask</th>
				</tr>
			</thead>
			<tbody>
				{networks.map((net: NetworkEntry) => (
					<tr key={net.name} className='border-t border-neutral-200 dark:border-neutral-700'>
						<td className='px-3 py-2 font-medium text-neutral-900 dark:text-neutral-100'>{net.name}</td>
						<td className='px-3 py-2'>
							<div className='flex flex-col gap-2'>
								<CopyButton value={net.chainId} />
								{net.hexChainId && <CopyButton value={net.hexChainId} />}
							</div>
						</td>
						<td className='px-3 py-2'>
							<CopyButton copyDisabled={false} value={net.rpcUrl} />
						</td>
						<td className='px-3 py-2'>
							<div className='flex flex-col gap-2'>
								{net.explorerLinks.map((explorer) => (
									<a key={explorer.name} href={explorer.url} target='_blank' rel='noopener noreferrer' className='underline hover:opacity-50'>
										{explorer.name}
									</a>
								))}
							</div>
						</td>
						<td className='px-3 py-2'>
							<AddSeiButton chainParams={net.chainParams} label={`Add Sei ${net.name} to your wallet`} />
						</td>
					</tr>
				))}
				<tr className='border-t border-neutral-200 dark:border-neutral-700'>
					<td className='px-3 py-2' />
					<td className='px-3 py-2' />
					<td className='px-3 py-2'>
						<a href='/learn/rpc-providers' className='text-sei-maroon-100 dark:text-sei-maroon-25'>
							View more RPC providers
						</a>
					</td>
					<td className='px-3 py-2'>
						<a href='/learn/explorers' className='text-sei-maroon-100 dark:text-sei-maroon-25'>
							See more explorers
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
);

export function AddSeiButton({ chainParams, label }: { chainParams: any; label: string }) {
	const onClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			await addOrSwitchSeiNetwork(chainParams);
			console.info('Sei network added or switched.');
		} catch (err) {
			console.error('Failed to add/switch network', err);
		}
	};

	return (
		<button
			type='button'
			onClick={onClick}
			className='inline-flex items-center gap-1  bg-sei-maroon-100 hover:bg-sei-maroon-200 px-3 py-1.5 text-xs text-white transition-colors min-w-[160px]'
			style={{ fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '-0.01em', fontSize: '10px' }}>
			{label}
		</button>
	);
}
