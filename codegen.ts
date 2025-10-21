import type { CodegenConfig } from '@graphql-codegen/cli';
import { generatorUrl } from './config';

const config: CodegenConfig = {
	overwrite: true,
	schema: generatorUrl,
	documents: ['src/graphql/**/*.gql'],
	generates: {
		'src/graphql/generated.tsx': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
			config: {
				addInfiniteQuery: false,
				fetcher: {
					func: 'src/graphql/fetcher#fetcher',
				},
				reactQueryVersion: 5,
			},
		},
	},
};

export default config;
