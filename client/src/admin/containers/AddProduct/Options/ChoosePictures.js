import React from 'react';
import UploadPicture from '../../../components/UI/UploadPicture/UploadPicture';
import UploadPictures from '../../../components/UI/UploadPictures/UploadPictures';

const ChoosePictures = ({ changeFeaturedPicture, changePictures, setShowButton }) => {
	return (
		<React.Fragment>
			<label className="d-block">Featured Picture</label>
			<UploadPicture
				name="featuredPicture"
				change={changeFeaturedPicture}
				showButton={setShowButton}
			/>
			<label className="d-block mt-4">Upload Pictures</label>
			<UploadPictures
				name="multyPictures"
				change={changePictures}
				showButton={setShowButton}
			/>
		</React.Fragment>
	);
};

export default ChoosePictures;
