const getFileType = (filename: string) => {
	const splFile: string[] = filename?.split('.');

	return splFile[splFile.length - 1];
};

export default getFileType;
