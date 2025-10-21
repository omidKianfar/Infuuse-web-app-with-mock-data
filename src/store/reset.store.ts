import { proxy } from 'valtio';

export type ResetType = {
	reset: () => void;
};

export default proxy<ResetType>({ reset: () => {} });
