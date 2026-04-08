'use client';

import { useEcosystemData } from '../../data/useEcosystemData';
import AppCardV2 from './AppCard.v2';
import AppCardSkeleton from './AppCardSkeleton';

interface AppCardWithLogoProps {
	title: string;
	description: string;
	href: string;
	logoName: string;
}

export default function AppCardWithLogo({ title, description, href, logoName }: AppCardWithLogoProps) {
	const { data, isLoading } = useEcosystemData();

	if (isLoading) return <AppCardSkeleton />;

	const app = data.find((a) => a.fieldData.name.toLowerCase() === logoName.toLowerCase());
	const logoUrl = app?.fieldData?.logo?.url;

	return <AppCardV2 title={title} description={description} href={href} logoUrl={logoUrl} />;
}
