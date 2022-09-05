import { useState } from 'react';
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

import { VStack, Flex, Button, Icon, Text } from '@chakra-ui/react';

import { UserFormData } from '../../../types/formData';
import { PasswordForm } from './PasswordForm';
import { UserDataForm } from './UserDataForm';

interface UserRegisterFormProps {
	index: number;
	formData: UserFormData;
	setUserFormData: (formData: UserFormData) => void;
	handleTransition: (target: number) => void;
	isLoading: boolean;
	handleSubmit: () => void;
	update?: boolean;
}

export function UserRegisterForm({
	index,
	formData,
	setUserFormData,
	handleTransition,
	handleSubmit,
	isLoading,
	update = false,
}: UserRegisterFormProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	function handleChangePasswordVisibility() {
		setIsPasswordVisible(!isPasswordVisible);
	}

	switch (index) {
		case 0:
			return (
				<UserDataForm
					currentUserFormData={formData}
					setCurrentUserFormData={setUserFormData}
					index={index}
					handleTransition={handleTransition}
					update={update}
				/>
			);
		case 1:
			return !update ? (
				<PasswordForm
					currentUserFormData={formData}
					setCurrentUserFormData={setUserFormData}
					index={index}
					handleTransition={handleTransition}
				/>
			) : (
				<VStack w="full" spacing="24px">
					<VStack w="full" p="36px 0" spacing="12px">
						<Flex w="full" align="center" justify="space-between">
							<Text as="b">Nome completo:</Text>
							<Text>{formData.name}</Text>
						</Flex>
						<Flex w="full" align="center" justify="space-between">
							<Text as="b">Username:</Text>
							<Text>{formData.username}</Text>
						</Flex>
					</VStack>
					<Flex w="full" justify="space-between">
						<Button
							colorScheme="gray"
							onClick={() => handleTransition(index - 1)}
						>
							Anterior
						</Button>
						<Button
							colorScheme="highlight"
							color="white"
							onClick={handleSubmit}
							isLoading={isLoading}
						>
							Finalizar
						</Button>
					</Flex>
				</VStack>
			);
		case 2:
			return !update ? (
				<VStack w="full" spacing="24px">
					<VStack w="full" p="36px 0" spacing="12px">
						<Flex w="full" align="center" justify="space-between">
							<Text as="b">Nome completo:</Text>
							<Text>{formData.name}</Text>
						</Flex>
						<Flex w="full" align="center" justify="space-between">
							<Text as="b">Username:</Text>
							<Text>{formData.username}</Text>
						</Flex>
						<Flex w="full" align="center" justify="space-between">
							<Text as="b">Senha:</Text>
							<Flex align="center">
								<Icon
									as={isPasswordVisible ? FaEyeSlash : FaEye}
									onClick={handleChangePasswordVisibility}
									cursor="pointer"
									mr="8px"
								/>
								<Text>{isPasswordVisible ? formData.password : '*****'}</Text>
							</Flex>
						</Flex>
					</VStack>
					<Flex w="full" justify="space-between">
						<Button
							colorScheme="gray"
							onClick={() => handleTransition(index - 1)}
						>
							Anterior
						</Button>
						<Button
							colorScheme="highlight"
							color="white"
							onClick={handleSubmit}
							isLoading={isLoading}
						>
							Finalizar
						</Button>
					</Flex>
				</VStack>
			) : (
				<Flex
					flexDir="column"
					w="full"
					h="500px"
					align="center"
					justify="center"
				>
					<VStack w={['full', 'full', 'full', '50%']} spacing="20px">
						<Flex align="center">
							<Icon as={FaCheck} color="positive" boxSize="24px" mr="12px" />
							<Text>Atualização realizada com sucesso</Text>
						</Flex>
						<Button
							as={RouterLink}
							to="/"
							colorScheme="blue"
							w="full"
							variant="ghost"
						>
							Voltar para Home
						</Button>
					</VStack>
				</Flex>
			);
		case 3:
			return (
				<Flex
					flexDir="column"
					w="full"
					h="500px"
					align="center"
					justify="center"
				>
					<VStack w={['full', 'full', 'full', '50%']} spacing="20px">
						<Flex align="center">
							<Icon as={FaCheck} color="positive" boxSize="24px" mr="12px" />
							<Text>Cadastro realizado com sucesso</Text>
						</Flex>
						<Button
							as={RouterLink}
							to="/login"
							colorScheme="blue"
							w="full"
							variant="ghost"
						>
							Fazer login
						</Button>
					</VStack>
				</Flex>
			);
		default:
			return null;
	}
}
