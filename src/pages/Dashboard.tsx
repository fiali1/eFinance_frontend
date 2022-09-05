import { Flex } from '@chakra-ui/react';

import { AppRoutes } from '../routes';

export function Dashboard() {
	return (
		<Flex w="full" minH="100vh" justify="center" bgColor="body">
			<Flex w={['full', 'full', 'full', '1120px']}>
				<AppRoutes />
			</Flex>
		</Flex>
	);
}
