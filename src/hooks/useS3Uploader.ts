import { useState, useCallback, ChangeEvent } from 'react';
import { S3 } from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY } from 'config';

interface S3FileUploadHook {
	selectedFiles: File[];
	uploading: boolean;
	uploadError: string | null;
	uploadSuccess: string | null;
	progress: number;
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
	uploadFiles: () => Promise<void>;
	uploadedFileUrls: string[];
}

const useS3FileUpload = (): S3FileUploadHook => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [uploading, setUploading] = useState<boolean>(false);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
	const [progress, setProgress] = useState<number>(0);
	const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
	const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray: File[] = Array.from(event.target.files);
			setSelectedFiles(filesArray);
		}
	}, []);

	const uploadFiles = useCallback(async () => {
		if (selectedFiles.length === 0) {
			setUploadError('No files selected');
			return;
		}

		setUploading(true);
		setUploadError(null);
		setUploadSuccess(null);
		setProgress(0);

		const s3 = new S3({
			accessKeyId: AWS_ACCESS_KEY_ID,
			secretAccessKey: AWS_SECRET_ACCESS_KEY,
			region: AWS_REGION,
		});

		const uploadPromises = selectedFiles.map((file) => {
			const fileType = file.type.split('/')[0];
			const dynamicPath = `${fileType}s/`;
			const key = `${dynamicPath}${Date.now()}-${file.name}`;
			const params = {
				Bucket: AWS_BUCKET_NAME,
				Key: key,
				Body: file,
				ACL: 'public-read',
			};

			return s3
				.upload(params)
				.on('httpUploadProgress', (progressData) => {
					const percentUploaded = Math.round((progressData.loaded / progressData.total) * 100);
					setProgress(percentUploaded);
				})
				.promise();
		});

		try {
			const uploadResponses = await Promise.all(uploadPromises);
			const fileUrls = uploadResponses.map((response) => response.Location);

			setUploadedFileUrls(fileUrls);
			setUploadSuccess('Files uploaded successfully');
		} catch (error) {
			console.error('Error uploading files:', error);
			setUploadError('Error uploading files');
		} finally {
			setUploading(false);
		}
	}, [selectedFiles]);

	return {
		selectedFiles,
		uploading,
		uploadError,
		uploadSuccess,
		progress,
		handleFileChange,
		uploadFiles,
		uploadedFileUrls,
	};
};

export default useS3FileUpload;
