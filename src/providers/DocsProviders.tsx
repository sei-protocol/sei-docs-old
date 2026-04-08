'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs';
import { useEffect, useState } from 'react';
import { AIAssistant } from '../components/AIAssistant/AIAssistant';
import '../components/AIAssistant/ai-assistant.css';
import { ContextualMenu } from '../components/ContextualMenu/ContextualMenu';
import '../components/ContextualMenu/contextual-menu.css';
import { Footer } from '../components/Footer/Footer';
import { Logo, LogoMobile } from '../components/Logo';

const SearchDynamic = dynamic(() => import('../components/NextraSearch/NextraSearch'), { ssr: false, loading: () => <div /> });

export default function DocsProviders({ children, pageMap }) {
	const [isMobile, setIsMobile] = useState(() => {
		if (typeof window === 'undefined') return true;
		return window.matchMedia('(max-width: 767px)').matches;
	});

	useEffect(() => {
		const mql = window.matchMedia('(max-width: 767px)');
		const onChange = (e) => {
			setIsMobile((prev) => (prev !== e.matches ? e.matches : prev));
		};
		setIsMobile((prev) => (prev !== mql.matches ? mql.matches : prev));
		mql.addEventListener('change', onChange);
		return () => mql.removeEventListener('change', onChange);
	}, []);

	if (!pageMap) return <div className='bg-black h-full w-full' />;

	const ConditionalNavbar = () => {
		const pathname = usePathname();
		const isHomepage = pathname === '/' || pathname === '/index';

		return isMobile ? (
			<Navbar
				logo={<LogoMobile />}
				logoLink='/'
				className='sei-nav flex items-center w-full'
				children={
					<div className='flex items-center gap-2'>
						<AIAssistant />
						<SearchDynamic placeholder='Search...' />
					</div>
				}
			/>
		) : (
			<Navbar
				logo={<Logo />}
				logoLink='/'
				className='sei-nav flex items-center justify-between w-full px-4 lg:px-8'
				children={
					<div className='sei-nav flex items-center justify-between gap-6'>
						<div className='flex-grow flex justify-start'>
							<AIAssistant />
						</div>
						<SearchDynamic placeholder='Search...' />
						{isHomepage && <ThemeSwitch />}
					</div>
				}
			/>
		);
	};

	return (
		<>
			<Layout
				docsRepositoryBase='https://github.com/sei-protocol/sei-docs/tree/main'
				sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
				editLink='Edit this page'
				feedback={{ content: 'Question? Give us feedback →', labels: 'https://github.com/sei-protocol/sei-docs/issues/new' }}
				footer={<Footer />}
				darkMode={true}
				search={null}
				nextThemes={{ attribute: 'class', defaultTheme: 'dark' }}
				pageMap={pageMap}>
				{isMobile && <ConditionalNavbar />}
				<div>
					{!isMobile && <ConditionalNavbar />}
					<div className='relative z-10'>{children}</div>
					<ContextualMenu />
				</div>
			</Layout>
		</>
	);
}
