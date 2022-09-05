import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { SchemaOf, object, string, ref } from 'yup';

import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { UserFormData } from '../../../types/formData';

interface PasswordFormProps {
	currentUserFormData: UserFormData;
	setCurrentUserFormData: (data: UserFormData) => void;
	index: number;
	handleTransition: (target: number) => void;
}

type Inputs = {
	password: string;
	passwordConfirm: string;
};

export function PasswordForm({
	currentUserFormData,
	setCurrentUserFormData,
	index,
	handleTransition,
}: PasswordFormProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
		useState(false);

	const schema: SchemaOf<Inputs> = object({
		password: string()
			.min(5, 'A senha deve conter pelo menos 5 caracteres')
			.max(16, 'A senha deve conter no máximo 16 caracteres')
			.matches(
				/^[ A-Za-z0-9_@./#&+-]*$/,
				'Sua senha deve conter apenas letras, números ou caracteres especiais'
			)
			.required('Este campo é obrigatório'),
		passwordConfirm: string()
			.min(5, 'A senha deve conter pelo menos 5 caracteres')
			.max(16, 'A senha deve conter no máximo 16 caracteres')
			.matches(
				/^[ A-Za-z0-9_@./#&+-]*$/,
				'Sua senha deve conter apenas letras, números ou caracteres especiais'
			)
			.when('password', (password, schema) =>
				password !== ''
					? schema.oneOf([ref('password'), null], 'As senhas não coincidem')
					: schema
			)
			.required('Este campo é obrigatório'),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		defaultValues: {
			password: currentUserFormData.password || '',
			passwordConfirm: currentUserFormData.password || '',
		},
	});

	const onSubmit: SubmitHandler<Inputs> = (formData: Inputs) => {
		const { password } = formData;

		setCurrentUserFormData({ ...currentUserFormData, password });
		handleTransition(index + 1);
	};

	function handlePasswordVisibilityChange(confirm = false) {
		if (!confirm) {
			setIsPasswordVisible(!isPasswordVisible);
		} else {
			setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
			<VStack spacing="24px">
				<FormControl w="full" isInvalid={errors.password !== undefined}>
					<FormLabel>Senha</FormLabel>
					<Controller
						control={control}
						name="password"
						render={({ field: { value, onChange } }) => (
							<InputGroup>
								<Input
									borderColor="gray.400"
									value={value}
									onChange={onChange}
									type={isPasswordVisible ? undefined : 'password'}
								/>
								<InputRightElement>
									<IconButton
										color="text_light"
										display="flex"
										justifyContent="center"
										alignItems="center"
										icon={isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
										aria-label="show/hide password"
										variant="unstyled"
										onClick={() => handlePasswordVisibilityChange()}
										_focus={{ boxShadow: 'none' }}
									/>
								</InputRightElement>
							</InputGroup>
						)}
					/>
					<FormErrorMessage>
						{errors.password && errors.password.message}
					</FormErrorMessage>
				</FormControl>

				<FormControl w="full" isInvalid={errors.passwordConfirm !== undefined}>
					<FormLabel>Confirmar senha</FormLabel>
					<Controller
						control={control}
						name="passwordConfirm"
						render={({ field: { value, onChange } }) => (
							<InputGroup>
								<Input
									borderColor="gray.400"
									value={value}
									onChange={onChange}
									type={isPasswordConfirmVisible ? undefined : 'password'}
								/>
								<InputRightElement>
									<IconButton
										color="text_light"
										display="flex"
										justifyContent="center"
										alignItems="center"
										icon={isPasswordConfirmVisible ? <FaEyeSlash /> : <FaEye />}
										aria-label="show/hide password"
										variant="unstyled"
										onClick={() => handlePasswordVisibilityChange(true)}
										_focus={{ boxShadow: 'none' }}
									/>
								</InputRightElement>
							</InputGroup>
						)}
					/>
					<FormErrorMessage>
						{errors.passwordConfirm && errors.passwordConfirm.message}
					</FormErrorMessage>
				</FormControl>
				<Flex w="full" justify="space-between">
					<Button
						colorScheme="gray"
						onClick={() => handleTransition(index - 1)}
					>
						{index === 0 ? 'Cancelar' : 'Anterior'}
					</Button>
					<Button colorScheme="cyan" color="white" type="submit">
						Próximo
					</Button>
				</Flex>
			</VStack>
		</form>
	);
}
