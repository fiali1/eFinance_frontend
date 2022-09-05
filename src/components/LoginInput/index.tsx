import { ChangeEvent, useState } from 'react';
import { IconType } from 'react-icons';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import {
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from '@chakra-ui/react';

interface LoginInputProps {
	value: string;
	placeholder: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	icon: IconType;
	password?: boolean;
}

export function LoginInput({
	value,
	placeholder,
	onChange,
	icon,
	password = false,
}: LoginInputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	function handlePasswordVisibilityChange() {
		setIsPasswordVisible(!isPasswordVisible);
	}

	return (
		<InputGroup w="full">
			<InputLeftElement>
				<Icon
					as={icon}
					boxSize="24px"
					color={value !== '' ? 'primary' : 'secondary'}
				/>
			</InputLeftElement>
			<Input
				borderTopRadius="4px"
				bgColor="white"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				variant="flushed"
				_focus={{ borderColor: 'primary' }}
				borderColor="gray.300"
				type={
					// eslint-disable-next-line no-nested-ternary
					password ? (isPasswordVisible ? undefined : 'password') : undefined
				}
			/>
			{password && (
				<InputRightElement>
					<IconButton
						color="text_light"
						display="flex"
						justifyContent="center"
						alignItems="center"
						icon={isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
						aria-label="show/hide password"
						variant="unstyled"
						onClick={handlePasswordVisibilityChange}
						_focus={{ boxShadow: 'none' }}
					/>
				</InputRightElement>
			)}
		</InputGroup>
	);
}
