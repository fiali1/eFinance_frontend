import { Button } from '@chakra-ui/react';

interface SubmitButtonProps {
	label: string;
	isLoading?: boolean;
}

export function SubmitButton({ label, isLoading }: SubmitButtonProps) {
	return (
		<Button
			w="full"
			bgColor="primary"
			color="white"
			_hover={{ bgColor: 'cyan.700' }}
			type="submit"
			isLoading={isLoading}
		>
			{label}
		</Button>
	);
}
