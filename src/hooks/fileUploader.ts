import { randomString } from '@/utils';
import axios from 'axios';
import config from 'config';

const MAX_UPLOAD_SIZE = 10000000; // 10 mg

type ReturnType = {
	etag: string;
	uploadId: string;
	partNumber: string;
	completeUrl: string;
};
type uploadFileType = {
	file: File;
	changeProgress: (progress: number) => void;
};

export const fileUploader = async ({ file, changeProgress }: uploadFileType) => {
	if (!file) return;

	const fileSize = file.size;
	const [fileName, extension] = file?.name?.split('.');
	const newFileName = `${fileName}-${randomString(10)}.${extension}`;

	const chunks = Math.ceil(fileSize / MAX_UPLOAD_SIZE);
	let cumulativeProgress = 0;

	return new Promise(async (resolve, reject) => {
		try {
			const data = await getPresignedUrls(newFileName, chunks);
			const presignedUrls = data.data;

			if (presignedUrls.length > 0) {
				const uploaded: any[] = [];

				for (let i = 0; i < presignedUrls.length; i++) {
					const start = i * MAX_UPLOAD_SIZE;
					// const end = (i + 1) * MAX_UPLOAD_SIZE;
					const end = Math.min(start + MAX_UPLOAD_SIZE, fileSize);
					const formData = new FormData();
					const blobSlice = file.slice(start, end);
					formData.append('file', blobSlice, newFileName);

					const data = (await uploadChunk(
						formData,
						presignedUrls[i],
						chunks,
						cumulativeProgress,
						(progress) => {
							cumulativeProgress = progress;
							changeProgress?.(cumulativeProgress);
						}
					)) as ReturnType;

					uploaded.push(data);
				}

				const completeUpload = `<CompleteMultipartUpload>${uploaded
					.map((item) => `<Part><PartNumber>${item.partNumber}</PartNumber><ETag>${item.etag}</ETag></Part>`)
					.join('')}</CompleteMultipartUpload>`;

				try {
					axios
						.request({
							method: 'POST',
							headers: {
								'Content-Type': 'text/plain; charset=UTF-8',
							},
							url: uploaded[0].completeUrl,
							data: completeUpload,
							onUploadProgress: (p) => {
								changeProgress(p.loaded / (p.total ?? 1));
							},
						})
						.then((data) => {
							if (data.status === 200) {
								resolve({
									url: newFileName,
								});
							}
						});
				} catch (error) {
					console.info('errorrrrr', error);
				}
			}
		} catch (error) {
			reject(error);
		} finally {
		}
	});
};

const getPresignedUrls = async (key: string, ChunkCount: number) => {
	return await axios.request({
		method: 'POST',
		url: config.presignedUrl,
		data: { key, ChunkCount },
		headers: { 'Content-Type': 'application/json' },
	});
};

async function uploadChunk(
	chunkData: any,
	url: string,
	blockCount: number,
	cumulativeProgress: number,
	updateCumulativeProgress: (progress: number) => void
): Promise<ReturnType | undefined> {
	const splitedUrl = url?.split?.('?');
	const urlParams = new URLSearchParams(splitedUrl[1]);
	const uploadId: string = urlParams.get('uploadId') as string;
	const partNumber: string = urlParams.get('partNumber') as string;

	try {
		return await axios
			.request({
				url,
				method: 'PUT',
				data: chunkData,
				headers: {
					'Content-Type': 'application/octet-stream',
				},
				onUploadProgress: (p) => {
					const chunkProgress = p.loaded / (p.total ?? 1);
					const totalProgress = cumulativeProgress + chunkProgress / blockCount;
					updateCumulativeProgress(Math.floor(totalProgress));
				},
			})
			.then((data) => {
				if (data.status === 200) {
					return {
						uploadId,
						partNumber,
						etag: data.headers?.get('ETag'),
						completeUrl: splitedUrl[0] + '?uploadId=' + uploadId,
					} as ReturnType;
				} else {
					console.error('Error uploading chunk:');
				}
			});
	} catch (error) {
		console.error('Error uploading chunk:', error);
	}

	return {} as ReturnType;
}
