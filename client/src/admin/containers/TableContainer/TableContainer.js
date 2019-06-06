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
  const [allCoupons, setAllCoupons] = useState(false);
  const [allAnswers, setAllAnswers] = useState(false);
  const [allTerms, setAllTerms] = useState(false);
  const [allStores, setAllStores] = useState(false);
  const [allProducts, setAllProducts] = useState(false);

  const [failedMessage, setFailedMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteManyRecords, setDeleteManyRecords] = useState([]);

  useEffect(() => {
    if(props.Brands === true) {
      setBrands(props.brand.allBrands);
      props.getBrands();
    }
    if(props.Roles === true) {
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
    if(props.Coupons === true) {
      setAllCoupons(props.coupon.coupons);
      props.getAllCoupons();
    }
    if(props.Answers === true) {
      setAllAnswers(props.answers.answers);
      props.getAllAnswers();
    }
    if(props.Terms === true) {
      setAllTerms(props.terms.terms);
      props.getAllTerms();
    }
    if(props.Stores === true) {
      setAllStores(props.stores.stores);
      props.getStores();
    }
    if(props.Products === true) {
      setAllProducts(props.products.products);
      props.getAllProducts();
    }
  }, [props.Brands,props.Roles,props.Permissions,props.Users,props.Categories,props.Icons, props.Coupons, props.Answers, props.Terms,props.Stores,props.Products]);

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
    if(props.Coupons === true) {
      setAllCoupons(props.coupon.coupons);
    }
    if(props.Answers === true) {
      setAllAnswers(props.answers.answers);
    }
    if(props.Terms === true) {
      setAllTerms(props.terms.terms);
    }
    if(props.Stores === true) {
      setAllStores(props.stores.stores);
    }
    if(props.Products === true) {
      setAllProducts(props.products.products);
    }
  }, [props.brand.allBrands,props.permissions.allPermissions,props.roles.Roles,props.users.Users,props.categories.allCategories,props.icons.allCategoryIcons,props.coupon.coupons,props.answers.answers,props.terms.terms,props.stores.stores,props.products.products]);

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
    if(props.Coupons === true) {
      setFailedMessage(props.coupon.failedMessage);
    }
    if(props.Answers === true) {
      setFailedMessage(props.answers.failedMessage);
    }
    if(props.Terms === true) {
      setFailedMessage(props.terms.failedMessage);
    }
    if(props.Stores === true) {
      setFailedMessage(props.stores.failedMessage);
    }
    if(props.Products === true) {
      setFailedMessage(props.products.failedMessage);
    }
  }, [props.brand.failedMessage,props.permissions.failedMessage,props.roles.failedMessage,props.users.failedMessage,props.categories.failedMessage,props.icons.failedMessage, props.coupon.failedMessage,props.answers.failedMessage,props.terms.failedMessage,props.stores.failedMessage,props.products.failedMessage]);

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
    if(props.Coupons === true) {
      setSuccessMessage(props.coupon.successMessage);
    }
    if(props.Answers === true) {
      setSuccessMessage(props.answers.successMessage);
    }
    if(props.Terms === true) {
      setSuccessMessage(props.terms.successMessage);
    }
    if(props.Stores === true) {
      setSuccessMessage(props.stores.successMessage);
    }
    if(props.Products === true) {
      setSuccessMessage(props.products.successMessage);
    }
  }, [props.brand.successMessage,props.permissions.successMessage,props.roles.successMessage,props.users.successMessage,props.categories.successMessage,props.icons.successMessage, props.coupon.successMessage,props.answers.successMessage,props.terms.successMessage,props.stores.successMessage,props.products.successMessage]);

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
    if(props.Coupons === true) {
      setLoading(props.coupon.loading);
    }
    if(props.Answers === true) {
      setLoading(props.answers.loading);
    }
    if(props.Terms === true) {
      setLoading(props.terms.loading);
    }
    if(props.Stores === true) {
      setLoading(props.stores.loading);
    }
    if(props.Products === true) {
      setLoading(props.products.loading);
    }
  }, [props.brand.loading,props.permissions.loading,props.roles.loading,props.users.loading,props.categories.loading,props.icons.loading,props.coupon.loading,props.answers.loading,props.terms.loading,props.stores.loading,props.products.loading]);

  const singleDelete = (e, id, name=null) => {
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
    if (props.Coupons) {
      props.deleteCoupon(id);
    }
    if (props.Answers) {
      props.deleteAnswer(id);
    }
    if (props.Terms) {
      props.deleteTerm(id);
    }
    if (props.Stores) {
      props.deleteStore(id);
    }
    if (props.Products) {
      props.deleteProduct(id, name);
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
                {props.Coupons && <h4>All Coupons</h4>}
                {props.Answers && <h4>All Answers</h4>}
                {props.Terms && <h4>All Terms</h4>}
                {props.Stores && <h4>All Stores</h4>}
                {props.Products && <h4>All Products</h4>}
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
              {props.Coupons && (
                <DataTable
                  couponsData={allCoupons}
                  click={singleDelete}
                  loading={loading}
                />
              )}
              {props.Answers && (
                <DataTable
                  answersData={allAnswers}
                  click={singleDelete}
                  loading={loading}
                />
              )}
              {props.Terms && (
                <DataTable
                  termsData={allTerms}
                  click={singleDelete}
                  loading={loading}
                />
              )}
              {props.Stores && (
                <DataTable
                  storesData={allStores}
                  click={singleDelete}
                  loading={loading}
                />
              )}
              {props.Products && (
                <DataTable
                  productsData={allProducts}
                  click={singleDelete}
                  loading={loading}
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
    permissions: state.permissions,
    coupon: state.coupon,
    answers: state.answers,
    terms: state.terms,
    stores: state.stores,
    products: state.product
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
    deleteManyCategoryIcons: ids => dispatch(actions.deleteManyCategoryIcons(ids)),
    getUsers: () => dispatch(actions.getAllUsers()),
    deleteUser: id => dispatch(actions.deleteUser(id)),
    getRoles: () => dispatch(actions.getRoles()),
    deleteRole: id => dispatch(actions.deleteUserRole(id)),
    deleteManyRoles: ids => dispatch(actions.deleteManyUserRoles(ids)),
    getAllPermissions: () => dispatch(actions.getAllPermissions()),
    deletePermission: permission => dispatch(actions.deletePermission(permission)),
    deleteManyPermissions: permissions => dispatch(actions.deleteManyPermissions(permissions)),
    getAllCoupons: () => dispatch(actions.getCoupons()),
    deleteCoupon: id => dispatch(actions.deleteCoupon(id)),
    getAllAnswers: () => dispatch(actions.getAllAnswers()),
    deleteAnswer: (id) => dispatch(actions.deleteAnswer(id)),
    getAllTerms: () => dispatch(actions.getAllTerms()),
    deleteTerm: id => dispatch(actions.deleteTerm(id)),
    getStores: () => dispatch(actions.getStores()),
    deleteStore: id => dispatch(actions.deleteStore(id)),
    getAllProducts: () => dispatch(actions.getAllProducts()),
    deleteProduct: (id, name) => dispatch(actions.deleteProduct(id, name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
