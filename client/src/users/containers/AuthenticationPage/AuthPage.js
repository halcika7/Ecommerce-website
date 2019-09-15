import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './AuthPage.module.css';

import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import ResetPassword from './ResetPassword/ResetPassword';
import SmallSpinner from '../../components/UI/SmallSpinner/SmallSpinner';

const AuthPage = props => {
	const loginRegister = (
		<React.Fragment>
			<div className={classes.formContainer + ' col-md-6'}>
				<div className={classes.formLogin}>
					{props.loginState.loading ? <SmallSpinner /> : <LoginForm />}
				</div>
			</div>
			<div className="col-md-6">
				<div className={classes.formRegister}>
					{props.registerState.loading ? <SmallSpinner /> : <RegisterForm />}
				</div>
			</div>
		</React.Fragment>
	);

	const resetPassword = (
		<React.Fragment>
			<div className={classes.formContainer + ' col-md-6'}>
				<div className={classes.formLogin}>
					<ResetPassword {...props} />
				</div>
			</div>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			{props.loginState.isAuthenticated ? <Redirect to="/" /> : null}
			<section className={classes.flatAccount}>
				<div className={classes.container + ' container'}>
					<div className="row justify-content-center">
						{props.reset ? resetPassword : loginRegister}
					</div>
				</div>
			</section>
			<ContainerIcons />
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		loginState: state.login,
		registerState: state.register
	};
};

export default React.memo(connect(mapStateToProps)(AuthPage));
