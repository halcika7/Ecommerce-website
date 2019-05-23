import React from 'react';
import UploadPicture from '../../../components/UI/UploadPicture/UploadPicture';
import UploadPictures from '../../../components/UI/UploadPictures/UploadPictures';

const OptionsPictures = ({
	options,
	setShowButton,
	index,
	error,
	setOptions
}) => {
	const changeOptionPicture = (file, index) => {
		const changedOptionFeaturedPicture = [...options];
		changedOptionFeaturedPicture[index].featuredPicture = file;
		setOptions(changedOptionFeaturedPicture);
	};

	const changeOptionPictures = (files, index) => {
		const changedOptionPictures = [...options];
		changedOptionPictures[index].pictures = [];
		changedOptionPictures[index].pictures = changedOptionPictures[
			index
		].pictures.concat(files);
		setOptions(changedOptionPictures);
	};
	return (
		<div className="form-group row">
			<div className="col-12 mb-3">
				<label className="d-block">Feature Option Picture</label>
				<UploadPicture
					name="featuredPicture"
					change={changeOptionPicture}
					predefinedPicture={options[index].featuredPicture}
					showButton={setShowButton}
					index={index}
				/>
				{error && error.featuredPicture && (
					<div className="options-error">{error.featuredPicture}</div>
				)}
			</div>
			<div className="col-12 mb-3">
				<label className="d-block">Feature Option Pictures</label>
				<UploadPictures
					name="multyPictures"
					change={changeOptionPictures}
					index={index}
					showButton={setShowButton}
					predefinedPictures={options[index].pictures}
				/>
				{error && error.pictures && (
					<div className="options-error">{error.pictures}</div>
				)}
			</div>
		</div>
	);
};

export default OptionsPictures;
