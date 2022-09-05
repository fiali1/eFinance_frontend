import { Navigate, Routes, Route } from 'react-router-dom';

import useToken from '../hooks/useToken';
import { EntryRegister } from '../pages/EntryRegister';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Profile } from '../pages/Profile';
import { Register } from '../pages/Register';

export function AppRoutes() {
	const { token, setToken } = useToken();

	const AuthCheck = ({ element }: { element: JSX.Element }) => {
		if (!token) {
			return <Navigate replace to="/login" />;
		}

		return element;
	};

	return (
		<Routes>
			<Route
				path="/"
				element={<AuthCheck element={<Home token={token} />} />}
			/>
			<Route path="/login" element={<Login setToken={setToken} />} />
			<Route path="/register" element={<Register token={token} />} />
			<Route
				path="/profile"
				element={
					<AuthCheck element={<Profile token={token} setToken={setToken} />} />
				}
			/>
			<Route
				path="/profile/edit"
				element={<AuthCheck element={<Register token={token} update />} />}
			/>
			<Route
				path="/entries/create"
				element={<AuthCheck element={<EntryRegister token={token} />} />}
			/>
			<Route
				path="/entries/edit/id=:id"
				element={<AuthCheck element={<EntryRegister token={token} update />} />}
			/>
		</Routes>
	);
}
