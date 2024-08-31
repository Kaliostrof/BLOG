import { addUser } from './add-user';
import { createSession } from './create-session';
import { getUser } from './get-user';

export const server = {
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
			resp: createSession(user.role_id),
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
			resp: createSession(user.role_id),
		};
	},
};
