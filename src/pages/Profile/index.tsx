import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FaUserCircle } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import {
	Fade,
	Flex,
	Icon,
	SlideFade,
	Stack,
	Text,
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react';

import { ProfileHeader } from '../../components/Header/ProfileHeader';
import { LoadingScreen } from '../../components/LoadingScreen';
import { ConfirmDeletionModal } from '../../components/Modal/ConfirmDeletionModal';
import { api } from '../../services/api';
import { JWTPAyload } from '../../types/jwtPayload';
import { User } from '../../types/user';

interface ProfileProps {
	token: string | null;
	setToken: (token: string) => void;
}

export function Profile({ token, setToken }: ProfileProps) {
	const [userData, setUserData] = useState<User>({} as User);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast();

	function handleRedirectToHome() {
		navigate(`/`);
	}

	function handleRedirectToEdit() {
		navigate(`/profile/edit`);
	}

	async function loadData() {
		setIsLoading(true);

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
			setUserData(data as User);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast({
				title: 'Erro',
				description: `Ocorreu um problema ao receber os dados do servidor: ${error.message}`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	}

	async function handleDeleteAccount() {
		setIsDeleting(true);

		try {
			const { username } = jwtDecode(token || '') as JWTPAyload;
			await api.delete(`/users/${username}`, {
				headers: { authorization: token || '' },
			});
			sessionStorage.removeItem('token');
			setToken('');

			navigate('/login');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast({
				title: 'Erro',
				description: `Ocorreu um erro ao tentar deletar a conta: ${error.message}`,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});

			setIsDeleting(false);
			onClose();
		}
	}

	function handleLogout() {
		sessionStorage.removeItem('token');
		setToken('');

		navigate('/login');
	}

	useEffect(() => {
		loadData();
	}, []);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<Flex w="full" flexDir="column" bgColor="shape" position="relative">
			<Flex bgColor="blue.500">
				<VStack w="full" p="12px 24px" pb="24px" zIndex={1}>
					<ProfileHeader
						goBackFunction={handleRedirectToHome}
						logoutFunction={handleLogout}
					/>

					<SlideFade in={!!userData.username}>
						<VStack w="full" align="center" spacing="4px">
							<Icon as={FaUserCircle} boxSize="56px" color="white" />
							<VStack spacing="0">
								<Text fontSize="xl" fontWeight="bold" color="white">
									{userData.name}
								</Text>
								<Text fontSize="lg" fontWeight="light" color="white">
									{userData.username}
								</Text>
							</VStack>
						</VStack>
					</SlideFade>
				</VStack>
			</Flex>
			<VStack
				w="full"
				p={['24px 12px', '24px 12px', '24px 12px', '128px 12px 64px']}
			>
				<ConfirmDeletionModal
					isOpen={isOpen}
					onCancel={onClose}
					label="Você tem certeza que deseja deletar sua conta?"
					item={userData.username}
					deleteFunction={handleDeleteAccount}
					isDeleting={isDeleting}
				/>
				<Fade in={!!userData.username} style={{ width: '100%' }}>
					<Stack
						w="full"
						align="center"
						justify="center"
						direction={['column', 'column', 'column', 'row']}
						spacing="20px"
					>
						<Flex
							flexDir="column"
							w={['full', '200px', '200px', '200px']}
							borderRadius="8px"
							align="center"
							justify="center"
							p="12px"
							boxShadow="card"
							bgColor="blue.100"
							_hover={{ bgColor: 'blue.200' }}
							cursor="pointer"
							onClick={handleRedirectToEdit}
						>
							<Icon color="text" as={MdEdit} boxSize="30px" mb="4px" />
							<Text color="text" fontSize="lg">
								Atualizar dados
							</Text>
						</Flex>

						<Flex
							flexDir="column"
							w={['full', '200px', '200px', '200px']}
							borderRadius="8px"
							align="center"
							justify="center"
							p="12px"
							bgColor="red.100"
							boxShadow="card"
							_hover={{ bgColor: 'red.200' }}
							cursor="pointer"
							onClick={onOpen}
						>
							<Icon color="text" as={CgClose} boxSize="30px" mb="4px" />
							<Text fontSize="lg" color="text">
								Deletar conta
							</Text>
						</Flex>
					</Stack>
				</Fade>
			</VStack>
		</Flex>
	);
}
