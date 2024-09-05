import { addUser } from './add-user';
import { getUser } from './get-user';
import { sessions } from './sessions';

export const server = {
	async logout(session) {
		sessions.remove(session);
	},
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				resp: null,
			};
		}

		if (authPassword !== user.password) {
			return {
				error: 'Неверный пароль',
				resp: null,
			};
		}

		return {
			error: null,
			resp: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
	async register(regLogin, regPassword) {
		const user = await getUser(regLogin);

		if (user) {
			return {
				error: 'Такой логин уже занят',
				resp: null,
			};
		}

		await addUser(regLogin, regPassword);

		return {
			error: null,
			resp: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
};
