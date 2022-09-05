import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SchemaOf, object, string } from 'yup';

import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
	Textarea,
	VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { EntryFormData } from '../../../types/formData';

interface EntryDataFormProps {
	currentEntryFormData: EntryFormData;
	setCurrentEntryFormData: (data: EntryFormData) => void;
	index: number;
	handleTransition: (target: number) => void;
}

type Inputs = {
	title: string;
	description?: string;
	tag: string;
};

export function EntryDataForm({
	currentEntryFormData,
	setCurrentEntryFormData,
	index,
	handleTransition,
}: EntryDataFormProps) {
	const schema: SchemaOf<Inputs> = object({
		title: string()
			.max(200, 'Respeite o limite de caracteres')
			.required('Este campo é obrigatório'),
		description: string()
			.max(300, 'Respeite o limite de caracteres')
			.optional(),
		tag: string().required('Este campo é obrigatório'),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		defaultValues: {
			title: currentEntryFormData.title || '',
			description: currentEntryFormData.description || '',
			tag: currentEntryFormData.tag || '',
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
		const { title, description, tag } = formData;

		setCurrentEntryFormData({
			...currentEntryFormData,
			title,
			description,
			tag,
		});
		handleTransition(index + 1);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
			<VStack spacing="24px">
				<FormControl w="full" isInvalid={errors.title !== undefined}>
					<FormLabel>Título do registro*</FormLabel>
					<Controller
						control={control}
						name="title"
						render={({ field: { value, onChange } }) => (
							<Input borderColor="gray.400" value={value} onChange={onChange} />
						)}
					/>
					<FormErrorMessage>
						{errors.title && errors.title.message}
					</FormErrorMessage>
				</FormControl>

				<FormControl w="full" isInvalid={errors.description !== undefined}>
					<FormLabel>Descrição</FormLabel>
					<Controller
						control={control}
						name="description"
						render={({ field: { value, onChange } }) => (
							<Textarea
								borderColor="gray.400"
								value={value}
								onChange={onChange}
								rows={5}
							/>
						)}
					/>
					<FormErrorMessage>
						{errors.description && errors.description.message}
					</FormErrorMessage>
				</FormControl>

				<FormControl w="full" isInvalid={errors.tag !== undefined}>
					<FormLabel>Tag*</FormLabel>
					<Controller
						control={control}
						name="tag"
						render={({ field: { value, onChange } }) => (
							<Select
								borderColor="gray.400"
								value={value}
								onChange={onChange}
								placeholder="Tag"
							>
								<option value="Remuneração">Remuneração</option>
								<option value="Saude">Saude</option>
								<option value="Educacao">Educacao</option>
								<option value="Alimentação">Alimentação</option>
								<option value="Contas">Contas</option>
								<option value="Investimentos">Investimentos</option>
								<option value="Lazer">Lazer</option>
								<option value="Outros">Outros</option>
							</Select>
						)}
					/>
					<FormErrorMessage>
						{errors.tag && errors.tag.message}
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
