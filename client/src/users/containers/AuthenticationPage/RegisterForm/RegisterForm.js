import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../../store/actions';
import classes from '../AuthPage.module.css';
import LoginRegisterInputs from '../../../components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ResponseMessage from '../../../components/UI/ResponseMessages/ResponseMessages';
import Spinner from '../../../components/UI/Spinner/Spinner';

const RegisterForm = (props) => {
	const [register, setRegister] = useState({});

	const [inputs] = useState([
		{ name: 'name', placeholder: 'Name', label: 'Name', type: 'text' },
		{
			name: 'email',
			placeholder: 'Email address',
			label: 'Email address',
			type: 'email'
		},
		{
			name: 'username',
			placeholder: 'Username',
			label: 'Username',
			type: 'text'
		},
		{
			name: 'password',
			placeholder: '*********',
			label: 'Password',
			type: 'password'
		},
		{
			name: 'password2',
			placeholder: '*********',
			label: 'Confirm Password',
			type: 'password'
		}
	]);

	useEffect(() => {
		setRegister({ ...props.registerState });
	}, []);

	useEffect(() => {
		setRegister({ ...props.registerState });
	}, [props.registerState]);

	const onChangeRegisterValue = e =>
		setRegister({ ...register, [e.target.name]: e.target.value });

	const onRegisterFormSubmit = e => {
		e.preventDefault();

		const registerUser = {
			name: register.name,
			username: register.username,
			email: register.email,
			password: register.password,
			password2: register.password2
		};
		props.registerUser(registerUser);
	};

	return (
		<React.Fragment>
			{!register.errors ? (
				<Spinner />
			) : (
				<React.Fragment>
					{register.message ? (
						<ResponseMessage message={register.message} />
					) : null}
					{register.failedMessage ? (
						<ResponseMessage
							ClassName="Danger"
							message={register.failedMessage}
						/>
					) : null}
					<div className={classes.title}>
						<h3>Register</h3>
					</div>
					<form onSubmit={onRegisterFormSubmit}>
						{inputs.map((input, index) => (
							<LoginRegisterInputs
								key={index}
								name={input.name}
								placeholder={input.placeholder}
								value={register[input.name]}
								label={input.label}
								error={register.errors[input.name]}
								type={input.type}
								onChange={onChangeRegisterValue}
								formBox={classes.formBox}
								invalidFeedback={classes.invalidFeedback}
								invalidInput={classes.invalid}
							/>
						))}
						<div className={classes.formBox}>
							<button type="submit" className="register">
								Register
							</button>
						</div>
					</form>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

RegisterForm.propTypes = {
	registerUser: PropTypes.func.isRequired,
	registerState: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		registerState: state.register
	};
};

const mapDispatchToProps = dispatch => {
	return {
		registerUser: UserObj => dispatch(actions.register(UserObj))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterForm);
