import { useState } from 'react';
import { randomString } from '@/utils';
import { S3 } from 'aws-sdk';
import { aws } from 'config';
('config');

const s3 = new S3({
	accessKeyId: aws?.accessKey,
	secretAccessKey: aws?.secretKey,
	region: aws?.region,
});

export default function useFileUpload(callback?: (data: { file: File; url: string; progress: number }) => void) {
	const [isUploading, setIsUploading] = useState(false);
	const [progress, setProgress] = useState<number | null>(null);

	const [result, setResult] = useState<{ file?: any; url?: string; progress?: number }>({
		file: undefined,
		url: undefined,
		progress: undefined,
	});

	async function upload(file: File) {
		if (!file) return;

		try {
			setIsUploading(true);

			const [fileName, extension] = file?.name?.split('.');
			const fileType = file.type.split('/')[0];
			const folderName = `${fileType}s`;
			const name = `${folderName}/${fileName}-${randomString(10)}.${extension}`;

			const params = {
				Bucket: aws?.bucket_name,
				Key: name,
				Body: file,
				ACL: 'public-read',
			};

			const result = { progress: 0, file: { ...file, name }, url: name };

			const response = await s3
				.upload(params)
				.on('httpUploadProgress', ({ loaded, total }) => {
					// setResult({
					// 	...result,
					// 	progress: +((loaded / total) * 100).toFixed(2),
					// });
					setProgress(+((loaded / total) * 100).toFixed(2));
				})
				.promise();

			result.url = response?.Location;
			setProgress(100);

			setResult(result as any);
			callback?.(result as any);
			return result;
		} catch (error) {
			// ignore error
			console.log('upload error', error);
		} finally {
			setIsUploading(false);
		}
	}

	function reset() {
		const initialData = { file: undefined, url: undefined, progress: undefined };

		setResult(initialData);
		callback?.(initialData as any);
	}

	return { uploadFile: upload, reset, isUploading, ...result, progress };
}
