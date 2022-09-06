import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SchemaOf, object, string } from 'yup';

import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { api } from '../../../services/api';
import { UserFormData } from '../../../types/formData';

interface UserDataFormProps {
	currentUserFormData: UserFormData;
	setCurrentUserFormData: (data: UserFormData) => void;
	index: number;
	handleTransition: (target: number) => void;
	update?: boolean;
}

type Inputs = {
	name: string;
	username: string;
};

export function UserDataForm({
	currentUserFormData,
	setCurrentUserFormData,
	index,
	handleTransition,
	update = false,
}: UserDataFormProps) {
	const [isValidatingUsername, setIsValidatingUsername] = useState(false);

	const toast = useToast();

	const schema: SchemaOf<Inputs> = object({
		name: string()
			.matches(/^[a-zA-Z ]+$/, 'Insira um nome válido')
			.max(200, 'Respeite o limite de caracteres')
			.required('Este campo é obrigatório'),
		username: string()
			.min(3, 'O nome de usuário deve ter pelo menos 3 caracteres')
			.matches(
				/[a-zA-Z0-9]+/,
				'O nome de usuário deve conter apenas letras ou números'
			)
			.required('Este campo é obrigatório'),
	});

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: currentUserFormData.name || '',
			username: currentUserFormData.username || '',
		},
	});

	async function validateUsername(username: string) {
		setIsValidatingUsername(true);
		try {
			const response = await api.post('/users/verify', { username });
			const { data } = response;

			setIsValidatingUsername(false);

			return data;
		} catch (error) {
			toast({
				title: 'Erro',
				description: 'Ocorreu um erro ao validar o nome de usuário',
				status: 'error',
				duration: 9000,
				isClosable: true,
			});

			setIsValidatingUsername(false);
			return false;
		}
	}

	const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
		const { name, username } = formData;

		if (!update) {
			const usernameAvailable = await validateUsername(username);
			if (!usernameAvailable) {
				setError('username', {
					message: 'Este nome de usuário já está sendo utilizado',
				});

				return;
			}
		}

		setCurrentUserFormData({ ...currentUserFormData, name, username });
		handleTransition(index + 1);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
			<VStack spacing="24px">
				<FormControl w="full" isInvalid={errors.name !== undefined}>
					<FormLabel>Nome completo</FormLabel>
					<Controller
						control={control}
						name="name"
						render={({ field: { value, onChange } }) => (
							<Input borderColor="gray.400" value={value} onChange={onChange} />
						)}
					/>
					<FormErrorMessage>
						{errors.name && errors.name.message}
					</FormErrorMessage>
				</FormControl>

				<FormControl w="full" isInvalid={errors.username !== undefined}>
					<FormLabel>Nome de usuário</FormLabel>
					<Controller
						control={control}
						name="username"
						render={({ field: { value, onChange } }) => (
							<Input
								borderColor="gray.400"
								value={value}
								onChange={onChange}
								isDisabled={update}
							/>
						)}
					/>
					<FormErrorMessage>
						{errors.username && errors.username.message}
					</FormErrorMessage>
				</FormControl>
				<Flex w="full" justify="space-between">
					<Button
						colorScheme="gray"
						onClick={() => handleTransition(index - 1)}
					>
						{index === 0 ? 'Cancelar' : 'Anterior'}
					</Button>
					<Button
						colorScheme="cyan"
						color="white"
						type="submit"
						isLoading={isValidatingUsername}
					>
						Próximo
					</Button>
				</Flex>
			</VStack>
		</form>
	);
}
