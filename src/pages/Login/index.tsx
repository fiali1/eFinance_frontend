import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FaKey, FaUserCircle } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { object, SchemaOf, string } from 'yup';

import {
	Flex,
	FormControl,
	FormErrorMessage,
	Link,
	Text,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { ContentContainer } from '../../components/ContentContainer';
import { LoginInput } from '../../components/LoginInput';
import { SubmitButton } from '../../components/SubmitButton';
import { api } from '../../services/api';

type Inputs = {
	username: string;
	password: string;
};

interface LoginProps {
	setToken: (token: string) => void;
}

export function Login({ setToken }: LoginProps) {
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const toast = useToast();

	const schema: SchemaOf<Inputs> = object({
		username: string().required('Este campo é obrigatório'),
		password: string().required('Este campo é obrigatório'),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
		const { username, password } = formData;

		setIsLoading(true);

		try {
			const response = await api.post('/login', {
				username,
				password,
			});
			const { data: token } = response;
			setToken(token);
			navigate('/');
		} catch (error) {
			toast({
				title: 'Aviso',
				description: 'Usuário ou senha incorretos',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			setIsLoading(false);
		}
	};

	return (
		<ContentContainer>
			<VStack h="full" w="400px" spacing="0">
				<Flex w="full" h="340px" align="flex-end" pb="24px">
					<VStack w="full" spacing="0" p="8px">
						<Text fontSize="xxx-large" fontWeight="extrabold" color="white">
							e-Finance
						</Text>
						<Text
							whiteSpace="pre"
							color="white"
							textAlign="center"
							fontWeight="light"
						>
							Uma aplicação-exemplo para{'\n'}controle de economias!
						</Text>
					</VStack>
				</Flex>
				<Flex h="full" align="flex-start">
					<VStack
						bgColor="shape"
						p="24px 20px"
						spacing="24px"
						borderRadius="12px"
						boxShadow="card"
					>
						<Text as="b" fontSize="x-large">
							Login
						</Text>

						<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
							<VStack align="center" spacing="24px" mb="32px">
								<FormControl w="full" isInvalid={errors.username !== undefined}>
									<Controller
										control={control}
										name="username"
										render={({ field: { onChange, value } }) => (
											<LoginInput
												placeholder="Username"
												value={value}
												onChange={onChange}
												icon={FaUserCircle}
											/>
										)}
									/>
									<FormErrorMessage>
										{errors.username && errors.username.message}
									</FormErrorMessage>
								</FormControl>

								<FormControl w="full" isInvalid={errors.password !== undefined}>
									<Controller
										control={control}
										name="password"
										render={({ field: { onChange, value } }) => (
											<LoginInput
												placeholder="Senha"
												value={value}
												onChange={onChange}
												icon={FaKey}
												password
											/>
										)}
									/>
									<FormErrorMessage>
										{errors.password && errors.password.message}
									</FormErrorMessage>
								</FormControl>
							</VStack>
							<SubmitButton label="Entrar" isLoading={isLoading} />
						</form>

						<Flex w="full" justify="center">
							<Text fontSize="sm">
								Ainda não tem uma conta?{' '}
								<Link as={RouterLink} to="/register" color="primary">
									Cadastre-se
								</Link>
							</Text>
						</Flex>
					</VStack>
				</Flex>
				<Flex w="full" justify="center" color="green.900" pb="16px">
					<Text fontSize="sm">
						Developed by{' '}
						<Link
							href="https://www.github.com/fiali1"
							fontWeight="bold"
							isExternal
						>
							Gabriel Fiali
						</Link>
					</Text>
				</Flex>
			</VStack>
		</ContentContainer>
	);
}
