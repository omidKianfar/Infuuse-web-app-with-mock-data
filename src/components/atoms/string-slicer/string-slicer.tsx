import React from 'react';

export const stringSlicer = (string, number = 20) => {
	return string && string.length > number ? string.slice(0, number) + '...' : string;
};
