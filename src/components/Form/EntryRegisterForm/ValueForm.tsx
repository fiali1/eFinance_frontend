import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SchemaOf, object, string, number } from 'yup';

import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputLeftAddon,
	Select,
	VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';

import { EntryFormData } from '../../../types/formData';

interface ValueFormProps {
	currentEntryFormData: EntryFormData;
	setCurrentEntryFormData: (data: EntryFormData) => void;
	index: number;
	handleTransition: (target: number) => void;
}

type Inputs = {
	type: string;
	value: number;
};

export function ValueForm({
	currentEntryFormData,
	setCurrentEntryFormData,
	index,
	handleTransition,
}: ValueFormProps) {
	const schema: SchemaOf<Inputs> = object({
		type: string().required('Este campo é obrigatório'),
		value: number()
			.positive('Insira um valor maior que R$ 0,00')
			.required('Este campo é obrigatório'),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		defaultValues: {
			type: currentEntryFormData.type || '',
			value: currentEntryFormData.value || 0,
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async (formData: Inputs) => {
		const { type, value } = formData;

		setCurrentEntryFormData({
			...currentEntryFormData,
			type,
			value,
		});
		handleTransition(index + 1);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
			<VStack spacing="24px">
				<FormControl w="full" isInvalid={errors.type !== undefined}>
					<FormLabel>Tipo de registro*</FormLabel>
					<Controller
						control={control}
						name="type"
						render={({ field: { value, onChange } }) => (
							<Select
								borderColor="gray.400"
								value={value}
								onChange={onChange}
								placeholder="Tipo"
							>
								<option value="Entrada">Entrada (Recebeu)</option>
								<option value="Saída">Saída (Gastou)</option>
							</Select>
						)}
					/>
					<FormErrorMessage>
						{errors.type && errors.type.message}
					</FormErrorMessage>
				</FormControl>

				<FormControl w="full" isInvalid={errors.value !== undefined}>
					<FormLabel>Valor*</FormLabel>
					<Controller
						control={control}
						name="value"
						render={({ field: { value, onChange } }) => (
							<InputGroup>
								<InputLeftAddon children="R$" />
								<Input
									borderColor="gray.400"
									value={value}
									onChange={onChange}
									type="number"
								/>
							</InputGroup>
						)}
					/>
					<FormErrorMessage>
						{errors.value && errors.value.message}
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
