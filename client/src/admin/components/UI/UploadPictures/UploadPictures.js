import React, { useState, useEffect } from 'react';
import classes from './UploadPictures.module.css';

const UploadPictures = props => {
	const [pictures, setPictures] = useState([]);
	const [pictureLoaded, setPictureLoaded] = useState([]);

	useEffect(() => {
		if (props.predefinedPictures) {
			helperMethod(props.predefinedPictures);
		}
	}, [props.predefinedPictures]);

	useEffect(() => {
		if (props.predefinedPictures) {
			props.change(pictures, props.index);
		} else {
			props.change(pictures);
		}
	}, [pictures]);

	const readURL = e => {
		e.persist();
		const files = e.target.files;

		helperMethod(files);
	};

	const helperMethod = files => {
		const newPictures = [...pictures];
		const newPictureLoaded = [...pictureLoaded];
		for (let file of files) {
			if (!file.type.match('image')) continue;
			const picReader = new FileReader();
			picReader.readAsDataURL(file);

			newPictures.push(file);
			setPictures(newPictures);

			picReader.onload = async e => {
				const picFile = e.target.result;
				newPictureLoaded.push({
					file: picFile,
					loading:
						'http://assets.motherjones.com/interactives/projects/features/koch-network/shell19/img/loading.gif'
				});
				props.showButton && props.showButton(false);
				setTimeout(() => setPictureLoaded(newPictureLoaded), 300);
			};

			picReader.onloadend = e => {
				const newPictureLoade = newPictureLoaded.map(item => ({
					file: item.file
				}));
				setTimeout(() => {props.showButton && props.showButton(true);setPictureLoaded(newPictureLoade);}, 4000);
			};
		}
	};

	const deleteButton = (e, index) => {
		e.preventDefault();
		const newPictures = [...pictures];
		if (newPictures.length > 1) {
			newPictures.splice(index, 1);
			setPictures(newPictures);
			const newPictureLoaded = [...pictureLoaded];
			newPictureLoaded.splice(index, 1);
			setPictureLoaded(newPictureLoaded);
		}
	};

	return (
		<React.Fragment>
			<label className={classes.btn2}>
				Upload Pictures
				<input
					className={classes.input}
					type="file"
					onChange={readURL}
					multiple
				/>
			</label>
			{pictures.length > 0 && (
				<div className={classes.imagesPerview}>
					{pictureLoaded.map((picture, index) => (
						<div className={classes.perviewImage} key={index}>
							{(!picture.loading && pictures.length > 1)&& (
								<div
									className={classes.imageCancle}
									onClick={e => deleteButton(e, index)}>
									<div className="button-block">
										<i className="mark x" />
										<i className="mark xx" />
									</div>
								</div>
							)}
							<img
								src={picture.loading ? picture.loading : picture.file}
								alt={picture.file}
							/>
						</div>
					))}
				</div>
			)}
		</React.Fragment>
	);
};

export default UploadPictures;
