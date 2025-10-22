const baseUrl = 'https://dev2.api.infuuse.ai/graphql/';
const baseCononicalUrl = 'https://dev2.api.infuuse.ai/graphql/';
const apiUrl = 'https://dev2.api.infuuse.ai/graphql/';
const generatorUrl = 'https://dev2.api.infuuse.ai/graphql/';
const subscriptionUrl = 'wss://dev2.api.infuuse.ai/graphql';
const supportMail = 'support@mychimebeauty.com';
const HubspotRedirectUrl = 'https://dev2.api.infuuse.ai/graphql/';
const clientIdHubspot = 'f6f009e0-944e-4330-a615-b8f2cba52373';
const presignedUrl = 'https://dev2.api.infuuse.ai/api/Upload/GetPresignedUrls';
const appIdFacebook = '1156810569060679';

const config = {
	apiUrl,
	baseUrl,
	presignedUrl,
	generatorUrl,
	baseCononicalUrl,
	HubspotRedirectUrl,
	clientIdHubspot,
	appIdFacebook,
	subscriptionUrl,
	supportMail,
	blobBaseUrl: 'https://infuuse-bucket.s3.us-west-1.amazonaws.com',
	blobUrl: 'https://infuuse-bucket.s3.us-west-1.amazonaws.com',
	containerName: 'images',
	aws: {},
	firebase: {
		apiKey: 'AIzaSyBX_fsqBYSET-fpGrH1Ah3FPVMazNswgTU',
		authDomain: 'infuuse-57e96.firebaseapp.com',
		projectId: 'infuuse-57e96',
		storageBucket: 'infuuse-57e96.firebasestorage.app',
		messagingSenderId: '659422342639',
		appId: '1:659422342639:web:0c478250b94207a7dfda1a',
	},
};
module.exports = config;
