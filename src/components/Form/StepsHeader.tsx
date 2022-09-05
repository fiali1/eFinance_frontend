import { Fragment } from 'react';
import { IconType } from 'react-icons';

import { HStack, VStack, Icon, Flex, Progress, Text } from '@chakra-ui/react';

type StepItem = {
	icon: IconType;
	label: string;
	size?: string;
};

interface StepsHeaderProps {
	index: number;
	stepItems: StepItem[];
}

export function StepsHeader({ index, stepItems }: StepsHeaderProps) {
	return (
		<HStack
			w={['full', 'full', 'full', null]}
			spacing="0"
			align="flex-start"
			justify="center"
		>
			{stepItems.map((item, count) => (
				<Fragment key={item.label}>
					<VStack w="100px" align="center" spacing="12px">
						<Icon
							as={item.icon}
							boxSize={item.size ?? '42px'}
							color={index >= count ? 'primary' : 'secondary'}
						/>
						<Text
							textAlign="center"
							whiteSpace="pre"
							color={index >= count ? 'primary' : 'secondary'}
							textShadow={
								index === count
									? '-0.5px 0px #009ef9, 0.5px 0px #009ef9'
									: 'normal'
							}
						>
							{item.label}
						</Text>
					</VStack>
					{count !== stepItems.length - 1 && (
						<Flex h="full" align="flex-start" pt="20px">
							<Progress
								borderRadius="4px"
								minW={['16px', '32px', '64px', '128px']}
								colorScheme="highlight"
								isIndeterminate={index === count}
								value={index > count ? 100 : 0}
								size="xs"
							/>
						</Flex>
					)}
				</Fragment>
			))}
		</HStack>
	);
}
