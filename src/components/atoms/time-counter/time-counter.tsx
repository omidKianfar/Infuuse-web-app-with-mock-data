export const timeCounter = (time) => {
	const hour = Math.floor(time / 60);
	const hourConvert = hour < 10 ? `0${hour}` : hour;

	const min = Math.floor(time % 60);
	const minConvert = min < 10 ? `0${min}` : min;

	const sec = Math.floor((min * 60) % 60);
	const secConvert = sec < 10 ? `0${sec}` : sec;

	return `${hourConvert} : ${minConvert} : ${secConvert}`;
};
