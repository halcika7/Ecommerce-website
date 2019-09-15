import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import FluidIcons from '../../components/UI/FluidIcons/FluidIcons';
import ResponseMessages from '../../components/UI/ResponseMessages/ResponseMessages';
import ProfileInfo from './ProfileInfo';
import Orders from './Orders';

import './Profile.css';
import Order from './Order';

const Profile = props => {
	const userID = props.match.params.id
		? props.match.params.id
		: new URLSearchParams(props.location.search).get('id');

	const [inputValues, setInputValues] = useState({
		telephone: '',
		country: '',
		address: '',
		city: '',
		postal: '',
		name: '',
		username: '',
		email: ''
	});
	const [passwords, setPasswords] = useState({ password: '', password2: '' });
	const [showOrder, setShowOrder] = useState(false);
	const [order, setOrder] = useState(false);

	useEffect(() => {
		props.getUser(userID, props.UserID, true, props.history.push);
		setPasswords({ ...props.updatePasswordState });
	}, []);
	useEffect(() => {
		props.getUser(userID, props.UserID, true, props.history.push);
	}, [props.location.search, props.match.params]);
	useEffect(() => {
		if (props.errorID) {
			props.history.goBack();
		}
	}, [props.errorID]);
	useEffect(() => {
		setInputValues({
			...inputValues,
			...props.User.userInfo,
			name: props.User.name,
			username: props.User.username,
			email: props.User.email
		});
	}, [props.User]);
	useEffect(() => {
		setPasswords({ ...props.updatePasswordState });
	}, [props.updatePasswordState]);
	useEffect(() => {
		setOrder({ ...props.order });
	}, [props.order]);

	const onFormSubmit = e => {
		e.preventDefault();
		const userData = {
			userInfo: {
				telephone: inputValues.telephone,
				country: inputValues.country,
				address: inputValues.address,
				city: inputValues.city,
				postal: inputValues.postal
			},
			id: props.User._id,
			name: inputValues.name,
			username: inputValues.username,
			email: inputValues.email
		};
		for (const data in userData.userInfo) {
			if (userData.userInfo[data] === '') {
				delete userData.userInfo[data];
			}
		}
		props.updateUser(userData, props.history.push);
	};

	const updatePassword = e => {
		e.preventDefault();
		props.updatePassword({
			password: passwords.password,
			password2: passwords.password2,
			username: props.User.username
		},props.history.push);
	};

	const inputChange = e =>
		setInputValues({ ...inputValues, [e.target.name]: e.target.value });

	const passwordChange = e =>
		setPasswords({ ...passwords, [e.target.name]: e.target.value });

	const showUserOrder = (e, id = null) => {
		e.preventDefault();
		if (id) {
			props.getOrder(id, props.history.push);
		} else {
			setOrder({});
		}
		setShowOrder(!showOrder);
	};

	return (
		<React.Fragment>
			{props.updatePasswordFailedMessage && (
				<ResponseMessages
					message={props.updatePasswordFailedMessage}
					ClassName="Danger"
				/>
			)}
			{props.updatePasswordSuccessMessage && (
				<ResponseMessages message={props.updatePasswordSuccessMessage} />
			)}
			<div className="container-fluid breadcrum">
				<div className="container">
					<div className="inline-nav">
						<a href="{{route('home.index')}}">Home</a>
						<i className="fas fa-long-arrow-alt-right" />
						<a href="/" className="prevent-click">
							Username
						</a>
					</div>
				</div>
			</div>

			<div className="container profile">
				<div className="row">
					<div className="col-12 col-md-3">
						<div className="profile-picture">
							<img
								className="img-fluid"
								src={props.User.profilePicture}
								alt={props.User.username}
							/>
						</div>
						<ul
							className="nav nav-pills"
							id="v-pills-tab"
							role="tablist"
							aria-orientation="vertical">
							<li>
								<a
									className="nav-link active"
									id="v-pills-settings-tab"
									data-toggle="pill"
									href="#v-pills-settings"
									role="tab"
									aria-controls="v-pills-settings"
									aria-selected="true">
									Settings
								</a>
							</li>
							<li>
								<a
									className="nav-link"
									id="v-pills-orders-tab"
									data-toggle="pill"
									href="#v-pills-orders"
									role="tab"
									aria-controls="v-pills-orders"
									aria-selected="false">
									Orders History
								</a>
							</li>
						</ul>
					</div>
					<div className="col-12 col-md-9">
						<div className="tab-content" id="v-pills-tabContent">
							<ProfileInfo
								inputValues={inputValues}
								inputChange={inputChange}
								onFormSubmit={onFormSubmit}
								passwords={passwords}
								passwordChange={passwordChange}
								updatePassword={updatePassword}
								id={props.User._id}
								username={props.User.username}
								updateProfilePicture={props.updateUserPicture}
								push={props.history.push}
							/>
							<Orders userId={props.UserID} showOrder={showUserOrder} pus={props.history.push} />
						</div>
					</div>
				</div>
				{showOrder && <Order setShowOrder={showUserOrder} order={order} />}
			</div>

			<FluidIcons />
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	User: state.user.SingleUser,
	order: state.orders.order,
	errorID: state.user.errorID,
	UserID: state.login.User.id,
	updatePasswordFailedMessage: state.resetPassword.failedMessage,
	updatePasswordSuccessMessage: state.resetPassword.successMessage,
	updatePasswordState: state.resetPassword
});

const mapDispatchToProps = dispatch => ({
	getRoles: () => dispatch(actions.getRoles()),
	getUser: (id, id2, profile, callBack) =>
		dispatch(actions.getSingleUser(id, id2, profile, callBack)),
	updateUser: (userData, callBack) => dispatch(actions.updateUser(userData, callBack)),
	updateUserPicture: (formData, config, id, callBack) =>
		dispatch(actions.userUpdateProfilePicture(formData, config, id, callBack)),
	updatePassword: (passwords, callBack) => dispatch(actions.updatePassword(passwords, callBack)),
	getOrder: (id, callBack) => dispatch(actions.getOrder(id, callBack))
});

export default React.memo(connect(
	mapStateToProps,
	mapDispatchToProps
)(Profile));
