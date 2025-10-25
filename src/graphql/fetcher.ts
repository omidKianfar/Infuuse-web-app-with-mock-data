import config from 'config';
import { GraphQLClient, Variables } from 'graphql-request';

export const graphQLClient = new GraphQLClient(config.apiUrl as string);

declare global {
	interface Window {
		__LAST_GRAPHQL_ERROR__?: string;
	}
}

export function fetcher<TData, TVariables extends Variables | undefined>(
	query: string,
	variables?: TVariables
) {
	return async (): Promise<TData> => {
		try {
			return await graphQLClient.request<TData>(query, variables);
		} catch (error: any) {
			const message = error?.message || 'GraphQL Error';
			if (typeof window !== 'undefined' && window.__LAST_GRAPHQL_ERROR__ !== message) {
				console.warn('GraphQL Error:', message);
				window.__LAST_GRAPHQL_ERROR__ = message;
			}
			throw error; 
		}
	};
}
