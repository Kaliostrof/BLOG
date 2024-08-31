import { removeComment } from './session/remove-comment';
import { ROLE } from '../constants/role';

export const createSession = (roleId) => {
	const session = {
		logout() {
			Object.keys(session).forEach((key) => {
				delete session[key]; // проходим по всем ключам объекта session и удаяем их
			});
		},
	};

	switch (roleId) {
		case ROLE.ADMIN: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.MODERATOR: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.READER: {
			break;
		}
		default:
		//ничего не делать
	}
	return session;
};
