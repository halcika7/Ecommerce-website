import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../../../store/actions';
import classes from '../AuthPage.module.css';
import loginformc from './LoginForm.module.css';

import LoginRegisterInputs from '../../../components/UI/LoginRegisterInputs/LoginRegisterInputs';
import ResponseMessage from '../../../components/UI/ResponseMessages/ResponseMessages';
import Spinner from '../../../components/UI/Spinner/Spinner';

const LoginForm = props => {
	const [login, setLogin] = useState({});

	const [resetPassword, setResetPassword] = useState({});

	const [inputs] = useState([
		{
			name: 'usernameEmail',
			placeholder: 'Username or email address',
			label: 'Username or email address',
			type: 'text'
		},
		{
			name: 'password',
			placeholder: '*******',
			label: 'Password',
			type: 'password'
		}
	]);

	useEffect(() => {
		setLogin({ ...props.loginState });
		setResetPassword({ ...props.resetPasswordState });
	}, []);

	useEffect(() => {
		setLogin({ ...props.loginState });
	}, [props.loginState]);

	useEffect(() => {
		setResetPassword({ ...props.resetPasswordState });
	}, [props.resetPasswordState]);

	const onChangeLoginValue = e => {
		if (e.target.type === 'checkbox') {
			setLogin({ ...login, [e.target.name]: !login[e.target.name] });
		} else {
			setLogin({ ...login, [e.target.name]: e.target.value });
		}
	};

	const onLoginFormSubmit = e => {
		e.preventDefault();

		const loginUser = {
			usernameEmail: login.usernameEmail,
			password: login.password,
			rememberMe: login.rememberMe
		};

		props.loginUser(loginUser);
	};

	const showResetPassword = e => {
		e.preventDefault();
		document
			.querySelector('.' + loginformc.RessetPassword)
			.classList.toggle(loginformc.Show);
	};

	const onResetPasswordChangeValue = e =>
		setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });

	const onResetPasswordSubmit = e => {
		e.preventDefault();
		props.resetPasswordFunc(resetPassword.email);
	};

	return (
		<React.Fragment>
			{!login.errors ? (
				<Spinner />
			) : (
				<React.Fragment>
					{login.successMessage ? (
						<ResponseMessage message={login.successMessage} />
					) : null}
					{resetPassword.successMessage ? (
						<ResponseMessage message={resetPassword.successMessage} />
					) : null}
					{resetPassword.failedMessage ? (
						<ResponseMessage
							ClassName="Danger"
							message={resetPassword.failedMessage}
						/>
					) : null}
					{login.failedMessage ? (
						<ResponseMessage ClassName="Danger" message={login.failedMessage} />
					) : null}
					<div className={classes.title}>
						<h3>Login</h3>
					</div>
					<form onSubmit={onLoginFormSubmit}>
						{inputs.map((input, index) => (
							<LoginRegisterInputs
								key={index}
								name={input.name}
								placeholder={input.placeholder}
								value={login[input.name]}
								label={input.label}
								error={login.errors[input.name]}
								type={input.type}
								onChange={onChangeLoginValue}
								formBox={classes.formBox}
								invalidFeedback={classes.invalidFeedback}
								invalidInput={classes.invalid}
								inputClass=""
							/>
						))}
						<div className={classes.formBox + ' ' + classes.Checkbox}>
							<input
								type="checkbox"
								name="rememberMe"
								checked={login.rememberMe}
								onChange={onChangeLoginValue}
							/>
							<label>Remember me</label>
						</div>
						<div className={classes.formBox}>
							<button type="submit" className="login">
								Login
							</button>
							<a href="/" title="" onClick={showResetPassword}>
								Lost your password?
							</a>
						</div>
					</form>
					<form
						className={loginformc.RessetPassword}
						onSubmit={onResetPasswordSubmit}>
						<LoginRegisterInputs
							name="email"
							value={resetPassword.email}
							placeholder="Enter Email to reset password"
							label="Reset Password"
							type="text"
							error={resetPassword.errors.email}
							onChange={onResetPasswordChangeValue}
							formBox={classes.formBox}
							invalidFeedback={classes.invalidFeedback}
							invalidInput={classes.invalid}
						/>
						<div className={classes.formBox}>
							<button type="submit" className="login">
								Reset Password
							</button>
						</div>
					</form>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

LoginForm.propTypes = {
	loginUser: PropTypes.func.isRequired,
	loginState: PropTypes.object.isRequired,
	resetPasswordFunc: PropTypes.func.isRequired,
	resetPasswordState: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		loginState: state.login,
		resetPasswordState: state.resetEmail
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loginUser: UserObj => dispatch(actions.login(UserObj)),
		resetPasswordFunc: email => dispatch(actions.resetUserPasswordEmail(email))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);
