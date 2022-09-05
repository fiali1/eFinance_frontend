import { MdArrowBack, MdExitToApp } from 'react-icons/md';

import { Button, Flex, Icon } from '@chakra-ui/react';

interface ProfileHeaderProps {
	goBackFunction: () => void;
	logoutFunction: () => void;
}

export function ProfileHeader({
	goBackFunction,
	logoutFunction,
}: ProfileHeaderProps) {
	return (
		<Flex w="full" align="center" justify="space-between">
			<Icon
				as={MdArrowBack}
				boxSize="32px"
				color="white"
				cursor="pointer"
				borderRadius="5px"
				onClick={goBackFunction}
				_hover={{ boxShadow: 'card' }}
				_active={{ bgColor: 'blue.600' }}
			/>

			<Button
				rightIcon={<MdExitToApp />}
				onClick={logoutFunction}
				variant="ghost"
				minW="fit-content"
				color="white"
				_hover={{ boxShadow: 'card' }}
				_active={{ bgColor: 'blue.600' }}
			>
				Logout
			</Button>
		</Flex>
	);
}
