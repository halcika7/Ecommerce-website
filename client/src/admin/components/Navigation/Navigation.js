import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./Navigation.module.css";

const Navigation = props => {
  const toggleActiveClass = e => {
    e.preventDefault();
    e.currentTarget.classList.toggle(classes.Active);
    e.currentTarget.parentNode.children[1].classList.toggle(
      classes.DropDownActive
    );
  };

  return (
    <React.Fragment>
      <div className={classes.Sidebar}>
        <div className={classes.SidebarWrapper}>
          <div className={classes.Logo}>
            <Link
              to="/admindashboard/dashboard"
              className={classes.SimpleText + " " + classes.LogoMini}
            >
              <div className="logo-img">
                {!props.profilePicture ? null : (
                  <img src={"/" + props.profilePicture} alt="react-logo" />
                )}
              </div>
            </Link>
            <Link
              to="/admindashboard/dashboard"
              className={classes.SimpleText + " " + classes.LogoNormal}
            >
              {props.username}
            </Link>
          </div>
          <ul className={classes.Nav}>
            <li className={"nav-item"}>
              <Link className="" to="/admindashboard/dashboard">
                <i
                  className={classes.TimIcons + " " + classes.IconChartPie36}
                />
                <p>Dashboard</p>
              </Link>
            </li>
            <li className={"nav-item"}>
              <Link
                className=""
                to={`/admindashboard/profile?id=${props.userId}`}
              >
                <i className={classes.TimIcons + " " + classes.IconSingle02} />
                <p>Profile</p>
              </Link>
            </li>
            <li>
              <div className="btn-group-vertical d-flex ">
                <a
                  href="/"
                  onClick={toggleActiveClass}
                  className="dropdown-toggle-split"
                >
                  <i className={classes.TimIcons + " " + classes.IconBag} />
                  <p>Products</p>
                </a>
                <div className={classes.DropDown}>
                  <Link to="/admindashboard/all-products">
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
                <a
                  href="/"
                  onClick={toggleActiveClass}
                  className="dropdown-toggle-split"
                >
                  <i
                    className={classes.TimIcons + " " + classes.IconSingle02}
                  />
                  <p>Users and Orders</p>
                </a>
                <div className={classes.DropDown}>
                  <Link to="/admindashboard/all-users">
                    <p>Users</p>
                  </Link>
                  <Link to="/admindashboard/add-user">
                    <p>Add User</p>
                  </Link>
                  <Link to="/admindashboard/all-orders">
                    <p>All Orders</p>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="btn-group-vertical d-flex ">
                <a
                  href="/"
                  onClick={toggleActiveClass}
                  className="dropdown-toggle-split"
                >
                  <i className={classes.TimIcons + " " + classes.IconBasket} />
                  <p>Permissions & Roles</p>
                </a>
                <div className={classes.DropDown + " " + classes.MaxHeight100}>
                  <Link to="/admindashboard/add-permission">
                    <p>Add Permission</p>
                  </Link>
                  <Link to="/admindashboard/all-permissions">
                    <p>ALL Permissions</p>
                  </Link>
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
                <a
                  href="/"
                  onClick={toggleActiveClass}
                  className="dropdown-toggle-split"
                >
                  <i className="fas fa-layer-group" />
                  <p>Categories & Icons</p>
                </a>
                <div className={classes.DropDown + " " + classes.MaxHeight100}>
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
                <a
                  href="/"
                  onClick={toggleActiveClass}
                  className="dropdown-toggle-split"
                >
                  <i className="fas fa-globe-europe" />
                  <p>Brands</p>
                </a>
                <div className={classes.DropDown + " " + classes.MaxHeight100}>
                  <Link to="/admindashboard/add-brand">
                    <p>Add Brand</p>
                  </Link>
                  <Link to="/admindashboard/all-brands">
                    <p>All Brands</p>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="btn-group-vertical d-flex ">
                <a
                  href="/"
                  onClick={toggleActiveClass}
                  className="dropdown-toggle-split"
                >
                  <i className="far fa-question-circle" />
                  <p>Answers to questions & Terms and Conditions</p>
                </a>
                <div className={classes.DropDown + " " + classes.MaxHeight100}>
                  <Link to="/admindashboard/add-answer">
                    <p>Add Answer</p>
                  </Link>
                  <Link to="/admindashboard/all-answers">
                    <p>All Answers</p>
                  </Link>
                  <Link to="/admindashboard/add-term">
                    <p>Add Term</p>
                  </Link>
                  <Link to="/admindashboard/all-terms">
                    <p>All Terms and Conditions</p>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="btn-group-vertical d-flex ">
                <a
                  href="/"
                  onClick={toggleActiveClass}
                  className="dropdown-toggle-split"
                >
                  <i className="fas fa-tags"></i>
                  <p>Coupons</p>
                </a>
                <div className={classes.DropDown + " " + classes.MaxHeight100}>
                  <Link to="/admindashboard/add-coupon">
                    <p>Add Coupon</p>
                  </Link>
                  <Link to="/admindashboard/all-coupons">
                    <p>All Coupons</p>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div className="btn-group-vertical d-flex ">
                <a
                  href="/"
                  onClick={toggleActiveClass}
                  className="dropdown-toggle-split"
                >
                  <i className="fas fa-compass"></i>
                  <p>Stores</p>
                </a>
                <div className={classes.DropDown + " " + classes.MaxHeight100}>
                  <Link to="/admindashboard/add-store">
                    <p>Add Store</p>
                  </Link>
                  <Link to="/admindashboard/all-stores">
                    <p>All Stores</p>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.login.User.id,
    username: state.login.User.username,
    profilePicture: state.user.profilePicture,
    permissions: state.login.User.role.permissions,
    SingleUser: state.user.SingleUser,
    AllUsers: state.user.Users
  };
};

const dispatchMapToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    dispatchMapToProps
  )(Navigation)
);
