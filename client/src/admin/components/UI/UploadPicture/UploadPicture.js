import React, { useState, useEffect } from 'react';
import classes from './UploadPicture.module.css';

const UploadPicture = props => {
	const [url, setUrl] = useState({ imgSrc: 'http://placehold.it/180' });

	useEffect(() => {
		if(props.predefinedPicture) {
			helperFunction(props.predefinedPicture);
		}
	}, [props.predefinedPicture]);

	const readURL = e => {
		e.persist();
		const file = e.target.files[0];
		const name = e.target.name;
		helperFunction(file, name);
	};

	const helperFunction = (file, name=null) => {
		if (!file.type.match('image')) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);

		setUrl({ imgSrc: 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' });
		props.showButton && props.showButton(false);

		reader.onloadend = e => {
			setTimeout(() => {
				setUrl({
					imgSrc: reader.result
				});

				if(props.predefinedPicture || props.predefinedPicture === '') {
					props.change(file, props.index);
				}else {
					props.change(name, file);
				}

				props.showButton && props.showButton(true);
	
			}, 4000);
		};
	}

	return (
		<React.Fragment>
			<label className={classes.btn2}>
				Upload Picture
				<input
					className={classes.input}
					type="file"
					onChange={readURL}
					name={props.name}
				/>
			</label>
			<img
				id="updloadPicture"
				src={url.imgSrc}
				alt="you"
				width="180"
				height="180"
				className="d-block"
			/>
		</React.Fragment>
	);
};

export default UploadPicture;
