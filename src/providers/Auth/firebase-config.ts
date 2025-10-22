import config from "config";

export const FIREBASE_API = {
	appId: config.firebase.appId,
	apiKey: config.firebase.apiKey,
	projectId: config.firebase.projectId,
	authDomain: config.firebase.authDomain,
	storageBucket: config.firebase.storageBucket,
	messagingSenderId: config.firebase.messagingSenderId,
};
