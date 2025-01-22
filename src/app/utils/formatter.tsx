export const DateFormatter = (date: string | Date): string => {
	const parsedDate = new Date(date);

	// Validate if the parsed date is valid
	if (isNaN(parsedDate.getTime())) {
		throw new Error('Invalid date provided to DateFormatter');
	}

	const now = new Date();

	// Check if the date is today
	if (parsedDate.toDateString() === now.toDateString() && parsedDate < now) {
		return parsedDate
			.toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			})
			.toLowerCase();
	}

	// Return date in "MMM DD" format
	return parsedDate.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	});
};

export const TimeFormatter = (dateString: string | Date) => {
	const date = new Date(dateString);
	return date
		.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
		.toLowerCase();
};
