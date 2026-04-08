'use client';

import { useEffect, useState } from 'react';
import type { EcosystemItem, EcosystemResponse } from './ecosystemData';

const API_URL = 'https://app-api.seinetwork.io/sanity/ecosystem';

let cachedData: EcosystemItem[] | null = null;
let fetchPromise: Promise<EcosystemItem[]> | null = null;

function fetchEcosystemData(): Promise<EcosystemItem[]> {
	if (cachedData) return Promise.resolve(cachedData);
	if (fetchPromise) return fetchPromise;

	fetchPromise = fetch(API_URL, { headers: { Accept: 'application/json' } })
		.then((res) => {
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			return res.json();
		})
		.then((data: EcosystemResponse) => {
			cachedData = data.data;
			return cachedData;
		})
		.catch(() => {
			fetchPromise = null;
			return [] as EcosystemItem[];
		});

	return fetchPromise;
}

export function useEcosystemData() {
	const [data, setData] = useState<EcosystemItem[]>(cachedData ?? []);
	const [isLoading, setIsLoading] = useState(!cachedData);

	useEffect(() => {
		if (cachedData) {
			setData(cachedData);
			setIsLoading(false);
			return;
		}

		fetchEcosystemData().then((items) => {
			setData(items);
			setIsLoading(false);
		});
	}, []);

	return { data, isLoading };
}
