import { useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import { ConversationCollectionSegment } from '@/graphql/generated';


interface Props {
	supportHandler: React.Dispatch<React.SetStateAction<boolean>>;
	SupportChatData: ConversationCollectionSegment;
	userId: number;
}

const Support = ({ supportHandler, SupportChatData, userId }: Props) => {
	const [counter, setCounter] = useState(0);
	return (
		<>
			{counter === 0 ? (
				<Step1 setCounter={setCounter} supportHandler={supportHandler} SupportChatData={SupportChatData} userId={userId} />
			) : (
				<Step2 setCounter={setCounter} />
			)}
		</>
	);
};

export default Support;
