// src/store/queryKeyManager.ts

import { queryClient } from 'pages/_app';
import { proxy } from 'valtio';

type QueryKey = string | readonly unknown[];

interface QueryKeyManager {
	keys: Record<string, QueryKey>;
	addKey: (key: string, value: QueryKey) => void;
	removeKey: (key: string) => void;
	getKey: (key: string) => QueryKey | undefined;
	invalidateKey: (key: string) => void;
}

const queryKeyManager: QueryKeyManager = proxy({
	keys: {},
	addKey: (key: string, value: QueryKey) => {
		queryKeyManager.keys[key] = value;
	},
	removeKey: (key: string) => {
		delete queryKeyManager.keys[key];
	},
	getKey: (key: string) => {
		return queryKeyManager.keys[key];
	},
	invalidateKey: (key: string) => {
		const queryKey = queryKeyManager.keys[key];
		if (queryKey) {
			queryClient.invalidateQueries({
				queryKey: queryKey as any,
			});
		}
	},
});

export { queryKeyManager };
