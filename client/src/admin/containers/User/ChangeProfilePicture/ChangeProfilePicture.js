import React, { useState } from 'react';
import UploadPicture from '../../../components/UI/UploadPicture/UploadPicture';

const ChangeProfilePicture = props => {
	const [image, setImage] = useState(false);
	const onProfilePictureChange = (name, file) => setImage({ [name]: file });
	const onFormSubmit = e => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('username', props.username);
		formData.append('profilePicture', image.profilePicture);

		const config = { headers: { 'content-type': 'multipart/form-data' } };

		props.submit(formData, config, props.id);

		document
			.querySelector('#updloadPicture')
			.setAttribute('src', 'http://placehold.it/180');
		setImage(false);
	};

	return (
		<div className="col-md-6 mb-30">
			<div className="card text-white">
				<div className="card-header">
					<h5 className="title">Change Profile Picture</h5>
				</div>
				<div className="card-body">
					<form className="" onSubmit={onFormSubmit}>
						<div className="row mb-10">
							<div className="pr-md-1 col">
								<div className="form-group">
									<UploadPicture
										name="profilePicture"
										change={onProfilePictureChange}
									/>
								</div>
							</div>
						</div>
						{image && <button type="submit" className="btn-fill btn btn-primary">
							Update Profile Picture
						</button>}
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChangeProfilePicture;
