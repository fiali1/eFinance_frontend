import { FaCheck } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

import { VStack, Flex, Button, Icon, Text } from '@chakra-ui/react';

import { EntryFormData } from '../../../types/formData';
import { formatCurrency } from '../../../utils/formatCurrency';
import { EntryDataForm } from './EntryDataForm';
import { ValueForm } from './ValueForm';

interface EntryRegisterFormProps {
	index: number;
	formData: EntryFormData;
	setEntryFormData: (formData: EntryFormData) => void;
	handleTransition: (target: number) => void;
	isLoading: boolean;
	handleSubmit: () => void;
	update?: boolean;
}

export function EntryRegisterForm({
	index,
	formData,
	setEntryFormData,
	handleTransition,
	handleSubmit,
	isLoading,
}: EntryRegisterFormProps) {
	switch (index) {
		case 0:
			return (
				<EntryDataForm
					currentEntryFormData={formData}
					setCurrentEntryFormData={setEntryFormData}
					index={index}
					handleTransition={handleTransition}
				/>
			);
		case 1:
			return (
				<ValueForm
					currentEntryFormData={formData}
					setCurrentEntryFormData={setEntryFormData}
					index={index}
					handleTransition={handleTransition}
				/>
			);
		case 2:
			return (
				<VStack w="full" spacing="24px">
					<VStack w="full" p="36px 0" spacing="12px">
						<Flex w="full" align="center" justify="space-between">
							<Text as="b">Título do registro:</Text>
							<Text>{formData.title}</Text>
						</Flex>
						<Flex w="full" align="center" justify="space-between">
							<Text as="b">Descrição:</Text>
							<Text>{formData.description}</Text>
						</Flex>
						<Flex w="full" align="center" justify="space-between">
							<Text as="b">Tag:</Text>
							<Text>{formData.tag}</Text>
						</Flex>
						<Flex w="full" align="center" justify="space-between">
							<Text as="b">Tipo de registro:</Text>
							<Text>{formData.type}</Text>
						</Flex>
						<Flex w="full" align="center" justify="space-between">
							<Text fontSize="lg" as="b">
								Valor:
							</Text>
							<Text fontSize="lg">{formatCurrency(formData.value)}</Text>
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
		case 3:
			return (
				<Flex
					flexDir="column"
					w="full"
					h="500px"
					align="center"
					justify="center"
				>
					<VStack w={['full', 'full', 'full', '45%']} spacing="20px">
						<Flex align="center">
							<Icon as={FaCheck} color="positive" boxSize="24px" mr="12px" />
							<Text>Registro realizado com sucesso</Text>
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
		default:
			return null;
	}
}
