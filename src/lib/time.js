let SECOND = 1000;
let MINUTE = SECOND * 60;
let HOUR = MINUTE * 60;
let DAY = HOUR * 24;
let WEEK = DAY * 7;
let MONTH = WEEK * 4;
let YEAR = MONTH * 12;
let DECADE = YEAR * 10;

export function format_time (num) {
	let abs = Math.abs(num);

	if (abs < SECOND) return (num).toFixed() + 'ms';
	if (abs < MINUTE) return (num / SECOND).toFixed() + 's';
	if (abs < HOUR) return (num / MINUTE).toFixed() + 'm';
	if (abs < DAY) return (num / HOUR).toFixed() + 'h';
	if (abs < WEEK) return (num / DAY).toFixed() + 'd';
	if (abs < MONTH) return (num / WEEK).toFixed() + 'w';
	if (abs < YEAR) return (num / MONTH).toFixed() + 'mo';
	if (abs < DECADE) return (num / YEAR).toFixed() + 'y';
	return (num / DECADE).toFixed() + 'de';
}

export function diff_time (sec, now = Date.now()) {
	return format_time(now - (sec * 1000));
}

export function to_utc (sec) {
	return new Date(sec * 1000).toISOString();
}
