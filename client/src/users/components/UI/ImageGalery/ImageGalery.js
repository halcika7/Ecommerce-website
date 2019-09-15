import React, { useState } from 'react';

import LightboxModal from '../LightboxModal/LightboxModal';
import Img from './Img';

const ImageGalery = ({ images }) => {
	const [showLightboxModal, setLightboxModal] = useState(false);
	const [index, setIndex] = useState(0);

	const imageOnClick = (e, i) => {
		e.preventDefault();
		setIndex(i);
		setLightboxModal(true);
	};

	return (
		<React.Fragment>
			<div className="col-md-8">
				<div className="pictures">
					{images.map((picture, index) => (
						<div className="perviewImage" key={index}>
							<Img picture={picture} clicked={imageOnClick} index={index} />
						</div>
					))}
				</div>
			</div>
			{showLightboxModal && (
				<LightboxModal images={images} setShow={setLightboxModal} i={index} />
			)}
		</React.Fragment>
	);
};

export default React.memo(ImageGalery);
