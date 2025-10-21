import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function HalfRating() {
	return <Rating name="half-rating" defaultValue={2.5} size="large" precision={0.5} readOnly />;
}
