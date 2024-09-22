import { transformPost } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`)
		.then((resp) => {
			if (resp.ok) {
				return resp;
			}

			const error =
				resp.status === 404
					? 'Такая страница не существует'
					: 'Что-то полно не так. Попробуйте позднее!';

			return Promise.reject(error);
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost));
