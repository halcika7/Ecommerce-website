import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import DataTable from "../../components/UI/DataTable/DataTable";

import ResponseMessages from "../../../users/components/UI/ResponseMessages/ResponseMessages";
import SmallSpinner from "../../../users/components/UI/SmallSpinner/SmallSpinner";

const TableContainer = props => {
  const [brands, setBrands] = useState(false);
  const [allUsers, setAllUsers] = useState(false);
  const [allCategoryIcons, setAllCategoryIcons] = useState(false);
  const [allCategories, setAllCategories] = useState(false);
  const [allPermissions, setAllPermissions] = useState(false);
  const [allRoles, setAllRoles] = useState(false);

  const [failedMessage, setFailedMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteManyRecords, setDeleteManyRecords] = useState([]);

  useEffect(() => {
    if(props.Brands === true) {
      setBrands(props.brand.allBrands);
      props.getBrands();
    }
    if(props.Rrands === true) {
      setAllRoles(props.roles.Roles);
      props.getRoles();
    }
    if(props.Permissions === true) {
      setAllPermissions(props.permissions.allPermissions);
      props.getAllPermissions();
    }
    if(props.Users === true) {
      setAllUsers(props.users.Users);
      props.getUsers();
    }
    if(props.Categories === true) {
      setAllCategories(props.categories.allCategories);
      props.getAllCategories();
    }
    if(props.Icons === true) {
      setAllCategoryIcons(props.icons.allCategoryIcons);
      props.getAllCategoryIcons();
    }
  }, [props.Brands,props.Roles,props.Permissions,props.Users,props.Categories,props.Icons]);

  useEffect(() => {
    if (props.Brands === true) {
      setBrands(props.brand.allBrands);
    }
    if (props.Permissions === true) {
      setAllPermissions(props.permissions.allPermissions);
    }
    if (props.Roles === true) {
      setAllRoles(props.roles.Roles);
    }
    if (props.Users === true) {
      setAllUsers(props.users.Users);
    }
    if (props.Categories === true) {
      setAllCategories(props.categories.allCategories);
    }
    if (props.Icons === true) {
      setAllCategoryIcons(props.icons.allCategoryIcons);
    }
  }, [props.brand.allBrands,props.permissions.allPermissions,props.roles.Roles,props.users.Users,props.categories.allCategories,props.icons.allCategoryIcon]);

  useEffect(() => {
    if(props.Brands === true) {
      setFailedMessage(props.brand.failedMessage);
    }
    if(props.Permissions === true) {
      setFailedMessage(props.permissions.failedMessage);
    }
    if(props.Roles === true) {
      setFailedMessage(props.roles.failedMessage);
    }
    if(props.Users === true) {
      setFailedMessage(props.users.failedMessage);
    }
    if(props.Categories === true) {
      setFailedMessage(props.categories.failedMessage);
    }
    if(props.Icons === true) {
      setFailedMessage(props.icons.failedMessage);
    }
  }, [props.brand.failedMessage,props.permissions.failedMessage,props.roles.failedMessage,props.users.failedMessage,props.categories.failedMessage,props.icons.failedMessage]);

  useEffect(() => {
    if(props.Brands === true) {
      setSuccessMessage(props.brand.successMessage);
    }
    if(props.Permissions === true) {
      setSuccessMessage(props.permissions.successMessage);
    }
    if(props.Roles === true) {
      setSuccessMessage(props.roles.successMessage);
    }
    if(props.Users === true) {
      setSuccessMessage(props.users.successMessage);
    }
    if(props.Categories === true) {
      setSuccessMessage(props.categories.successMessage);
    }
    if(props.Icons === true) {
      setSuccessMessage(props.icons.successMessage);
    }
  }, [props.brand.successMessage,props.permissions.successMessage,props.roles.successMessage,props.users.successMessage,props.categories.successMessage,props.icons.successMessage]);

  useEffect(() => {
    if(props.Brands === true) {
      setLoading(props.brand.loading);
    }
    if(props.Permissions === true) {
      setLoading(props.permissions.loading);
    }
    if(props.Roles === true) {
      setLoading(props.roles.loading);
    }
    if(props.Users === true) {
      setLoading(props.users.loading);
    }
    if(props.Categories === true) {
      setLoading(props.categories.loading);
    }
    if(props.Icons === true) {
      setLoading(props.icons.loading);
    }
  }, [props.brand.loading,props.permissions.loading,props.roles.loading,props.users.loading,props.categories.loading,props.icons.loading]);

  const singleDelete = (e, id) => {
    e.preventDefault();
    if (props.Brands) {
      props.deleteBrand(id);
    }
    if (props.Users) {
      props.deleteUser(id);
    }
    if (props.Categories) {
      props.deleteCategory(id);
    }
    if (props.Icons) {
      props.deleteCategoryIcon(id);
    }
    if (props.Roles) {
      props.deleteRole(id);
    }
    if (props.Permissions) {
      props.deletePermission(id);
    }
    setDeleteManyRecords([]);
  };

  const manyDelete = (e, ids) => {
    e.preventDefault();
    if (ids.length < 1) {
      return alert("Nothing selected to delete");
    }
    if (props.Brands) {
      props.deleteManyBrands(ids);
    }
    if (props.Categories) {
      props.deleteManyCategories(ids);
    }
    if (props.Icons) {
      props.deleteManyCategoryIcons(ids);
    }
    if (props.Roles) {
      props.deleteManyRoles(ids);
    }
    if (props.Permissions) {
      props.deleteManyPermissions(ids);
    }
    setDeleteManyRecords([]);
  };

  return (
    <React.Fragment>
      <div className="AdminProfile row">
        {successMessage ? <ResponseMessages message={successMessage} /> : null}
        {failedMessage ? (
          <ResponseMessages ClassName="Danger" message={failedMessage} />
        ) : null}
        <div className={"col-12 text-white"}>
          {loading ? (
            <div className="card mb-30 bg-white">
              <SmallSpinner />
            </div>
          ) : (
            <div className="Card card mb-30">
              <div className="card-header">
                {props.Brands && <h4>All Brands</h4>}
                {props.Users && <h4>All Users</h4>}
                {props.Categories && <h4>All Categories</h4>}
                {props.Icons && <h4>All Icons</h4>}
                {props.Roles && <h4>All Roles</h4>}
                {props.Permissions && <h4>All Permissions</h4>}
              </div>
              {(deleteManyRecords.length > 0 && !props.Users) && (
                <div className="col-12 mt-20 pl-125">
                  <div className="ButtonWrapper">
                    <button
                      className="ButtonDanger"
                      onClick={e => manyDelete(e, deleteManyRecords)}
                    >
                      Delete Selected
                    </button>
                  </div>
                </div>
              )}
              {props.Brands && (
                <DataTable
                  brandsData={brands}
                  click={singleDelete}
                  setDeleteData={setDeleteManyRecords}
                  selectedDeleteData={deleteManyRecords}
                  loading={loading}
                />
              )}
              {props.Icons && (
                <DataTable
                  iconsData={allCategoryIcons}
                  click={singleDelete}
                  setDeleteData={setDeleteManyRecords}
                  selectedDeleteData={deleteManyRecords}
                  loading={loading}
                />
              )}
              {props.Categories && (
                <DataTable
                  categoriesData={allCategories}
                  click={singleDelete}
                  setDeleteData={setDeleteManyRecords}
                  selectedDeleteData={deleteManyRecords}
                  loading={loading}
                />
              )}
              {props.Roles && (
                <DataTable
                  rolesData={allRoles}
                  click={singleDelete}
                  loading={loading}
                  setDeleteData={setDeleteManyRecords}
                  selectedDeleteData={deleteManyRecords}
                />
              )}
              {props.Users && (
                <DataTable
                  usersData={allUsers}
                  click={singleDelete}
                  loading={loading}
                />
              )}
              {props.Permissions && (
                <DataTable
                  permissionsData={allPermissions}
                  click={singleDelete}
                  loading={loading}
                  setDeleteData={setDeleteManyRecords}
                  selectedDeleteData={deleteManyRecords}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    brand: state.brand,
    users: state.user,
    categories: state.category,
    icons: state.categoryIcon,
    roles: state.roles,
    permissions: state.permissions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBrands: () => dispatch(actions.getAllBrands()),
    deleteBrand: id => dispatch(actions.deleteBrand(id)),
    deleteManyBrands: ids => dispatch(actions.deleteManyBrands(ids)),
    getAllCategories: () => dispatch(actions.getAllCategories()),
    deleteCategory: id => dispatch(actions.deleteCategory(id)),
    deleteManyCategories: ids => dispatch(actions.deleteManyCategories(ids)),
    getAllCategoryIcons: () => dispatch(actions.getAllCategoryIcons()),
    deleteCategoryIcon: id => dispatch(actions.deleteCategoryIcon(id)),
    deleteManyCategoryIcons: ids =>
      dispatch(actions.deleteManyCategoryIcons(ids)),
    getUsers: () => dispatch(actions.getAllUsers()),
    deleteUser: id => dispatch(actions.deleteUser(id)),
    getRoles: () => dispatch(actions.getRoles()),
    deleteRole: id => dispatch(actions.deleteUserRole(id)),
    deleteManyRoles: ids => dispatch(actions.deleteManyUserRoles(ids)),
    getAllPermissions: () => dispatch(actions.getAllPermissions()),
    deletePermission: permission =>
      dispatch(actions.deletePermission(permission)),
    deleteManyPermissions: permissions =>
      dispatch(actions.deleteManyPermissions(permissions))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
