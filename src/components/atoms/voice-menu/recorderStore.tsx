import { proxy } from 'valtio';

const RecorderStore = proxy<{ mediaBlob: string }>({ mediaBlob: '' });

export default RecorderStore;
