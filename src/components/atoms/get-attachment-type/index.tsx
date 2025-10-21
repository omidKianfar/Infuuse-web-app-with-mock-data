import { AttachmentType } from '@/graphql/generated';

export const getAttachmentType = (fileType: string) => {
	switch (fileType.toLowerCase()) {
		case 'wav':
		case 'mp3':
			return AttachmentType.Voice;
		case 'jpg':
		case 'png':
		case 'webp':
		case 'jpeg':
			return AttachmentType.Image;
		case 'mp4':
			return AttachmentType.Video;

		default:
			return AttachmentType.File;
	}
};
