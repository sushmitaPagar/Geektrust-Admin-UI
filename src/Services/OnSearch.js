const searchData = (text, data) => {
    if (text === "") {
		return data;
	} else {
		let lowerText = text.toLowerCase();
		const res = data.filter((user) => {
			if (
				user.name.toLowerCase().includes(lowerText) ||
				user.email.toLowerCase().includes(lowerText) ||
				user.role.toLowerCase().includes(lowerText)
			) {
				return user;
			}
		});

		return res;
	}
};

export default searchData;