export const getLastPageFromLinks = (links) => {
	const result = links.match(/_page=(\d{1,4})&limit=\d{1,3}>; rel="last"$/);

	return Number(result[1]);
};
