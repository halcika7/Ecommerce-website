import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './User.css';

import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';
import LoginRegisterInputs from '../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ToggleSwitch from '../../components/UI/Buttons/ToggleSwitchButton';
import AdminProfileHeader from './ProfileHeader/ProfileHeader';
import AdminNewPassword from './NewPassword/NewPassword';
import AdminChangeProfilePicture from './ChangeProfilePicture/ChangeProfilePicture';

const User = props => {
	const userID = props.match.params.id
		? props.match.params.id
		: new URLSearchParams(props.location.search).get('id');
	const profile = props.profile ? true : false;

	const [user, setUser] = useState({});
	const [roles, setRoles] = useState([]);
	const [inputValues, setInputValues] = useState({
		dob: '',
		doe: '',
		facebook: '',
		instagram: '',
		github: '',
		twitter: '',
		salary: '',
		telephone: '',
		country: '',
		address: '',
		city: '',
		postal: '',
		role: '',
		confirmed: false,
		name: '',
		username: '',
		email: ''
	});
	const [inputsCol12] = useState([
		{ label: 'Name', type: 'text', name: 'name', placeholder: 'Name' },
		{
			label: 'User Name',
			type: 'text',
			name: 'username',
			placeholder: 'User Name'
		},
		{ label: 'Email', type: 'email', name: 'email', placeholder: 'Email' }
	]);

	const [inputsCol4] = useState([
		{ label: 'Country', type: 'text', name: 'country', placeholder: 'Country' },
		{ label: 'City', type: 'text', name: 'city', placeholder: 'City' },
		{
			label: 'Postal Code',
			type: 'text',
			name: 'postal',
			placeholder: 'Postal Code'
		}
	]);

	const [inputsCol6] = useState([
		{ label: 'Salary', type: 'text', name: 'salary', placeholder: 'Salary' },
		{
			label: 'Telephone',
			type: 'phone',
			name: 'telephone',
			placeholder: 'Telephone Number'
		}
	]);

	const [inputsCol3] = useState([
		{
			label: 'Facebook Link',
			type: 'text',
			name: 'facebook',
			placeholder: 'Facebook Link'
		},
		{
			label: 'Instagram Link',
			type: 'text',
			name: 'instagram',
			placeholder: 'Instagram Link'
		},
		{
			label: 'Github Link',
			type: 'text',
			name: 'github',
			placeholder: 'Github Link'
		},
		{
			label: 'Twitter Link',
			type: 'text',
			name: 'twitter',
			placeholder: 'Twitter Link'
		}
	]);

	const [inputsCol6S] = useState([
		{
			label: 'Date of Birth',
			type: 'date',
			name: 'dob',
			placeholder: 'Date of Birth'
		},
		{ label: 'Date of Employment', type: 'date', name: 'doe', placeholder: '' }
	]);

	useEffect(() => {
		props.getUser(userID, props.UserID, profile);
		if (!(props.profile && userID !== props.UserID)) {
			props.getRoles();
		}
	}, []);
	useEffect(() => {
		props.getUser(userID, props.UserID, profile);
		if (!(props.profile && userID !== props.UserID)) {
			props.getRoles();
		}
	}, [props.location.search, props.match.params]);
	useEffect(() => {
		if (props.errorID) {
			props.history.goBack();
		}
	}, [props.errorID]);
	useEffect(() => {
		setUser({ ...user, ...props.User });
		setInputValues({
			...inputValues,
			...props.User.userInfo,
			role: props.User.role,
			...props.User.emailConfirmation,
			name: props.User.name,
			username: props.User.username,
			email: props.User.email
		});
	}, [props.User]);
	useEffect(() => {
		setRoles(props.roles);
	}, [props.roles]);

	const inputChange = e => {
		e.preventDefault();
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
	};

	const onFormSubmit = e => {
		e.preventDefault();
		const userData = {
			userInfo: {
				dob: inputValues.dob,
				doe: inputValues.doe,
				facebook: inputValues.facebook,
				instagram: inputValues.instagram,
				github: inputValues.github,
				twitter: inputValues.twitter,
				salary: inputValues.salary,
				telephone: inputValues.telephone,
				country: inputValues.country,
				address: inputValues.address,
				city: inputValues.city,
				postal: inputValues.postal
			},
			role: inputValues.role,
			id: props.User._id,
			confirmed: inputValues.confirmed,
			name: inputValues.name,
			username: inputValues.username,
			email: inputValues.email
		};
		for (const data in userData.userInfo) {
			if (userData.userInfo[data] === '') {
				delete userData.userInfo[data];
			}
		}
		props.updateUser(userData);
	};

	const setAccountConfirmed = value =>
    setInputValues({ ...inputValues, confirmed: value });
    
	return (
		<div className="AdminProfile row">
			{props.failedMessage ? (
				<ResponseMessages message={props.failedMessage} ClassName="Danger" />
			) : null}
			{props.updatePasswordFailedMessage ? (
				<ResponseMessages
					message={props.updatePasswordFailedMessage}
					ClassName="Danger"
				/>
			) : null}
			{props.successMessage ? (
				<ResponseMessages message={props.successMessage} />
			) : null}
			{props.updatePasswordSuccessMessage ? (
				<ResponseMessages message={props.updatePasswordSuccessMessage} />
			) : null}
			<div className="col-12 mb-30">
				{props.failedMessage || (props.profile && userID !== props.UserID) ? (
					<div className="card text-white">
						<div className="card-header">
							<h5 className="title">User not found</h5>
						</div>
					</div>
				) : (
					<React.Fragment>
						{Object.keys(user).length < 1 ||
						Object.keys(props.User).length < 1 ||
						props.loadingPicture ||
						props.loading ||
						!props.User.emailConfirmation ||
						!inputValues.name ? (
							<div className="card bg-white">
								<SmallSpinner />
							</div>
						) : (
							<div className="card text-white">
								{props.profile !== true ? (
									<div className="card-header">
										<h5 className="title">{user.username} Profile</h5>
									</div>
								) : null}
								<div className="card-body">
									{props.profile !== true ? (
										<div className="row mb-10">
											<div className="col-12">
												<div className="form-group">
													<label>{user.username} Picture</label>
													<img
														className="d-block"
														src={
															user.profilePicture
																? `/${user.profilePicture}`
																: ''
														}
														alt={
															user.profilePicture
																? `${user.profilePicture}`
																: ''
														}
														height="200"
													/>
												</div>
											</div>
										</div>
									) : (
										<AdminProfileHeader user={props.User} />
									)}
									<form onSubmit={onFormSubmit}>
										<div className="row mb-10">
											{inputsCol12.map((input, index) => (
												<div className="col-12" key={index}>
													<LoginRegisterInputs
														formBox="form-group"
														label={input.label}
														type={input.type}
														name={input.name}
														placeholder={input.placeholder}
														inputClass="form-control"
														value={inputValues[input.name]}
														onChange={inputChange}
														disabled={props.view}
													/>
												</div>
											))}
										</div>
										<div className="row mb-10">
											<h4 className="col mb-20">User Info</h4>
											<div className="col-12">
												<LoginRegisterInputs
													formBox="form-group"
													label="Address"
													type="text"
													name="address"
													placeholder="Home Address"
													inputClass="form-control"
													value={inputValues.address}
													onChange={inputChange}
													disabled={props.view}
												/>
											</div>
											{inputsCol4.map((input, index) => (
												<div className="col-md-4" key={index}>
													<LoginRegisterInputs
														formBox="form-group"
														label={input.label}
														type={input.type}
														name={input.name}
														placeholder={input.placeholder}
														inputClass="form-control"
														value={inputValues[input.name]}
														onChange={inputChange}
														disabled={props.view}
													/>
												</div>
											))}
											{inputsCol6.map((input, index) => (
												<div className="col-md-6" key={index}>
													<LoginRegisterInputs
														formBox="form-group"
														label={input.label}
														type={input.type}
														name={input.name}
														placeholder={input.placeholder}
														inputClass="form-control"
														value={inputValues[input.name]}
														onChange={inputChange}
														disabled={
															(props.profile === true &&
																input.name === 'salary') ||
															props.view
																? true
																: false
														}
													/>
												</div>
											))}
											{inputsCol3.map((input, index) => (
												<div className="col-md-3" key={index}>
													<LoginRegisterInputs
														formBox="form-group"
														label={input.label}
														type={input.type}
														name={input.name}
														placeholder={input.placeholder}
														inputClass="form-control"
														value={inputValues[input.name]}
														onChange={inputChange}
														disabled={props.view}
													/>
												</div>
											))}
											{inputsCol6S.map((input, index) => (
												<div className="col-md-6" key={index}>
													<LoginRegisterInputs
														formBox="form-group"
														label={input.label}
														type={input.type}
														name={input.name}
														placeholder={input.placeholder}
														inputClass="form-control"
														value={inputValues[input.name]}
														onChange={inputChange}
														disabled={
															(props.profile === true &&
																input.name === 'doe') ||
															props.view
																? true
																: false
														}
													/>
												</div>
											))}
											{props.profile !== true ? (
												<React.Fragment>
													<div className="col-md-6 mb-10">
														<div className="form-group">
															<label>Role</label>
															<select
																name="role"
																value={inputValues.role}
																onChange={inputChange}
																className="select d-block"
																disabled={props.view}>
																{roles.Roles
																	? roles.Roles.map((role, index) => (
																			<option key={index} value={role._id}>
																				{role.name}
																			</option>
																	  ))
																	: null}
															</select>
														</div>
													</div>
													<div className="col-md-6">
														<ToggleSwitch
															name="Account Confirmed"
															value={inputValues.confirmed}
															setValue={setAccountConfirmed}
															disabled={
																props.User.emailConfirmation.confirmed ||
																props.view
																	? true
																	: false
															}
														/>
													</div>
												</React.Fragment>
											) : null}
										</div>
										{!props.view && (
											<button
												type="submit"
												className="btn-fill btn btn-primary">
												Save
											</button>
										)}
									</form>
								</div>
							</div>
						)}
					</React.Fragment>
				)}
			</div>
			{!props.failedMessage &&
			!Object.keys(user).length < 1 &&
			!(props.profile && userID !== props.UserID) ? (
				<React.Fragment>
					{props.profile === true && props.User !== undefined ? (
						<AdminNewPassword userName={props.User.username} />
					) : null}
					{props.profile === true && props.User !== undefined ? (
						<AdminChangeProfilePicture
							submit={props.updateUserPicture}
							username={user.username}
							id={user._id}
						/>
					) : null}
				</React.Fragment>
			) : null}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		User: state.user.SingleUser,
		errorID: state.user.errorID,
		UserID: state.login.User.id,
		roles: state.roles,
		successMessage: state.user.successMessage,
		failedMessage: state.user.failedMessage,
		updatePasswordFailedMessage: state.resetPassword.failedMessage,
		updatePasswordSuccessMessage: state.resetPassword.successMessage,
		loading: state.user.loading,
		loadingPicture: state.login.loading
	};
};

const dispatchMapToProps = dispatch => {
	return {
		getRoles: () => dispatch(actions.getRoles()),
		getUser: (id, id2, profile) =>
			dispatch(actions.getSingleUser(id, id2, profile)),
		updateUser: userData => dispatch(actions.updateUser(userData)),
		updateUserPicture: (formData, config, id) =>
			dispatch(actions.userUpdateProfilePicture(formData, config, id))
	};
};

export default connect(
	mapStateToProps,
	dispatchMapToProps
)(User);
