import React, { useEffect } from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { withRouter } from 'react-router-dom';
import { toggleSearchModal, toggleNav } from '../../utility/openDropdown';

const Navbar = props => {

    useEffect(() => { props.getUserPhoto(props.userId); }, []);

    useEffect(() => {
        props.getUserPhoto(props.userId);
    }, [props.SingleUser, props.AllUsers]);

    const logout = (e) => { e.preventDefault(); props.logoutUser(); }

    const toggleSidebar = e => {
        e.preventDefault();
        const mainPanel = document.querySelector('.main-panel');
        const sidebar = document.querySelector('.Navigation_Sidebar__1GyzL');
        const navbartoggler = document.querySelector('.'+classes.NavbarToggler);
        mainPanel.classList.toggle('open');
        sidebar.classList.toggle('Navigation_Open__3hrcz');
        navbartoggler.classList.toggle(''+classes.Open);
    }

    const toggleDropdown = e => {
        e.preventDefault();
        e.currentTarget.parentElement.classList.toggle('show');
    }

    return (
        <React.Fragment >
            <nav className={classes.Navbar + ' navbar-absolute navbar-transparent navbar navbar-expand-lg'}>
                <div className={classes.ContainerFluid+ ' container-fluid'}>
                    <div className={classes.NavbarWrapper + ' navbar-wrapper'}>
                        <div className={classes.NavbarToggle + ' navbar-toggle d-inline'}>
                            <button className={classes.NavbarToggler + ' navbar-toggler'} onClick={toggleSidebar}>
                                <span className={classes.NavbarTogglerBar + ' ' + classes.Bar1}></span>
                                <span className={classes.NavbarTogglerBar + ' ' + classes.Bar2}></span>
                                <span className={classes.NavbarTogglerBar + ' ' + classes.Bar3}></span>
                            </button>
                        </div>
                        <Link to="/admindashboard/dashboard" className={classes.NavbarBrand}>Dashboard</Link>
                    </div>
                    <button className={classes.NavbarToggler + ' navbar-toggler ' + classes.NavbarToggler2}
                        onClick={(e) => toggleNav(e, classes.WhiteBackground,classes.Show)}>
                        <span className={classes.Kebab}></span>
                        <span className={classes.Kebab}></span>
                        <span className={classes.Kebab}></span>
                    </button>
                    <div className={classes.NavbarCollapse + ' collapse navbar-collapse'}>
                        <ul className={classes.NavbarNav + ' ml-auto navbar-nav'}>
                            <div className={classes.SearchBar + ' search-bar input-group'}>
                                <button onClick={(e) => toggleSearchModal(e,classes.ModalWrapper,classes.Modal,classes.Open)}>
                                    <i className={classes.TimIcons + ' ' + classes.IconZoomSplit}></i>
                                    <span className="d-lg-none d-md-block">Search</span>
                                </button>
                            </div>
                            <li className="dropdown nav-item">
                                <a href="/" onClick={toggleDropdown} className={classes.dropdownToggle + " dropdown-toggle nav-link"}>
                                    <div className="notification d-none d-lg-block d-xl-block"></div>
                                    <i className="fas fa-bell"></i>
                                    <p className="d-lg-none">Notifications</p>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className="photo">
                                        {!props.profilePicture ? null : <img src={'/' + props.profilePicture} alt="react-logo" />}
                                    </div>
                                    <b className="caret d-none d-lg-block d-xl-block"></b>
                                    <p className="d-lg-none">Log out</p>
                                </a>
                                <div className={"dropdown-menu"}>
                                        <button className="nav-item dropdown-item">Profile</button>
                                        <button className="nav-item dropdown-item">Settings</button>
                                    <div className="dropdown-divider"></div>
                                        <button className="nav-item dropdown-item" onClick={logout}>Log out</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={classes.ModalWrapper} >
                <div className="">
                    <div className={classes.Modal}>
                        <div className={classes.ModalDialog}>
                            <div className={classes.ModalContent}>
                                <div className={classes.ModalHeader}>
                                    <input placeholder="SEARCH" type="text" />
                                    <button className="close" type="button"
                                        onClick={(e) => toggleSearchModal(e,classes.ModalWrapper,classes.Modal,classes.Open)}>
                                        <i className="tim-icons icon-simple-remove"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.ModalBackdrop}></div>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.login.User.id,
        profilePicture: state.allUsers.profilePicture,
        SingleUser: state.allUsers.SingleUser,
        AllUsers: state.allUsers.Users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(actions.logoutUser()),
        getUserPhoto: (id) => dispatch(actions.getLoggedInUserPhoto(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));