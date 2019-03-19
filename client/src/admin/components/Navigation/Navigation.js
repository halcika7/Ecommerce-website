import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import classes from './Navigation.module.css';

const Navigation = props => {

    const [user, setUser] = useState({profilePicture: '', username: ''});

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
    
    return(
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
                    <li>
                        <Link to='/admindashboard/dashboard'>
                            <i className={classes.TimIcons + ' ' + classes.IconChartPie36}></i>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admindashboard/profile">
                            <i className={classes.TimIcons + ' ' + classes.IconSingle02}></i>
                            <p>Profile</p>
                        </Link>
                    </li>
                    <li>
                        <div className="btn-group-vertical d-flex ">
                            <a href="/" className="dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className={classes.TimIcons + ' ' + classes.IconSingle02}></i>
                                Products Pages
                            </a>
                            <div className="dropdown-menu position-relative transform-none text-dark">
                                <Link to="/admindashboard/products" className="text-dark">
                                    <p>Products</p>
                                </Link>
                                <Link to="/admindashboard/addproduct" className="text-dark">
                                    <p>Add Product</p>
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="btn-group-vertical d-flex ">
                            <a href="/" className="dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className={classes.TimIcons + ' ' + classes.IconSingle02}></i>
                                Users Pages
                            </a>
                            <div className="dropdown-menu position-relative transform-none text-dark">
                                <Link to="/admindashboard/adminAllUsers" className="text-dark">
                                    <p>Users</p>
                                </Link>
                                <Link to="/admindashboard/adduser" className="text-dark">
                                    <p>Add User</p>
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userState: state.login.User
    }
}

export default connect(mapStateToProps)(Navigation);