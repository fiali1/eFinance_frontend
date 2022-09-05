import * as React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { Dashboard } from './pages/Dashboard';
import theme from './styles/theme';

export const App = () => (
	<ChakraProvider theme={theme}>
		<Dashboard />
	</ChakraProvider>
);
