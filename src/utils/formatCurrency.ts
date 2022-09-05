export function formatCurrency(amount: number) {
	const formattedValue = new Intl.NumberFormat('pt-Br', {
		style: 'currency',
		currency: 'BRL',
	}).format(amount);

	return formattedValue;
}
