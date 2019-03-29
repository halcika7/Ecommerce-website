import React, { useState, useEffect } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import classes from './Navigation.module.css';
import Modal from '../UI/Modal/Modal';
import AllPermissionsModal from '../UI/Modal/AllPermissionsModal';
import AddRoleModal from '../UI/Modal/AddRoleModal';
import AllRolesModal from '../UI/Modal/AllRoles';

const Navigation = props => {

    const [user, setUser] = useState({profilePicture: '', username: ''});
    const [permissionModal, setPermissionModal] = useState(false);
    const [allPermissionModal, setAllPermissionModal] = useState(false);

    useEffect(() => {
        setUser({
            profilePicture: props.userState.profilePicture,
            username: props.userState.username
        });
    }, []);

    useEffect(() => {
        setUser({
            ...user,
            profilePicture: props.userState.profilePicture,
            username: props.userState.username
        });
    }, [props.userState]);

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
                        <Link to="/admindashboard/dasboard" className={classes.SimpleText + ' ' + classes.LogoMini}>
                            <div className="logo-img">
                                <img src={'/' + user.profilePicture} alt="react-logo" />
                            </div>
                        </Link>
                        <Link to="/admindashboard/dasboard" className={classes.SimpleText + ' ' + classes.LogoNormal}>{user.username}</Link>
                    </div>
                    <ul className={classes.Nav}>
                        <li className={"nav-item"}>
                            <NavLink className="" to='/admindashboard/dashboard' exact activeClassName={classes.Active}>
                                <i className={classes.TimIcons + ' ' + classes.IconChartPie36}></i>
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink className="" to="/admindashboard/profile" exact activeClassName={classes.Active}>
                                <i className={classes.TimIcons + ' ' + classes.IconSingle02}></i>
                                <p>Profile</p>
                            </NavLink>
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
                                    <Link to="/admindashboard/addproduct">
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
                                    <Link to="/admindashboard/adminAllUsers">
                                        <p>Users</p>
                                    </Link>
                                    <Link to="/admindashboard/adduser">
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
                                    <p>Permissions and Roles</p>
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
                                    <Link to="/admindashboard/addrole">
                                        <p>Add Role</p>
                                    </Link>
                                    <Link to="/admindashboard/allroles">
                                        <p>All Roles</p>
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
        userState: state.login.User,
        permissions: state.login.User.role.permissions
    }
}

export default withRouter(connect(mapStateToProps)(Navigation));