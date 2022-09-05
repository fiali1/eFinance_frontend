import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Flex, HStack, Icon, Text } from '@chakra-ui/react';

interface HeaderProps {
	username: string;
}

export function Header({ username }: HeaderProps) {
	const navigate = useNavigate();

	function handleRedirectToProfile() {
		navigate('/profile');
	}

	return (
		<Flex w="full" align="center" justify="space-between">
			<Text fontSize="x-large" fontWeight="bold" color="white">
				e-Finance
			</Text>
			<Flex>
				<HStack
					align="center"
					spacing="12px"
					cursor="pointer"
					onClick={handleRedirectToProfile}
					borderRadius="5px"
					p="4px 8px"
					_hover={{ boxShadow: 'card' }}
					_active={{ bgColor: 'blue.600' }}
				>
					<Text fontSize="lg" color="white" fontWeight="medium">
						{username}
					</Text>
					<Icon as={FaUserCircle} boxSize="32px" color="white" />
				</HStack>
			</Flex>
		</Flex>
	);
}
