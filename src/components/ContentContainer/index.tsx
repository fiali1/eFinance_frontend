import { ReactNode } from 'react';

import { Flex } from '@chakra-ui/react';

interface ContentContainerProps {
	children: ReactNode;
}

export function ContentContainer({ children }: ContentContainerProps) {
	return (
		<Flex w="full" align="center" justify="center" position="relative">
			{children}
		</Flex>
	);
}
