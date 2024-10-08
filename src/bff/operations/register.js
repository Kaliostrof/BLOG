import { addUser, getUser } from '../api';
import { sessions } from '../sessions';
import { transformUser } from '../transformers';

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin);

	if (existedUser) {
		return {
			error: 'Такой логин уже занят',
			resp: null,
		};
	}

	const user = await addUser(regLogin, regPassword);

	return {
		error: null,
		resp: {
			id: user.id,
			login: user.login,
			roleId: user.role_id,
			session: sessions.create(transformUser(user)),
		},
	};
};
