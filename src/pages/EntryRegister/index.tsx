import { useEffect, useState } from 'react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaInfoCircle } from 'react-icons/fa';
import { RiEditCircleLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

import { Fade, Flex, Spinner, Text, useToast, VStack } from '@chakra-ui/react';

import { ContentContainer } from '../../components/ContentContainer';
import { EntryRegisterForm } from '../../components/Form/EntryRegisterForm';
import { StepsHeader } from '../../components/Form/StepsHeader';
import { api } from '../../services/api';
import { EntryFormData } from '../../types/formData';

interface EntryRegisterProps {
	token: string | null;
	update?: boolean;
}

export function EntryRegister({ token, update = false }: EntryRegisterProps) {
	const [index, setIndex] = useState(0);
	const [formData, setFormData] = useState<EntryFormData>({
		title: '',
		description: undefined,
		tag: '',
		type: '',
		value: 0,
	});
	const [isLoading, setIsLoading] = useState(false);

	const { id } = useParams();
	const navigate = useNavigate();
	const toast = useToast();

	const steps = [
		{
			label: `Descrição${'\n'}do registro`,
			icon: RiEditCircleLine,
		},
		{
			label: 'Valor',
			icon: AiFillDollarCircle,
			size: '46px',
		},
		{
			label: `Revisão${'\n'}de dados`,
			icon: FaInfoCircle,
		},
	];

	function handleTransition(target: number) {
		if (target < 0) {
			navigate('/');
			return;
		}

		setIndex(target);
	}

	async function handleSubmit() {
		const { title, description, tag, type, value } = formData;

		try {
			setIsLoading(true);

			// Create or Update operations
			if (!update) {
				await api.post(
					'/entries',
					{
						title,
						description,
						tag,
						type,
						value,
					},
					{
						headers: {
							authorization: token || '',
						},
					}
				);
			} else {
				if (!id) return;

				await api.put(
					`/entries/${id}`,
					{
						title,
						description,
						tag,
						type,
						value,
					},
					{
						headers: {
							authorization: token || '',
						},
					}
				);
			}

			handleTransition(index + 1);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast({
				title: 'Erro',
				status: 'error',
				description: `Ocorreu um problema ao tentar realizar o registro: ${error.message}`,
				position: 'bottom',
				duration: 9000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		async function loadData() {
			if (id) {
				try {
					const response = await api.get(`/entries/${id}`, {
						headers: { authorization: token || '' },
					});
					const { data } = response;
					setFormData(data);
				} catch (error) {
					toast({
						title: 'Erro',
						description:
							'Ocorreu um erro ao carregar as informações do servidor',
						status: 'error',
						duration: 5000,
						isClosable: true,
					});

					navigate('/');
				}
			} else {
				navigate('/');
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
							{!update ? 'Novo registro' : 'Atualizar registro'}
						</Text>
					</Flex>

					{index < 3 && <StepsHeader index={index} stepItems={steps} />}

					<VStack w="full">
						{(update && !!formData.title) || !update ? (
							<Fade
								in={(update && !!formData.title) || !update}
								style={{ width: '100%' }}
							>
								<EntryRegisterForm
									index={index}
									formData={formData}
									setEntryFormData={setFormData}
									handleSubmit={handleSubmit}
									handleTransition={handleTransition}
									isLoading={isLoading}
								/>
							</Fade>
						) : (
							<Flex h="300px" align="center" justify="center">
								<Spinner color="blue.400" />
							</Flex>
						)}
					</VStack>

					<VStack w="full" spacing="42px"></VStack>
				</VStack>
			</Flex>
		</ContentContainer>
	);
}
