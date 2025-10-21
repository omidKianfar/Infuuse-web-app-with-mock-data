const INFUUSE = {
	gray100: '#EDEFF2',
	gray200: '#F7F8FA',
	gray300: '#F5F6F7',
	gray400: '#DFE3EB',
	gray500: '#C3CAD9',
	blueLight100: '#99A6BF',
	blueLight200: '#7C8AA6',
	blueLight300: '#62708C',
	blueLight400: '#4D5E80',
	blueLight500: '#415070',
	blueLight600: '#3F5073',
	blueLight700: '#ADB8CC',
	blue100: '#6DB6D5',
	blue200: '#57B8D9',
	blue300: '#79D4F2',
	blue400: '#10E1EA',
	blue500: '#23728C',
	blueDark100: '#2182A4',
	blueDark200: '#0A4E66',
	blueDark300: '#405DE6',
	blueDark400: '#1877F2',
	blueDark500: '#00384D',
	porple100: '#833AB4',
	porple200: '#a855f7',
	green100: '#37FF3F',
	green200: '#63D69E',
	green300: '#25d366',
	green400: '#76bf4c',
	green500: '#76BF4C',
	orange100: '#FCAF45',
	orange200: '#FFBC01',
	orange300: '#F9B959',
	red100: '#FF7A59',
	red200: '#d44638',
	red300: '#FF3333',
};

const INFUUSECOLORTAG = {
	black: '#000',
	brown: '#8B4513',
	red: '#FF0000',
	orange: '#FFA500',
	yellow: '#FFFF00',
	gold: '#FFD700',
	green: '#008000',
	blue: '#0000FF',
	purple: '#800080',
	pink: '#FFC0CB',
	turquoise: '#40E0D0',
	seaGreen: '#2E8B57',
	tan: '#D2B48C',
};

const PRIMARY = {
	lighter: '#c7c8ff',
	light: '#7180ff',
	main: '#0342FE',
	dark: '#002ce5',
	darker: '#0000cb',
};
const SECONDARY = {
	lighter: '#636368',
	light: '#636368',
	main: '#3C3C43',
	dark: '#2a2a2e',
	darker: '#1c1c22',
};
const INFO = {
	lighter: '#DCEEFF',
	light: '#98C5FF',
	main: '#5492FF',
	dark: '#2A53B7',
	darker: '#10267A',
};
const SUCCESS = {
	lighter: '#F0FCD1',
	light: '#C1F276',
	main: '#7BD620',
	dark: '#479A10',
	darker: '#236606',
};
const WARNING = {
	lighter: '#FFFACD',
	light: '#FFEB69',
	main: '#FFD505',
	dark: '#B79202',
	darker: '#7A5D00',
};
const ERROR = {
	lighter: '#FFE6D5',
	light: '#FFA081',
	main: '#FF3F2D',
	dark: '#B71623',
	darker: '#7A0824',
};

const GREY = {
	0: '#FFFFFF',
	100: '#F9FAFB',
	200: '#F4F6F8',
	300: '#DFE3E8',
	400: '#C4CDD5',
	500: '#919EAB',
	600: '#637381',
	700: '#454F5B',
	800: '#212B36',
	900: '#161C24',
};

const COMMON = {
	common: { black: '#000', white: '#fff' },
	primary: { ...PRIMARY, contrastText: '#fff' },
	secondary: { ...SECONDARY, contrastText: '#fff' },
	info: { ...INFO, contrastText: '#fff' },
	success: { ...SUCCESS, contrastText: '#fff' },
	warning: { ...WARNING, contrastText: '#fff' },
	error: { ...ERROR, contrastText: '#fff' },
	infuuse: { ...INFUUSE, contrastText: '#fff' },
	infuuseColorTag: { ...INFUUSECOLORTAG, contrastText: '#fff' },
	grey: GREY,
};

const darkPalette = {
	mode: 'dark',
	primary: {
		lighter: '#636368',
		light: '#545457',
		main: '#588ADD',
		dark: '#36353A',
		darker: '#588ADD',
	},
	secondary: {
		lighter: '#636368',
		light: '#636368',
		main: '#3C3C43',
		dark: '#2a2a2e',
		darker: '#588ADD',
	},
	info: {
		lighter: '#D0F2FF',
		light: '#79a1e3',
		main: '#588ADD',
		dark: '#3d609a',
		darker: '#04297A',
	},
	success: {
		lighter: '#E9FCD4',
		light: '#73d587',
		main: '#51CB69',
		dark: '#388e49',
		darker: '#08660D',
	},
	warning: {
		lighter: '#FFF7CD',
		light: '#FFE16A',
		main: '#FFC107',
		dark: '#B78103',
		darker: '#7A4F01',
	},
	error: {
		lighter: '#FFE7D9',
		light: '#f86c89',
		main: '#F7486C',
		dark: '#ac324b',
		darker: '#7A0C2E',
	},
	grey: GREY,
	text: { primary: '#fff', secondary: '#8F8F91', disabled: '#B1B1B3', blue: '#1890D3', green: '#51CB69' },
	background: { paper: '#232227', default: '#1B1A1F', neutral: '#1B1A1F' },
	action: { active: GREY[500] },
};

// ? for the dark mode , you should hav create a dark object like light object with its own colors

const palette = {
	light: {
		...COMMON,
		mode: 'light',
		text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
		background: { paper: '#fff', default: '#fff', neutral: GREY[200], header: '#3272DD0D' },
		action: { active: GREY[600] },
	},
	dark: darkPalette,
};

export default palette;
