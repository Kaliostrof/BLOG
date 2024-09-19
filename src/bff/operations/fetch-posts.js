import { getComments, getPosts } from '../api';
import { getCommentsCount } from '../utils';

export const fetchPosts = async (page, limit) => {
	const [{ posts, links }, comments] = await Promise.all([
		getPosts(page, limit),
		getComments(),
	]);
	return {
		error: null,
		resp: {
			posts: posts.map((post) => ({
				...post,
				commentsCount: getCommentsCount(comments, post.id),
			})),
			links,
		},
	};
};
