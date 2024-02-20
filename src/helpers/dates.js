/**
 * Formats a date to a human-readable string.
 *
 * @param {Date} date The date object to format.
 * @returns {string} A string representing the formatted date.
 */
function formatDate(date) {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	}).format(date);
}

export default formatDate;
