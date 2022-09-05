import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

const theme = extendTheme({
	...config,
	colors: {
		text: '#333333',
		text_light: '#5C5C5C',
		primary: '#009FF9',
		secondary: '#666666',
		positive: '#128942',
		positive_bg: '#bbfad5',
		negative: '#FF4848',
		negative_bg: '#f7d5d5',
		body: '#5FB76D',
		shape: '#F8F8F8',
		glass_bg: 'rgba(255, 255, 255, 0.15)',
		glass_dark_bg: 'rgba(0, 0, 0, 0.7)',

		highlight: {
			100: '#e1f1fd',
			200: '#b5dbfc',
			300: '#85c5fb',
			400: '#4daff9',
			500: '#009ef9',
			600: '#008ef8',
			700: '#0080e9',
			800: '#006ed6',
			900: '#005dc5',
		},
	},
	shadows: {
		card: '0 1px 2px rgba(51,51,51,0.12), 0 1px 2px rgba(51,51,51,0.24)',
		card_hover: '0 3px 6px rgba(51,51,51,0.16), 0 3px 6px rgba(51,51,51,0.23)',
		glass_shadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
	},
	styles: {
		global: {
			body: {
				bg: 'page',
				fontFamily: 'Ubuntu',
			},
			'.content a': {
				color: 'link',
				_hover: {
					textDecor: 'underline',
				},
			},
			ul: {
				paddingLeft: ['8px', '8px', '8px', '32px'],
			},
			ol: {
				paddingLeft: ['8px', '8px', '8px', '32px'],
			},
			'&::-webkit-scrollbar': {
				width: '10px',
				backgroundColor: `rgba(0, 0, 0, 0.2)`,
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: `rgba(0, 0, 0, 0.3)`,
			},
		},
	},
});

export default theme;
