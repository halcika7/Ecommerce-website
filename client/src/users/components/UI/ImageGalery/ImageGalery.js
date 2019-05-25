import React, { useEffect, useState } from 'react';

import SmallSpinner from '../SmallSpinner/SmallSpinner';
import LightboxModal from '../LightboxModal/LightboxModal';

const ImageGalery = ({ images }) => {
    const [Images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLightboxModal, setLightboxModal] = useState(false);
    const [index, setIndex] = useState(0);

	useEffect(() => {
        setImages(images);
        setLoading(true);
        window.addEventListener('resize', resizeAllGridItems);
        return () => {
            window.removeEventListener('resize', resizeAllGridItems);
        }
    }, [images]);
    
	useEffect(() => {
        setTimeout(() => {
            if(Images.length > 0) {
                setLoading(false);
                }
            }, 2000);
        setTimeout(() => {
        if(Images.length > 0) {
                resizeAllGridItems();
            }
        }, 2080);
	}, [Images]);

	const resizeAllGridItems = (d=null) => {
		document.querySelectorAll('.perviewImage').forEach(item => {
			const grid = document.querySelector('.pictures'),
				rowHeight = parseInt(
					window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
				),
				rowGap = parseInt(
					window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
				),
				rowSpan = Math.ceil(
					(item.querySelector('img').getBoundingClientRect().height + rowGap) /
						(rowHeight + rowGap)
				);
			item.style.gridRowEnd = 'span ' + rowSpan;
		});
    };

    const imageOnClick = (e, i) => {
        e.preventDefault();
        setIndex(i);
        setLightboxModal(true);
    }
    
	return (
        <React.Fragment>
            <div className="col-md-8">
                {loading ? (
                    <SmallSpinner />
                ) : (
                    <div className="pictures">
                        {images.map((picture, index) => (
                            <div className="perviewImage" key={index}>
                                <img src={picture} alt={picture} onClick={e => imageOnClick(e, index)}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showLightboxModal && <LightboxModal images={Images} setShow={setLightboxModal} i={index} />}
        </React.Fragment>
	);
};

export default ImageGalery;
