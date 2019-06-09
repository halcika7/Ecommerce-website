import React, { useEffect, useState } from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { withRouter } from 'react-router-dom';

const Navbar = props => {
	const [name, setName] = useState('');
	const [linkName, setLinkName] = useState('');
	const [locationSearch, setLoactionSearch] = useState(false);
	const [queryString, setQueryString] = useState(false);

	const [searchModal, setSearchModal] = useState(false);
	const [smallScreenNav, setSmallScreenNav] = useState(false);

	useEffect(() => {
		const str = props.location.pathname
			.replace('/admindashboard/', '')
			.split('-')
			.join(' ');
		const isSearch = props.location.search ? true : false;
		const newQueryString = props.location.search
			? props.location.search
			: false;
		setLoactionSearch(isSearch);
		setQueryString(newQueryString);
		setName(str);
		setLinkName(str.split(' ').join('-'));
	}, [props.location.pathname]);

	const logout = e => {
		e.preventDefault();
		props.logoutUser(props.history.push);
	};

	const toggleSidebar = e => {
		e.preventDefault();
		const mainPanel = document.querySelector('.main-panel');
		const sidebar = document.querySelector('.Navigation_Sidebar__1GyzL');
		mainPanel.classList.toggle('open');
		sidebar.classList.toggle('Navigation_Open__3hrcz');
		e.currentTarget.classList.toggle('' + classes.Open);
	};

	const toggleDropdown = e => {
		e.preventDefault();
		e.currentTarget.parentElement.classList.toggle('show');
	};

	return (
		<React.Fragment>
			<nav
				className={
					smallScreenNav
						? classes.Navbar +
						  ' navbar-absolute navbar-transparent navbar navbar-expand-lg ' +
						  classes.WhiteBackground
						: classes.Navbar +
						  ' navbar-absolute navbar-transparent navbar navbar-expand-lg'
				}>
				<div className={classes.ContainerFluid + ' container-fluid'}>
					<div className={classes.NavbarWrapper + ' navbar-wrapper'}>
						<div className={classes.NavbarToggle + ' navbar-toggle d-inline'}>
							<button
								className={classes.NavbarToggler + ' navbar-toggler'}
								onClick={toggleSidebar}>
								<span
									className={classes.NavbarTogglerBar + ' ' + classes.Bar1}
								/>
								<span
									className={classes.NavbarTogglerBar + ' ' + classes.Bar2}
								/>
								<span
									className={classes.NavbarTogglerBar + ' ' + classes.Bar3}
								/>
							</button>
						</div>
						{!locationSearch && (
							<Link
								to={`/admindashboard/${linkName}`}
								className={classes.NavbarBrand}>
								{name}
							</Link>
						)}
						{locationSearch && (
							<Link
								to={`/admindashboard/${linkName}${queryString}`}
								className={classes.NavbarBrand}>
								{name}
							</Link>
						)}
					</div>
					<button
						className={
							classes.NavbarToggler +
							' navbar-toggler ' +
							classes.NavbarToggler2
						}
						onClick={e => setSmallScreenNav(!smallScreenNav)}>
						<span className={classes.Kebab} />
						<span className={classes.Kebab} />
						<span className={classes.Kebab} />
					</button>
					<div
						className={
							smallScreenNav
								? classes.NavbarCollapse +
								  ' collapse navbar-collapse ' +
								  classes.Show
								: classes.NavbarCollapse + ' collapse navbar-collapse'
						}>
						<ul className={classes.NavbarNav + ' ml-auto navbar-nav'}>
							<div className={classes.SearchBar + ' search-bar input-group'}>
								<button onClick={e => setSearchModal(!searchModal)}>
									<i
										className={classes.TimIcons + ' ' + classes.IconZoomSplit}
									/>
									<span className="d-lg-none d-md-block">Search</span>
								</button>
							</div>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="/"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false">
									<div className="photo">
										{!props.profilePicture ? null : (
											<img src={'/' + props.profilePicture} alt="react-logo" />
										)}
									</div>
									<b className="caret d-none d-lg-block d-xl-block" />
									<p className="d-lg-none">Log out</p>
								</a>
								<div className={'dropdown-menu'}>
									<button className="nav-item dropdown-item">Profile</button>
									<button className="nav-item dropdown-item">Settings</button>
									<div className="dropdown-divider" />
									<button className="nav-item dropdown-item" onClick={logout}>
										Log out
									</button>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{searchModal && (
				<div className={classes.ModalWrapper + ' ' + classes.Open}>
					<div className="">
						<div
							className={classes.Modal + ' ' + classes.Open}
							onClick={e =>
								!e.target.closest('.' + classes.ModalDialog) &&
								setSearchModal(false)
							}>
							<div className={classes.ModalDialog}>
								<div className={classes.ModalContent}>
									<div className={classes.ModalHeader}>
										<input placeholder="SEARCH" type="text" />
										<button
											className="close"
											type="button"
											onClick={e => setSearchModal(!searchModal)}>
											<i className="tim-icons icon-simple-remove" />
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className={classes.ModalBackdrop} />
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {
		userId: state.login.User.id,
		profilePicture: state.user.profilePicture,
		SingleUser: state.user.SingleUser,
		AllUsers: state.user.Users
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logoutUser: callBack => dispatch(actions.logoutUser(callBack))
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Navbar)
);
