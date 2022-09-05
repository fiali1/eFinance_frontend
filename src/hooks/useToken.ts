import { useState } from 'react';

export default function useToken() {
	const getToken = () => {
		const tokenString = sessionStorage.getItem('token');
		if (!tokenString) {
			return null;
		}

		const tokenItem = JSON.parse(tokenString);
		return tokenItem.token;
	};

	const [token, setToken] = useState<string | null>(getToken());

	const saveToken = (tokenString: string) => {
		const tokenItem = { token: tokenString };
		sessionStorage.setItem('token', JSON.stringify(tokenItem));
		setToken(tokenItem.token);
	};

	return {
		token,
		setToken: saveToken,
	};
}
