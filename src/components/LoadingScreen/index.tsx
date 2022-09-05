import { Flex, Spinner } from '@chakra-ui/react';

export function LoadingScreen() {
	return (
		<Flex w="full" flexDir="column" bgColor="shape" position="relative">
			<Flex
				position="absolute"
				top="0"
				left="0"
				right="0"
				h="200px"
				bgColor="blue.500"
			/>
			<Flex h="full" align="center" justify="center" w="full">
				<Spinner
					speed="0.45s"
					color="blue.400"
					emptyColor="gray.200"
					size="xl"
					thickness="4px"
					zIndex={1}
				/>
			</Flex>
		</Flex>
	);
}
