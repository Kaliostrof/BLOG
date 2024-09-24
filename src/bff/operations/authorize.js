import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);
	if (!user) {
		return {
			error: 'Такой пользователь не найден',
			resp: null,
		};
	}

	const { id, login, password, roleId } = user;

	if (authPassword !== password) {
		return {
			error: 'Неверный пароль',
			resp: null,
		};
	}

	return {
		error: null,
		resp: {
			id,
			login,
			roleId,
			session: sessions.create(user),
		},
	};
};
