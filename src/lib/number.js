export let number_formatter = new Intl.NumberFormat([], {
	notation: 'compact',
	maximumSignificantDigits: 3,
});

export function format_number (num) {
	return number_formatter.format(num).toLowerCase();
}
