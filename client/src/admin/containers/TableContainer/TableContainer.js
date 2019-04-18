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
    setBrands(props.brand.allBrands);
    props.getBrands();
  }, [props.Brands]);
  useEffect(() => {
    setAllRoles(props.roles.Roles);
    props.getRoles();
  }, [props.Roles]);
  useEffect(() => {
    setAllPermissions(props.permissions.allPermissions);
    props.getAllPermissions();
  }, [props.Permissions]);
  useEffect(() => {
    setAllUsers(props.users.Users);
    props.getUsers();
  }, [props.Users]);
  useEffect(() => {
    setAllCategories(props.categories.allCategories);
    props.getAllCategories();
  }, [props.Categories]);
  useEffect(() => {
    setAllCategoryIcons(props.icons.allCategoryIcons);
    props.getAllCategoryIcons();
  }, [props.Icons]);

  useEffect(() => {
    if (props.Brands) {
      setBrands(props.brand.allBrands);
    }
  }, [props.brand.allBrands]);
  useEffect(() => {
    if (props.Permissions) {
      setAllPermissions(props.permissions.allPermissions);
    }
  }, [props.permissions.allPermissions]);
  useEffect(() => {
    if (props.Roles) {
      setAllRoles(props.roles.Roles);
    }
  }, [props.roles.Roles]);
  useEffect(() => {
    if (props.Users) {
      setAllUsers(props.users.Users);
    }
  }, [props.users.Users]);
  useEffect(() => {
    if (props.Categories) {
      setAllCategories(props.categories.allCategories);
    }
  }, [props.categories.allCategories]);
  useEffect(() => {
    if (props.Icons) {
      setAllCategoryIcons(props.icons.allCategoryIcons);
    }
  }, [props.icons.allCategoryIcons]);

  useEffect(() => {
    setFailedMessage(props.brand.failedMessage);
  }, [props.brand.failedMessage]);
  useEffect(() => {
    setFailedMessage(props.permissions.failedMessage);
  }, [props.permissions.failedMessage]);
  useEffect(() => {
    setFailedMessage(props.roles.failedMessage);
  }, [props.roles.failedMessage]);
  useEffect(() => {
    setFailedMessage(props.users.failedMessage);
  }, [props.users.failedMessage]);
  useEffect(() => {
    setFailedMessage(props.categories.failedMessage);
  }, [props.categories.failedMessage]);
  useEffect(() => {
    setFailedMessage(props.icons.failedMessage);
  }, [props.icons.failedMessage]);

  useEffect(() => {
    setSuccessMessage(props.brand.successMessage);
  }, [props.brand.successMessage]);
  useEffect(() => {
    setSuccessMessage(props.permissions.successMessage);
  }, [props.permissions.successMessage]);
  useEffect(() => {
    setSuccessMessage(props.roles.successMessage);
  }, [props.roles.successMessage]);
  useEffect(() => {
    setSuccessMessage(props.users.successMessage);
  }, [props.users.successMessage]);
  useEffect(() => {
    setSuccessMessage(props.categories.successMessage);
  }, [props.categories.successMessage]);
  useEffect(() => {
    setSuccessMessage(props.icons.successMessage);
  }, [props.icons.successMessage]);

  useEffect(() => {
    setLoading(props.brand.loading);
  }, [props.brand.loading]);
  useEffect(() => {
    setLoading(props.permissions.loading);
  }, [props.permissions.loading]);
  useEffect(() => {
    setLoading(props.roles.loading);
  }, [props.roles.loading]);
  useEffect(() => {
    setLoading(props.users.loading);
  }, [props.users.loading]);
  useEffect(() => {
    setLoading(props.categories.loading);
  }, [props.categories.loading]);
  useEffect(() => {
    setLoading(props.icons.loading);
  }, [props.icons.loading]);

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
              {deleteManyRecords.length > 0 && !props.Users && (
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
