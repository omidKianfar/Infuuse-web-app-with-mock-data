import React from 'react';
import { FormProvider as Form } from 'react-hook-form';

type FormProviderType = React.PropsWithChildren & {
	onSubmit: any;
	methods: object;
	style?: React.CSSProperties | undefined;
};

export default function FormProvider({ style, methods, onSubmit, children }: FormProviderType) {
	return (
		<Form {...methods}>
			<form onSubmit={onSubmit} style={{ width: '100%', ...style }}>
				{children}
			</form>
		</Form>
	);
}
