export const returnStoresDataOnError = formData => {
	const productData = {};
	for (const pair of formData.entries()) {
		if (pair[0] === 'picture') {
			productData[pair[0]] = pair[1];
		} else if (pair[0] === 'id') {
		} else {
			productData.options = { ...JSON.parse(pair[1]) };
		}
	}
	return productData;
};
