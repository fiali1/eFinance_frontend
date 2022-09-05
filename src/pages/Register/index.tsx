import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { CgKeyhole } from 'react-icons/cg';
import { FaInfoCircle, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Fade, Flex, Spinner, Text, useToast, VStack } from '@chakra-ui/react';

import { ContentContainer } from '../../components/ContentContainer';
import { StepsHeader } from '../../components/Form/StepsHeader';
import { UserRegisterForm } from '../../components/Form/UserRegisterForm';
import { api } from '../../services/api';
import { UserFormData } from '../../types/formData';
import { JWTPAyload } from '../../types/jwtPayload';

interface RegisterProps {
	token?: string | null;
	update?: boolean;
}

export function Register({ token, update = false }: RegisterProps) {
	const [index, setIndex] = useState(0);
	const [formData, setFormData] = useState<UserFormData>({
		name: '',
		username: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const toast = useToast();

	const steps = !update
		? [
				{
					label: `Informações${'\n'}de usuário`,
					icon: FaUserCircle,
				},
				{
					label: `Definição${'\n'}de senha`,
					icon: CgKeyhole,
					size: '50px',
				},
				{
					label: `Revisão${'\n'}de dados`,
					icon: FaInfoCircle,
				},
		  ]
		: [
				{
					label: `Informações${'\n'}de usuário`,
					icon: FaUserCircle,
				},
				{
					label: `Revisão${'\n'}de dados`,
					icon: FaInfoCircle,
				},
		  ];

	function handleTransition(target: number) {
		if (target < 0) {
			if (update) {
				navigate('/profile');
			} else {
				navigate('/login');
			}
			return;
		}

		setIndex(target);
	}

	async function handleSubmit() {
		const { name, username, password } = formData;

		try {
			setIsLoading(true);

			if (!update) {
				await api.post('/users', {
					username,
					name,
					password,
				});
			} else {
				await api.put(
					`/users/${username}`,
					{
						name,
					},
					{
						headers: { authorization: token || '' },
					}
				);
			}

			handleTransition(index + 1);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast({
				title: 'Erro',
				status: 'error',
				description: `Ocorreu um problema ao tentar realizar o cadastro: ${error.message}`,
				position: 'bottom',
				duration: 5000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		async function loadData() {
			if (!token) {
				toast({
					title: 'Aviso',
					description: 'Sua sessão expirou, autentique-se novamente',
					status: 'warning',
					duration: 7000,
					isClosable: true,
				});

				navigate('/login');
			}
			try {
				const { username } = jwtDecode(token || '') as JWTPAyload;
				const response = await api.get(`/users/${username}`, {
					headers: { authorization: token || '' },
				});
				const { data } = response;
				setFormData(data);
			} catch (error) {
				toast({
					title: 'Erro',
					description: 'Ocorreu um erro ao carregar as informações do servidor',
					status: 'error',
					duration: 5000,
					isClosable: true,
				});

				navigate('/profile');
			}
		}

		if (update) {
			loadData();
		}
	}, []);

	return (
		<ContentContainer>
			<Flex w="full" h="full" bgColor="shape" justify="center">
				<VStack
					w={['full', '80%', '60%', '60%']}
					h="full"
					align="center"
					p="24px 32px"
					spacing="56px"
				>
					<Flex w="full" justify="center">
						<Text as="b" fontSize="x-large">
							{update ? 'Atualizar ' : ''}Cadastro
						</Text>
					</Flex>

					{index < (!update ? 3 : 2) && (
						<StepsHeader index={index} stepItems={steps} />
					)}

					<VStack w="full" spacing="42px">
						{(update && !!formData.username) || !update ? (
							<Fade
								in={(update && !!formData.username) || !update}
								style={{ width: '100%' }}
							>
								<UserRegisterForm
									index={index}
									formData={formData}
									setUserFormData={setFormData}
									handleTransition={handleTransition}
									handleSubmit={handleSubmit}
									isLoading={isLoading}
									update={update}
								/>
							</Fade>
						) : (
							<Flex h="300px" align="center" justify="center">
								<Spinner color="blue.400" />
							</Flex>
						)}
					</VStack>
				</VStack>
			</Flex>
		</ContentContainer>
	);
}
