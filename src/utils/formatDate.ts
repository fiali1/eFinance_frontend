export function formatDate(date: Date, condensed = false) {
	return new Intl.DateTimeFormat('pt-Br', {
		day: '2-digit',
		month: condensed ? '2-digit' : 'long',
		year: 'numeric',
	}).format(date);
}
