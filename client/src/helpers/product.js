export const returnProductDataOnError = formData => {
    const productData = {pictures: []};
	for (const pair of formData.entries()) {
		if(pair[0] === 'options' || pair[0] === 'subcategories' || pair[0] === 'published') {
			productData[pair[0]] = JSON.parse(pair[1]);
		}else if(pair[0] === 'pictures') {
			productData.pictures.push(pair[1]);
		}else {
			productData[pair[0]] = pair[1];
		}
	 }
	productData.options = productData.options.map(option => {
		const newOpt = { ...option };
		const findFeaturedPictureInFiles = productData.pictures.find(
			file => file.name === option.featuredPicture
		);
		if (findFeaturedPictureInFiles) {
			newOpt.featuredPicture = findFeaturedPictureInFiles;
		}
		newOpt.pictures = option.pictures.map(picture => productData.pictures.find(file => file.name === picture));
		return newOpt;
	});
    delete productData.pictures;
    
    return productData;
}