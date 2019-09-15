import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import Notifications from '../../UI/Notifications/Notifications';
// import Messages from '../../UI/Messages/Messages';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import c from '../Navigation.module.css';
import LeftLinks from './LeftLinks/LeftLinks';

const TopNavigation = props => {
	const [user, setUser] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		setUser({ ...props.userState });
		setIsAuthenticated(props.isAuthenticated);
		document.addEventListener('click', hideMenus);
		return () => document.removeEventListener('click', hideMenus);
	}, []);
	useEffect(() => {
		setUser({ ...props.userState });
		setIsAuthenticated(props.isAuthenticated);
	}, [props.userState]);
	useEffect(() => {
		setIsAuthenticated(props.isAuthenticated);
	}, [props.isAuthenticated]);
	const [linksLeft] = useState([
		{ name: 'Support', link: '/support' },
		{ name: 'Store Locator', link: '/storelocator' },
		{ name: 'Track Your Order', link: '/kpkop' }
	]);

	const showNotificationsMenu = event => {
		event.preventDefault();
		const trigger = document.querySelectorAll('.' + c.dropdownLink);
		const element = event.currentTarget;

		if (element.parentElement.classList !== null) {
			element.parentElement.classList.toggle(c.active);
		}

		trigger.forEach(item => {
			if (item.parentNode.classList.contains(c.active) && element !== item) {
				item.parentNode.classList.remove(c.active);
				return;
			}
		});
	};

	const hideMenus = e => {
		if (!e.target.closest('.' + c.dropdownLink)) {
			const trigger = document.querySelectorAll('.' + c.dropdownLink);
			trigger.forEach(item => {
				if (item.parentNode.classList.contains(c.active)) {
					item.parentNode.classList.remove(c.active);
					return;
				}
			});
		}
	};

	const logout = e => {
		e.preventDefault();
		props.logoutUser(props.history.push);
	};

	let rightLinks = (
		<div className={c.dropdownLinks}>
			<ul>
				<li className={c.dropdownMenuItems}>
					<Link
						to="/authentication"
						className={c.dropdownLink + ' dropdown-link ' + c.withoutArrow}>
						Login/Signup
					</Link>
				</li>
			</ul>
		</div>
	);

	if (isAuthenticated) {
		rightLinks = (
			<React.Fragment>
				<div className={c.dropdownLinks}>
					<ul>
						<li className={c.dropdownMenuItems}>
							<a
								href="/"
								className={c.dropdownLink + ' dropdown-link'}
								onClick={showNotificationsMenu}>
								{props.profilePicture && (
									<img
										src={'/'+props.profilePicture}
										width="20"
										height="20"
										alt=""
									/>
								)}
								{user.username}
							</a>
							<div className={c.profileMenu}>
								<ul>
									<li>
										{user.role.isAdmin ? (
											<Link
												to={`/admindashboard/profile?id=${props.userState.id}`}>
												Visit Profile
											</Link>
										) : (
											<Link to={`/profile?id=${props.userState.id}`}>
												Visit Profile
											</Link>
										)}
									</li>
									{user.role.isAdmin && (
										<li>
											<Link to="/admindashboard/dashboard">
												Go to Dashboard
											</Link>
										</li>
									)}
									<li>
										<a href="/" onClick={logout}>
											Logout
										</a>
									</li>
									<li>
										<a href="/">Wishlist</a>
									</li>
									<li>
										<a href="/">My Cart</a>
									</li>
									<li>
										<a href="/">Checkout</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div className={c.dropdownLinks + ' ' + c.notifications}>
					{/* <Notifications notifications={this.state.notifications}
                    click={this.showNotificationsMenu}/> */}
				</div>
				<div
					className={
						c.dropdownLinks + ' ' + c.notifications + ' ' + c.messages
					}>
					{/* <Messages messages={this.state.messages} 
                    click={this.showNotificationsMenu}/> */}
				</div>
			</React.Fragment>
		);
	}

	return (
		<div className={'container-fluid ' + c.borderBottomGrey}>
			<div className={'container ' + c.top}>
				<div className={c.row + ' ' + c.navbar + ' row navbar'}>
					<div className={c.col12 + ' ' + c.colLg4 + ' col-12 col-lg-4'}>
						<div className="row justify-content-lg-start justify-content-center">
							{linksLeft.map(igKey => {
								return (
									<LeftLinks
										key={igKey.name}
										name={igKey.name}
										link={igKey.link}
									/>
								);
							})}
						</div>
					</div>
					<div className="col-12 col-lg-8">
						<div className="row justify-content-lg-end justify-content-center">
							{rightLinks}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		userState: state.login.User,
		profilePicture: state.user.profilePicture,
		isAuthenticated: state.login.isAuthenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logoutUser: callBack => dispatch(actions.logoutUser(callBack))
	};
};

export default React.memo(connect(
	mapStateToProps,
	mapDispatchToProps
)(TopNavigation));
