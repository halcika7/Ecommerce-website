import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedInUserPhoto } from '../../../store/actions';

import classes from './Navigation.module.css';
import Modal from '../UI/Modal/Modal';
import AllPermissionsModal from '../UI/Modal/AllPermissionsModal';

const Navigation = props => {

    const [permissionModal, setPermissionModal] = useState(false);
    const [allPermissionModal, setAllPermissionModal] = useState(false);

    const toggleActiveClass = e => {
        e.preventDefault();
        e.currentTarget.classList.toggle(classes.Active);
        e.currentTarget.parentNode.children[1].classList.toggle(classes.DropDownActive);
    }

    const toggleModal = (e, setModal, modal) => {
        e.preventDefault();
        setModal(!modal);
    }

    return(
        <React.Fragment>
            { permissionModal === true ? <Modal click={toggleModal} setModal={setPermissionModal} modal={permissionModal}/> : null }
            { allPermissionModal === true ? <AllPermissionsModal click={toggleModal} setModal={setAllPermissionModal} modal={setAllPermissionModal}/> : null }
            <div className={classes.Sidebar}>
                <div className={classes.SidebarWrapper}>
                    <div className={classes.Logo}>
                        <Link to="/admindashboard/dashboard" className={classes.SimpleText + ' ' + classes.LogoMini}>
                            <div className="logo-img">
                                {!props.profilePicture ? null : <img src={'/' + props.profilePicture} alt="react-logo" />}
                            </div>
                        </Link>
                        <Link to="/admindashboard/dashboard" className={classes.SimpleText + ' ' + classes.LogoNormal}>{props.username}</Link>
                    </div>
                    <ul className={classes.Nav}>
                        <li className={"nav-item"}>
                            <Link className="" to='/admindashboard/dashboard'>
                                <i className={classes.TimIcons + ' ' + classes.IconChartPie36}></i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className={"nav-item"}>
                            <Link className="" to={`/admindashboard/profile?id=${props.userId}`} >
                                <i className={classes.TimIcons + ' ' + classes.IconSingle02}></i>
                                <p>Profile</p>
                            </Link>
                        </li>
                        <li>
                            <div className="btn-group-vertical d-flex ">
                                <a href='/' 
                                    onClick={toggleActiveClass}
                                    className="dropdown-toggle-split" >
                                    <i className={classes.TimIcons + ' ' + classes.IconBag}></i>
                                    <p>Products Pages</p>
                                </a>
                                <div className={classes.DropDown}>
                                    <Link to="/admindashboard/products">
                                        <p>Products</p>
                                    </Link>
                                    <Link to="/admindashboard/add-product">
                                        <p>Add Product</p>
                                    </Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="btn-group-vertical d-flex ">
                                <a href='/' 
                                    onClick={toggleActiveClass}
                                    className="dropdown-toggle-split" >
                                    <i className={classes.TimIcons + ' ' + classes.IconSingle02}></i>
                                    <p>Users Pages</p>
                                </a>
                                <div className={classes.DropDown}>
                                    <Link to="/admindashboard/all-users">
                                        <p>Users</p>
                                    </Link>
                                    <Link to="/admindashboard/add-user">
                                        <p>Add User</p>
                                    </Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="btn-group-vertical d-flex ">
                                <a href='/' 
                                    onClick={toggleActiveClass}
                                    className="dropdown-toggle-split" >
                                    <i className={classes.TimIcons + ' ' + classes.IconBasket}></i>
                                    <p>Permissions & Roles</p>
                                </a>
                                <div className={classes.DropDown + ' ' + classes.MaxHeight100}>
                                    {/* {props.permissions['Create Permission'] ?  */}
                                    <a href="/" 
                                        onClick={(e) => toggleModal(e, setPermissionModal, permissionModal)}>
                                        <p>Add Permissions</p>
                                    </a>
                                    <a href="/" 
                                        onClick={(e) => toggleModal(e, setAllPermissionModal, allPermissionModal)}>
                                        <p>All Permissions</p>
                                    </a>
                                    <Link to="/admindashboard/add-role">
                                        <p>Add Role</p>
                                    </Link>
                                    <Link to="/admindashboard/all-roles">
                                        <p>All Roles</p>
                                    </Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="btn-group-vertical d-flex ">
                                <a href='/' onClick={toggleActiveClass} className="dropdown-toggle-split" >
                                    <i className="fas fa-layer-group"></i>
                                    <p>Categories & Icons</p>
                                </a>
                                <div className={classes.DropDown + ' ' + classes.MaxHeight100}>
                                    <Link to="/admindashboard/add-category">
                                        <p>Add Category</p>
                                    </Link>
                                    <Link to="/admindashboard/all-categories">
                                        <p>All Categories</p>
                                    </Link>
                                    <Link to="/admindashboard/add-category-icon">
                                        <p>Add Category Icon</p>
                                    </Link>
                                    <Link to="/admindashboard/all-category-icons">
                                        <p>All Category Icons</p>
                                    </Link>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="btn-group-vertical d-flex ">
                                <a href='/' onClick={toggleActiveClass} className="dropdown-toggle-split" >
                                    <i className="fas fa-globe-europe"></i>
                                    <p>Brands</p>
                                </a>
                                <div className={classes.DropDown + ' ' + classes.MaxHeight100}>
                                    <Link to="/admindashboard/add-brand">
                                        <p>Add Brand</p>
                                    </Link>
                                    <Link to="/admindashboard/all-brands">
                                        <p>All Brands</p>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.login.User.id,
        username: state.login.User.username,
        profilePicture: state.allUsers.profilePicture,
        permissions: state.login.User.role.permissions,
        SingleUser: state.allUsers.SingleUser,
        AllUsers: state.allUsers.Users
    }
}

const dispatchMapToProps = dispatch => {
    return {
        getUserPhoto: (id) => dispatch(getLoggedInUserPhoto(id))
    }
}

export default withRouter(connect(mapStateToProps, dispatchMapToProps)(Navigation));