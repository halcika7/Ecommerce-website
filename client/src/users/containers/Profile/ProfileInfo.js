import React, { useState } from 'react';

const ProfileInfo = ({ inputValues, inputChange, onFormSubmit, passwords, passwordChange, updatePassword, username, id, updateProfilePicture }) => {
    const [url, setUrl] = useState({ imgSrc: 'http://placehold.it/180' });
    const [img, setImg] = useState({});
    const [showButton, setShowButton] = useState(true);

    const readURL = e => {
		e.persist();
		const file = e.target.files[0];
        if (!file.type.match('image')) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);

        setUrl({ imgSrc: 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' });
        setImg(file);
        setShowButton(false);

		reader.onloadend = e => {
			setTimeout(() => {
				setUrl({
					imgSrc: reader.result
                });
                setShowButton(true);
			}, 4000);
		};
    };
    
    const submitUpdateProfilePicture = e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('username', username);
		formData.append('profilePicture', img);
        const config = { headers: { 'content-type': 'multipart/form-data' } };

        updateProfilePicture(formData, config, id);
        setUrl({ imgSrc: 'http://placehold.it/180' })
    };
    
    return (
        <div className="tab-pane fade show active" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
            <h5>Personal Info</h5>
            <div className="col-12">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name='name' value={inputValues.name ? inputValues.name : ''} onChange={inputChange} placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name='username' value={inputValues.username ? inputValues.username : ''} onChange={inputChange} placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label >Email</label>
                    <input type="email" name='email' value={inputValues.email ? inputValues.email : ''} onChange={inputChange} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label >Telephone</label>
                    <input type="tel" name="telephone" value={inputValues.telephone} onChange={inputChange} placeholder="Enter phone number" />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <select name="country" value={inputValues.country} onChange={inputChange}>
                        <option value="BIH">Bosnia and Herzegovina</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={inputValues.address} onChange={inputChange} placeholder="Enter Street Address" />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={inputValues.city} onChange={inputChange} placeholder="Enter City" />
                </div>
                <div className="form-group">
                    <label>Postcode/Zip</label>
                    <input type="text" name="postal" value={inputValues.postal} onChange={inputChange} placeholder="Enter Postal/Zip code" />
                </div>
                <button className="btn btn-info" onClick={onFormSubmit}>Save Changes</button>
            </div>
            <br />
            <h5>Change Password</h5>
            <div className="col-12">
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" name='password' value={passwords.password} onChange={passwordChange} placeholder="*********" />
                </div>
                <div className="form-group">
                    <label>Repeat Password</label>
                    <input type="password" name='password2' value={passwords.password2} onChange={passwordChange} placeholder="*********" />
                </div>
                <button className="btn btn-info" onClick={updatePassword}>Save Password</button>
            </div>
            <br />
            <h5>Update Picture</h5>
            <div className="col-12">
                <div className="form-group">
                    <label htmlFor="updateProfilePicture">Update Profile Picture</label>
                    <input type="file" name="updateProfilePicture" onChange={readURL} />
                    <img
                        src={url.imgSrc}
                        alt="you"
                        width="180"
                        height="180"
                        className="d-block mt-2"
                    />
                </div>
                {showButton && <button className="btn btn-info" onClick={submitUpdateProfilePicture}>Save Profile Picture</button>}
            </div>
        </div>
    );
}

export default ProfileInfo;