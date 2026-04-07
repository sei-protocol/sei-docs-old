import { AddSeiButton } from '../ChainInformation';
import { networks } from '../ChainInformation/config';

const footerLinkGroups = [
	{
		heading: 'Developers',
		links: [
			{ label: 'Developer Hub', href: 'https://www.sei.io/developers' },
			{
				label: 'Developer Toolkit',
				href: 'https://sei-foundation.notion.site/Sei-Ecosystem-Builders-Toolkit-836deaebca204452909d0bf9365d8116'
			},
			{ label: 'GitHub', href: 'https://github.com/sei-protocol' },
			{ label: "Sei Builder's Chat", href: 'https://t.me/+KZdhZ1eE-G01NmZk' }
		]
	},
	{
		heading: 'Ecosystem',
		links: [
			{ label: 'Ecosystem Hub', href: 'https://www.sei.io/ecosystem' },
			{ label: 'Join the Eco', href: 'https://sei-forms.typeform.com/join-ecosystem?typeform-source=p12rt1ecint.typeform.com' },
			{ label: 'Bridge', href: 'https://dashboard.sei.io/bridge' },
			{ label: 'Explorer (Seiscan)', href: 'https://seiscan.io/' },
			{ label: 'Explorer (Mintscan)', href: 'https://www.mintscan.io/sei' },
			{ label: 'Stake', href: 'https://dashboard.sei.io/stake' }
		]
	},
	{
		heading: 'Community',
		links: [
			{ label: 'X', href: 'https://x.com/SeiNetwork' },
			{ label: 'Discord', href: 'https://discord.com/invite/sei' },
			{ label: 'Telegram', href: 'https://t.me/seinetwork' },
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/sei-network/' },
			{ label: 'Blog', href: 'https://blog.sei.io/' },
			{ label: 'Brand Kit', href: '/learn/general-brand-kit' }
		]
	}
];

export function Footer() {
	return (
		<footer className='bg-white dark:bg-black text-black dark:text-white' style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
			{/* Main links section */}
			<div className='max-w-[1440px] mx-auto px-5 pt-8 md:px-10 md:pt-10'>
				<div className='flex flex-col gap-8 lg:flex-row lg:gap-[60px] lg:items-start'>
					{/* Logo column */}
					<div className='shrink-0 pt-1'>
						<svg width='30' height='30' viewBox='0 0 73 73' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M35.9686 72.3048C46.6812 72.3048 56.3056 67.6454 62.9256 60.2426C59.8461 57.5662 55.2053 57.4036 51.9268 60.049L51.3005 60.5544C45.2978 65.398 36.5511 64.6827 31.4151 58.9282C28.6139 55.7896 23.8166 55.4692 20.6228 58.2073L13.4015 64.3981C19.5865 69.3461 27.432 72.3048 35.9686 72.3048ZM47.6902 54.7986C53.4077 50.185 61.4441 50.3505 66.943 54.8064C70.2299 49.3604 72.1209 42.9773 72.1209 36.1523C72.1209 28.5688 69.7861 21.5307 65.7958 15.7176C63.2235 15.1698 60.4353 15.8096 58.3188 17.6852L57.7164 18.219C51.9436 23.3346 43.1733 23.0237 37.7772 17.5123C34.8341 14.5064 30.0271 14.4077 26.9631 17.2903L18.5597 25.1961L13.9368 20.2824L22.3403 12.3765C28.0798 6.97678 37.0847 7.16168 42.5978 12.7925C45.4784 15.7347 50.1603 15.9006 53.242 13.1697L53.8443 12.6359C55.7149 10.9782 57.8793 9.86071 60.1453 9.27296C53.7404 3.50827 45.2642 0 35.9686 0C17.6162 0 2.45783 13.6749 0.126961 31.3908C5.7013 28.7159 12.5772 29.7452 17.1223 34.3996C19.9916 37.3379 24.6117 37.648 27.848 35.1196L32.5466 31.4489C38.4514 26.8357 46.7988 27.059 52.4486 31.9815L61.5961 39.9511L57.1643 45.0378L48.0169 37.0681C44.8042 34.2692 40.0578 34.1421 36.6999 36.7654L32.0015 40.436C26.0555 45.0813 17.5671 44.5115 12.2955 39.113C9.23 35.9739 4.21638 35.8643 1.01675 38.8667L0 39.8207C0.760911 47.3717 3.84539 54.2368 8.52757 59.6903L16.2317 53.0854C22.2144 47.9563 31.2011 48.5566 36.4485 54.4359C39.1903 57.5079 43.8594 57.8897 47.0639 55.304L47.6902 54.7986Z'
								fill='currentColor'
							/>
						</svg>
					</div>

					{/* Link groups */}
					<div className='flex-1 flex flex-col gap-9 text-xs leading-[1.2]'>
						<div className='border-t border-neutral-200 dark:border-[var(--sei-grey-300)] flex flex-col gap-8 pt-5 lg:flex-row lg:gap-20'>
							{footerLinkGroups.map((group) => (
								<div key={group.heading} className='flex-1 flex flex-col gap-3 lg:flex-row lg:gap-5'>
									<span className='font-normal lg:flex-1' style={{ fontFamily: "'Inter', sans-serif" }}>
										{group.heading}
									</span>
									<div
										className='flex flex-col gap-4 lg:flex-1'
										style={{
											fontFamily: "'JetBrains Mono', monospace",
											textTransform: 'uppercase'
										}}>
										{group.links.map((link) => (
											<a key={link.label} href={link.href} className='text-current no-underline opacity-50 transition-opacity duration-150 hover:opacity-100'>
												{link.label}
											</a>
										))}
										{group.heading === 'Developers' ? (
											<div className='pt-1'>
												<AddSeiButton chainParams={networks[0].chainParams} label='Add Sei Mainnet to your wallet' />
											</div>
										) : null}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className='max-w-[1440px] mx-auto px-5 pt-6 pb-8 md:px-10 md:pb-10'>
				<div
					className='border-t border-neutral-200 dark:border-[var(--sei-grey-300)] pt-6 flex justify-between items-center'
					style={{
						fontSize: '9px',
						fontFamily: "'JetBrains Mono', monospace",
						letterSpacing: '0.18px',
						lineHeight: '1.3',
						textTransform: 'uppercase'
					}}>
					<span style={{ fontFeatureSettings: "'calt' 0" }}>Sei Docs © {new Date().getFullYear()}. All rights reserved.</span>
				</div>
			</div>
		</footer>
	);
}
