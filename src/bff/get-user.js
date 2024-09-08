export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3005/users?login=${loginToFind}`)
		.then((responce) => responce.json())
		.then(([loadedUser]) => loadedUser);
