/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import LoginRegisterInputs from '../../../users/components/UI/LoginRegisterInputs/LoginRegisterInputs';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';
import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const AddUser = props => {
	const [roles, setRoles] = useState([]);
	const [inputs] = useState([
		{
			label: 'Date of Birth',
			type: 'date',
			name: 'dob',
			placeholder: 'Date of Birth'
		},
		{ label: 'Date of Employment', type: 'date', name: 'doe', placeholder: '' },
		{ label: 'Name', type: 'text', name: 'name', placeholder: 'Name' },
		{
			label: 'User Name',
			type: 'text',
			name: 'username',
			placeholder: 'User Name'
		},
		{ label: 'Email', type: 'email', name: 'email', placeholder: 'Email' },
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
		},
		{ label: 'Salary', type: 'text', name: 'salary', placeholder: 'Salary' },
		{
			label: 'Telephone',
			type: 'phone',
			name: 'telephone',
			placeholder: 'Telephone Number'
		},
		{ label: 'Country', type: 'text', name: 'country', placeholder: 'Country' },
		{
			label: 'Address',
			type: 'text',
			name: 'address',
			placeholder: 'Home Address'
		},
		{ label: 'City', type: 'text', name: 'city', placeholder: 'City' },
		{
			label: 'Postal Code',
			type: 'text',
			name: 'postal',
			placeholder: 'Postal Code'
		}
	]);
	const [inputValues, setInputValues] = useState({
		dob: '',
		doe: '',
		name: '',
		username: '',
		email: '',
		facebook: '',
		instagram: '',
		github: '',
		twitter: '',
		salary: '',
		telephone: '',
		country: '',
		address: '',
		city: '',
		postal: ''
	});
	const [errors, setErrors] = useState({ name: '', username: '', email: '' });
	useEffect(() => {
		props.getRoles();
		setErrors({ ...props.addUserState.errors });
	}, []);
	useEffect(() => {
		setRoles(props.roles);
		if (props.roles.Roles[0]) {
			setInputValues({ ...inputValues, role: props.roles.Roles[0]._id });
		}
	}, [props.roles]);
	useEffect(() => {
		setErrors({ ...props.addUserState.errors });
	}, [props.addUserState.errors]);
	useEffect(() => {
		setInputValues({
			dob: '',
			doe: '',
			name: '',
			username: '',
			email: '',
			facebook: '',
			instagram: '',
			github: '',
			twitter: '',
			salary: '',
			telephone: '',
			country: '',
			address: '',
			city: '',
			postal: ''
		});
		setErrors({ name: '', username: '', email: '' });
	}, [props.addUserState.successMessage]);

	const inputChange = e => {
		e.preventDefault();
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });
	};

	const onFormSubmit = e => {
		e.preventDefault();
		const userData = {
			dob: inputValues.dob,
			doe: inputValues.doe,
			name: inputValues.name,
			username: inputValues.username,
			email: inputValues.email,
			password: inputValues.password,
			facebook: inputValues.facebook,
			instagram: inputValues.instagram,
			github: inputValues.github,
			twitter: inputValues.twitter,
			salary: inputValues.salary,
			telephone: inputValues.telephone,
			country: inputValues.country,
			address: inputValues.address,
			city: inputValues.city,
			postal: inputValues.postal,
			role: inputValues.role
		};
		for (const data in userData) {
			if (userData[data] === '') {
				delete userData[data];
			}
		}
		props.addUser(userData, props.history.push);
	};

	return (
		<div className="AdminProfile row">
			{props.addUserState.successMessage && (
				<ResponseMessages message={props.addUserState.successMessage} />
			)}
			{props.addUserState.failedMessage && (
				<ResponseMessages
					ClassName="Danger"
					message={props.addUserState.failedMessage}
				/>
			)}
			<div className="col-12 mb-30">
				<form className="" onSubmit={onFormSubmit}>
					{props.addUserState.loading ? (
						<div className="card bg-white">
							<SmallSpinner />
						</div>
					) : (
						<div className="card text-white">
							<div className="card-header">
								<h5 className="title">Add New User</h5>
							</div>
							<div className="card-body row">
								{inputs.map((input, index) => (
									<div className="col-md-6 mb-10" key={index}>
										<LoginRegisterInputs
											formBox="form-group"
											label={input.label}
											type={input.type}
											name={input.name}
											placeholder={input.placeholder}
											inputClass="form-control"
											invalidInput="invalid"
											invalidFeedback="invalid-feedback"
											value={inputValues[input.name]}
											onChange={inputChange}
											error={errors[input.name] ? errors[input.name] : ''}
										/>
									</div>
								))}
								<div className="col-md-6 mb-10">
									<div className="form-group">
										<label>Role</label>
										<select
											name="role"
											onChange={inputChange}
											className="select d-block">
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
							</div>
							<div className="card-footer">
								<button type="submit" className="btn-fill btn btn-primary">
									Add User
								</button>
							</div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		roles: state.roles,
		addUserState: state.user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getRoles: () => dispatch(actions.getRoles()),
		addUser: (userData, callBack) =>
			dispatch(actions.addNewUser(userData, callBack))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddUser);
