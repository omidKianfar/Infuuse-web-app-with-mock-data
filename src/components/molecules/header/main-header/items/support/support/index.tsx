import { lazy, Suspense, useState } from 'react';
import LoadingProgress from '@/components/atoms/ProgressBar/CircularProgress';
import { SupportProps } from '../../../type';


const Step1 = lazy(() => import('./step1'))
const Step2 = lazy(() => import('./step2'))


const Support = ({ supportHandler, SupportChatData, userId }: Partial<SupportProps>) => {
	const [counter, setCounter] = useState(0);
	return (
		<Suspense fallback={<LoadingProgress />}>
			{counter === 0 ? (
				<Step1 setCounter={setCounter}
				 supportHandler={supportHandler}
				  SupportChatData={SupportChatData}
				   userId={userId} />
			) : (
				<Step2 setCounter={setCounter} />
			)}
		</Suspense>
	);
};

export default Support;
