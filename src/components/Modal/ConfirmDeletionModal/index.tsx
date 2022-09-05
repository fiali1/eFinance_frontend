import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Text,
	Flex,
} from '@chakra-ui/react';

interface ConfirmDeletionModalProps {
	isOpen: boolean;
	onCancel: () => void;
	label: string;
	item: string;
	deleteFunction: () => Promise<void>;
	isDeleting: boolean;
}

export function ConfirmDeletionModal({
	isOpen,
	onCancel,
	label,
	item,
	deleteFunction,
	isDeleting,
}: ConfirmDeletionModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onCancel}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Deletar registro</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex flexDir="column" align="center">
						<Text>{label}</Text>
						<Text as="b" fontSize="sm" mb="12px">
							Isso não poderá ser desfeito.
						</Text>
						<Text color="red" fontSize="xl">
							{item}
						</Text>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<Flex w="full" align="center" justify="space-between">
						<Button onClick={onCancel}>Cancelar</Button>
						<Button
							colorScheme="red"
							onClick={deleteFunction}
							isLoading={isDeleting}
						>
							Deletar
						</Button>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
