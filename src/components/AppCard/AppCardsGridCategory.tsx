'use client';

import type { EcosystemDocsCategory } from '../../data/ecosystemData';
import { useEcosystemData } from '../../data/useEcosystemData';
import AppCardV2 from './AppCard.v2';
import AppCardSkeleton from './AppCardSkeleton';

function AppCardsGridCategory({ category }: { category: EcosystemDocsCategory }) {
	const { data, isLoading } = useEcosystemData();

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-2'>
				{Array.from({ length: 4 }).map((_, i) => (
					<AppCardSkeleton key={`skeleton-${i}`} />
				))}
			</div>
		);
	}

	const apps = data.filter((app) => app.fieldData['docs-category'] === category);

	if (!apps || apps.length === 0) return null;

	return (
		<div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-2'>
				{apps.map((app) => (
					<AppCardV2 key={app.id} app={app} />
				))}
			</div>
		</div>
	);
}

export default AppCardsGridCategory;
