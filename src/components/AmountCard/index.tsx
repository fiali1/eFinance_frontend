/* eslint-disable no-nested-ternary */
import { Flex, Text } from '@chakra-ui/react';

import { formatCurrency } from '../../utils/formatCurrency';

interface AmountCardProps {
	type: 'Total' | 'Entradas' | 'Saídas';
	amount: number;
}

export function AmountCard({ type, amount }: AmountCardProps) {
	function formatColor(background = false) {
		switch (type) {
			case 'Total':
				return background ? 'orange.400' : 'white';
			case 'Entradas':
				return `positive${background ? '_bg' : ''}`;
			case 'Saídas':
				return `negative${background ? '_bg' : ''}`;
			default:
				return undefined;
		}
	}

	return (
		<Flex
			flexDir="column"
			align="flex-start"
			justify="space-between"
			bgColor={formatColor(true)}
			minH={['40px', '100px', '100px', '100px']}
			w={['full', 'full', '250px', '250px']}
			boxShadow="card"
			borderRadius="8px"
			p="16px"
			transition="transform 0.1s"
			_hover={{
				transform: 'translateY(-1px) translateZ(0)',
				boxShadow: 'card_hover',
			}}
		>
			<Text fontSize="xl" color={formatColor()}>
				{type}
			</Text>
			<Text
				fontSize={type === 'Total' ? 'x-large' : 'xl'}
				fontWeight="bold"
				color={formatColor()}
			>
				{formatCurrency(amount)}
			</Text>
		</Flex>
	);
}
