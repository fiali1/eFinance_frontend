/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiOutlineCash } from 'react-icons/hi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
	Button,
	Fade,
	Flex,
	HStack,
	Icon,
	IconButton,
	SlideFade,
	Stack,
	StackDivider,
	Table,
	TableContainer,
	Tag,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react';

import { AmountCard } from '../../components/AmountCard';
import { Header } from '../../components/Header';
import { LoadingScreen } from '../../components/LoadingScreen';
import { ConfirmDeletionModal } from '../../components/Modal/ConfirmDeletionModal';
import { api } from '../../services/api';
import { Entry } from '../../types/entry';
import { JWTPAyload } from '../../types/jwtPayload';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

interface HomeProps {
	token: string | null;
}

export function Home({ token }: HomeProps) {
	const [userEntries, setUserEntries] = useState<Entry[]>([] as Entry[]);
	const [selectedEntry, setSelectedEntry] = useState({} as Entry);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	const { username } = jwtDecode(token || '') as JWTPAyload;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast();

	const headers = ['Título', 'Tag', 'Tipo', 'Valor', 'Data', 'Opções'];

	function calcTotals(type: 'Total' | 'Entrada' | 'Saída') {
		if (type === 'Total') {
			let total = 0;

			userEntries.forEach((entry) => {
				if (entry.type === 'Entrada') {
					total += entry.value;
				} else {
					total -= entry.value;
				}
			});

			return total;
		}

		let total = 0;
		userEntries.forEach((entry) => {
			if (entry.type === type) {
				total += entry.value;
			}
		});

		return total;
	}

	function formatColor(type: string) {
		return type === 'Entrada' ? 'positive' : 'negative';
	}

	function handleRedirectToEdit(id: string) {
		navigate(`/entries/edit/id=${id}`);
	}

	function handleOpenDeletionModal(entry: Entry) {
		setSelectedEntry(entry);
		onOpen();
	}

	function handleCancelDeletion() {
		setSelectedEntry({} as Entry);
		onClose();
	}

	async function handleDeleteEntry() {
		setIsDeleting(true);

		try {
			await api.delete(`/entries/${selectedEntry.id}`, {
				headers: { authorization: token || '' },
			});

			await loadData();
		} catch (error: any) {
			toast({
				title: 'Erro',
				description: `Ocorreu um erro ao tentar deletar o item: ${error.message}`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		} finally {
			setIsDeleting(false);
			onClose();
		}
	}

	async function loadData() {
		setIsLoading(true);

		try {
			const response = await api.get('/entries', {
				headers: { authorization: token || '' },
			});
			const { data } = response;
			setUserEntries(data as Entry[]);
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

	useEffect(() => {
		loadData();
	}, []);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<Flex w="full" flexDir="column" bgColor="shape" position="relative">
			<Flex
				position="absolute"
				top="0"
				left="0"
				right="0"
				h={['320px', '200px', '200px', '200px']}
				bgColor="blue.500"
			/>
			<VStack w="full" p="12px 24px" spacing="48px" pb="48px">
				<ConfirmDeletionModal
					isOpen={isOpen}
					onCancel={handleCancelDeletion}
					label="Você tem certeza que deseja deletar o item abaixo?"
					item={selectedEntry.title}
					deleteFunction={handleDeleteEntry}
					isDeleting={isDeleting}
				/>
				<VStack w="full" zIndex={1} align="flex-start" spacing="32px">
					<Header username={username} />

					<Fade in={!isLoading} style={{ width: '100%' }}>
						<Stack
							direction={['column', 'row', 'row', 'row']}
							divider={<StackDivider borderWidth="1px" borderColor="white" />}
							w="full"
							spacing={['12px', '20px', '20px', '20px']}
						>
							<AmountCard type="Total" amount={calcTotals('Total')} />
							<HStack
								spacing="20px"
								w={['full', 'fit-content', 'fit-content', 'fit-content']}
								align="center"
							>
								<AmountCard type="Entradas" amount={calcTotals('Entrada')} />
								<AmountCard type="Saídas" amount={calcTotals('Saída')} />
							</HStack>
						</Stack>
					</Fade>
				</VStack>

				<VStack w="full" align="flex-start" spacing="12px">
					<Flex w="full" align="flex-start" justify="space-between">
						<Text fontSize="x-large" fontWeight="light">
							Seus registros
						</Text>
						<Button
							as={RouterLink}
							to="/entries/create"
							leftIcon={<FaPlus />}
							colorScheme="orange"
						>
							Novo registro
						</Button>
					</Flex>
					<SlideFade in={!isLoading} style={{ width: '100%' }}>
						<VStack w="full" align="flex-start" spacing="8px">
							{userEntries.length === 0 ? (
								<Flex
									flexDir="column"
									align="center"
									justify="center"
									h="full"
									w="full"
									minH="300px"
								>
									<Icon as={HiOutlineCash} mb="12px" boxSize="42px" />
									<Text whiteSpace="pre" textAlign="center">
										Você ainda não tem registros!{'\n'}Adicione um clicando na
										opção acima.
									</Text>
								</Flex>
							) : (
								<TableContainer w="full">
									<Table variant="striped">
										<Thead>
											<Tr>
												{headers.map((header) => (
													<Th key={header}>{header}</Th>
												))}
											</Tr>
										</Thead>
										<Tbody>
											{userEntries.map((entry) => (
												<Tr
													key={entry.id}
													borderBottom="1px"
													borderColor="gray"
												>
													<Td
														fontWeight="medium"
														color={formatColor(entry.type)}
													>
														{entry.description ? (
															<Tooltip
																color="white"
																label={entry.description}
																placement="bottom-start"
															>
																{entry.title}
															</Tooltip>
														) : (
															<Text>{entry.title}</Text>
														)}
													</Td>
													<Td>
														<Tag colorScheme="blue">{entry.tag}</Tag>
													</Td>
													<Td color={formatColor(entry.type)}>{entry.type}</Td>
													<Td fontWeight="bold" color={formatColor(entry.type)}>
														{formatCurrency(entry.value)}
													</Td>
													<Td>
														<Tooltip
															color="white"
															label={`Última atualização: ${formatDate(
																new Date(entry.updatedAt)
															)}`}
															placement="bottom-start"
														>
															<Text>
																{formatDate(new Date(entry.createdAt))}
															</Text>
														</Tooltip>
													</Td>
													<Td>
														<HStack spacing="12px">
															<Tooltip
																label="Editar registro"
																color="white"
																hasArrow
															>
																<span>
																	<IconButton
																		colorScheme="teal"
																		aria-label="Editar"
																		icon={<MdEdit />}
																		boxSize="32px"
																		minW="fit-content"
																		onClick={() =>
																			handleRedirectToEdit(entry.id)
																		}
																	/>
																</span>
															</Tooltip>
															<Tooltip
																label="Deletar registro"
																color="white"
																hasArrow
															>
																<span>
																	<IconButton
																		colorScheme="red"
																		aria-label="Deletar"
																		icon={<MdDelete />}
																		boxSize="32px"
																		minW="fit-content"
																		onClick={() =>
																			handleOpenDeletionModal(entry)
																		}
																	/>
																</span>
															</Tooltip>
														</HStack>
													</Td>
												</Tr>
											))}
										</Tbody>
									</Table>
								</TableContainer>
							)}
						</VStack>
					</SlideFade>
				</VStack>
			</VStack>
		</Flex>
	);
}
