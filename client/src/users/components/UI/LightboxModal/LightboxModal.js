import React, { useEffect, useState } from 'react';

import './LightboxModal.css';

const LightboxModal = ({ images, setShow, i }) => {
	const [Images, setImages] = useState([]);
	const [index, setIndex] = useState(0);
	const [translate, setTranslate] = useState(0);
    
	const [bounceRight, setBounceRight] = useState(false);
	const [bounceLeft, setBounceLeft] = useState(false);
    
	const [thumbBounceRight, setThumbBounceRight] = useState(false);
	const [thumbBounceLeft, setThumbBounceLeft] = useState(false);

	useEffect(() => {
		document.getElementById('modal').focus();
        document.querySelector('body').classList = 'no-scroll';
		return () => {
			document.getElementById('modal').blur();
            document.querySelector('body').classList = '';
		};
	}, []);

	useEffect(() => {
		setImages(images);
	}, [images]);

	useEffect(() => {
		setIndex(i);
	}, [i]);

	useEffect(() => {
		setTranslate(Math.floor(index / 9) * 900);
	}, [index]);

	const onKeyUp = (e, name = null) => {
		e.preventDefault();
		if ((e.keyCode === 37 || name === 'left') && index !== 0) {
			setIndex(index - 1);
		}
		if ((e.keyCode === 37 || name === 'left') && index === 0) {
			setBounceLeft(true);
			setTimeout(() => setBounceLeft(false), 1000);
		}
		if ((e.keyCode === 39 || name === 'right') && index !== Images.length - 1) {
			setIndex(index + 1);
		}
		if ((e.keyCode === 39 || name === 'right') && index === Images.length - 1) {
			setBounceRight(true);
			setTimeout(() => setBounceRight(false), 1000);
		}
	};

	const thumbnails = (e, name, i = null) => {
        e.preventDefault();
		const diff = Math.floor(images.length / 9) * 900 - 900;

		if (name === 'picture') {
			setIndex(i);
		}

		if (name === 'rightThumb' && translate <= diff) {
			setTranslate(translate + 100);
		} else if (name === 'rightThumb' && translate > diff) {
			setThumbBounceRight(true);
			setTimeout(() => setThumbBounceRight(false), 1000);
		}

		if (name === 'leftThumb' && translate > 0) {
			setTranslate(translate - 100);
		} else if (name === 'leftThumb' && translate === 0) {
			setThumbBounceLeft(true);
			setTimeout(() => setThumbBounceLeft(false), 1000);
		}
    };

	return (
		<div
			id="modal"
			className="light-box-modal open"
			tabIndex="0"
			onKeyUp={onKeyUp}>
			<div className="modal-content">
				<div className="close-modal" onClick={() => setShow(false)}>
					<i className="fas fa-times" />
				</div>
				<div className="main-img">
					<div
						className={
							bounceRight
								? 'img bounceRight'
								: bounceLeft
								? 'img bounceLeft'
								: 'img'
						}>
						<img
							src={Images[index]}
							className="image show"
							alt={Images[index]}
						/>
						<div className="img-description">
							<span className="img-alt show" />
						</div>
						<div className="number-imgs">
							<span className="img-active show">{index + 1}</span> / 
							 <span className="img-length show">{Images.length}</span>
						</div>
					</div>
					{Images.length > 1 &&
						<React.Fragment>
							<div className="arrow" onClick={e => onKeyUp(e, 'left')}>
								<i className="fas fa-arrow-left" />
							</div>
							<div className="arrow" onClick={e => onKeyUp(e, 'right')}>
								<i className="fas fa-arrow-right" />
							</div>
						</React.Fragment>
					}
				</div>
				<div className="thumbnails">
					{Images.length > 9 && (
						<div className="arrow" onClick={e => thumbnails(e, 'leftThumb')}>
							<i className="fas fa-arrow-left" />
						</div>
					)}
					<div
						className={
							thumbBounceLeft
								? 'bounceLeft images-thumb'
								: thumbBounceRight
								? 'bounceRight images-thumb'
								: 'images-thumb'
						}>
						{images.map((img, i) => (
							<img
								key={i}
								src={img}
								alt={img}
								className={index === i ? 'active' : ''}
								onClick={e => thumbnails(e, 'picture', i)}
								style={{ transform: `translateX(-${translate}px)` }}
							/>
						))}
					</div>
					{Images.length > 9 && (
						<div className="arrow" onClick={e => thumbnails(e, 'rightThumb')}>
							<i className="fas fa-arrow-right" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LightboxModal;
