import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import DataTable from '../../components/UI/DataTable/DataTable';

import ResponseMessages from '../../../users/components/UI/ResponseMessages/ResponseMessages';
import SmallSpinner from '../../../users/components/UI/SmallSpinner/SmallSpinner';

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
	const [allOrders, setAllOrders] = useState(false);

	const [failedMessage, setFailedMessage] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [loading, setLoading] = useState(false);
	const [deleteManyRecords, setDeleteManyRecords] = useState([]);

	useEffect(() => {
		if (props.Brands) {
			setBrands(props.brand.allBrands);
			props.getBrands();
		}
		if (props.Roles) {
			setAllRoles(props.roles.Roles);
			props.getRoles();
		}
		if (props.Permissions) {
			setAllPermissions(props.permissions.allPermissions);
			props.getAllPermissions();
		}
		if (props.Users) {
			setAllUsers(props.users.Users);
			props.getUsers();
		}
		if (props.Categories) {
			setAllCategories(props.categories.allCategories);
			props.getAllCategories();
		}
		if (props.Icons) {
			setAllCategoryIcons(props.icons.allCategoryIcons);
			props.getAllCategoryIcons();
		}
		if (props.Coupons) {
			setAllCoupons(props.coupon.coupons);
			props.getAllCoupons();
		}
		if (props.Answers) {
			setAllAnswers(props.answers.answers);
			props.getAllAnswers();
		}
		if (props.Terms) {
			setAllTerms(props.terms.terms);
			props.getAllTerms();
		}
		if (props.Stores) {
			setAllStores(props.stores.stores);
			props.getStores();
		}
		if (props.Products) {
			setAllProducts(props.products.products);
			props.getAllProducts();
		}
		if (props.Orders) {
			setAllOrders(props.orders.orders);
			props.getAllOrders();
		}
	}, [
		props.Brands,
		props.Roles,
		props.Permissions,
		props.Users,
		props.Categories,
		props.Icons,
		props.Coupons,
		props.Answers,
		props.Terms,
		props.Stores,
		props.Products,
		props.Orders
	]);

	useEffect(() => {
		props.Brands && setBrands(props.brand.allBrands);
		props.Permissions && setAllPermissions(props.permissions.allPermissions);
		props.Roles && setAllRoles(props.roles.Roles);
		props.Users && setAllUsers(props.users.Users);
		props.Categories && setAllCategories(props.categories.allCategories);
		props.Icons && setAllCategoryIcons(props.icons.allCategoryIcons);
		props.Coupons && setAllCoupons(props.coupon.coupons);
		props.Answers && setAllAnswers(props.answers.answers);
		props.Terms && setAllTerms(props.terms.terms);
		props.Stores && setAllStores(props.stores.stores);
		props.Products && setAllProducts(props.products.products);
		props.Orders && setAllOrders(props.orders.orders);
	}, [
		props.brand.allBrands,
		props.permissions.allPermissions,
		props.roles.Roles,
		props.users.Users,
		props.categories.allCategories,
		props.icons.allCategoryIcons,
		props.coupon.coupons,
		props.answers.answers,
		props.terms.terms,
		props.stores.stores,
		props.products.products,
		props.orders.orders
	]);

	useEffect(() => {
		props.Brands && setFailedMessage(props.brand.failedMessage);
		props.Permissions && setFailedMessage(props.permissions.failedMessage);
		props.Roles && setFailedMessage(props.roles.failedMessage);
		props.Users && setFailedMessage(props.users.failedMessage);
		props.Categories && setFailedMessage(props.categories.failedMessage);
		props.Icons && setFailedMessage(props.icons.failedMessage);
		props.Coupons && setFailedMessage(props.coupon.failedMessage);
		props.Answers && setFailedMessage(props.answers.failedMessage);
		props.Terms && setFailedMessage(props.terms.failedMessage);
		props.Stores && setFailedMessage(props.stores.failedMessage);
		props.Products && setFailedMessage(props.products.failedMessage);
		props.Orders && setFailedMessage(props.orders.failedMessage);
	}, [
		props.brand.failedMessage,
		props.permissions.failedMessage,
		props.roles.failedMessage,
		props.users.failedMessage,
		props.categories.failedMessage,
		props.icons.failedMessage,
		props.coupon.failedMessage,
		props.answers.failedMessage,
		props.terms.failedMessage,
		props.stores.failedMessage,
		props.products.failedMessage,
		props.orders.failedMessage
	]);

	useEffect(() => {
		props.Brands && setSuccessMessage(props.brand.successMessage);
		props.Permissions && setSuccessMessage(props.permissions.successMessage);
		props.Roles && setSuccessMessage(props.roles.successMessage);
		props.Users && setSuccessMessage(props.users.successMessage);
		props.Categories && setSuccessMessage(props.categories.successMessage);
		props.Icons && setSuccessMessage(props.icons.successMessage);
		props.Coupons && setSuccessMessage(props.coupon.successMessage);
		props.Answers && setSuccessMessage(props.answers.successMessage);
		props.Terms && setSuccessMessage(props.terms.successMessage);
		props.Stores && setSuccessMessage(props.stores.successMessage);
		props.Products && setSuccessMessage(props.products.successMessage);
		props.Orders && setSuccessMessage(props.orders.successMessage);
	}, [
		props.brand.successMessage,
		props.permissions.successMessage,
		props.roles.successMessage,
		props.users.successMessage,
		props.categories.successMessage,
		props.icons.successMessage,
		props.coupon.successMessage,
		props.answers.successMessage,
		props.terms.successMessage,
		props.stores.successMessage,
		props.products.successMessage,
		props.orders.successMessage
	]);

	useEffect(() => {
		props.Brands && setLoading(props.brand.loading);
		props.Permissions && setLoading(props.permissions.loading);
		props.Roles && setLoading(props.roles.loading);
		props.Users && setLoading(props.users.loading);
		props.Categories && setLoading(props.categories.loading);
		props.Icons && setLoading(props.icons.loading);
		props.Coupons && setLoading(props.coupon.loading);
		props.Answers && setLoading(props.answers.loading);
		props.Terms && setLoading(props.terms.loading);
		props.Stores && setLoading(props.stores.loading);
		props.Products && setLoading(props.products.loading);
		props.Orders && setLoading(props.orders.loading);
	}, [
		props.brand.loading,
		props.permissions.loading,
		props.roles.loading,
		props.users.loading,
		props.categories.loading,
		props.icons.loading,
		props.coupon.loading,
		props.answers.loading,
		props.terms.loading,
		props.stores.loading,
		props.products.loading,
		props.orders.loading
	]);

	const singleDelete = (e, id, name = null) => {
		e.preventDefault();
		props.Brands && props.deleteBrand(id);
		props.Users && props.deleteUser(id);
		props.Categories && props.deleteCategory(id);
		props.Icons && props.deleteCategoryIcon(id);
		props.Roles && props.deleteRole(id);
		props.Permissions && props.deletePermission(id);
		props.Coupons && props.deleteCoupon(id);
		props.Answers && props.deleteAnswer(id);
		props.Terms && props.deleteTerm(id);
		props.Stores && props.deleteStore(id);
		props.Products && props.deleteProduct(id, name);
		props.Orders && props.deleteOrder(id);
		setDeleteManyRecords([]);
	};

	const manyDelete = (e, ids) => {
		e.preventDefault();
		if (ids.length < 1) {
			return alert('Nothing selected to delete');
		}
		props.Brands && props.deleteManyBrands(ids);
		props.Categories && props.deleteManyCategories(ids);
		props.Icons && props.deleteManyCategoryIcons(ids);
		props.Roles && props.deleteManyRoles(ids);
		props.Permissions && props.deleteManyPermissions(ids);
		setDeleteManyRecords([]);
	};

	return (
		<React.Fragment>
			<div className="AdminProfile row">
				{successMessage ? <ResponseMessages message={successMessage} /> : null}
				{failedMessage ? (
					<ResponseMessages ClassName="Danger" message={failedMessage} />
				) : null}
				<div className={'col-12 text-white'}>
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
								{props.Orders && <h4>All Orders</h4>}
							</div>
							{deleteManyRecords.length > 0 && !props.Users && (
								<div className="col-12 mt-20 pl-125">
									<div className="ButtonWrapper">
										<button
											className="ButtonDanger"
											onClick={e => manyDelete(e, deleteManyRecords)}>
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
							{props.Orders && (
								<DataTable
									ordersData={allOrders}
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
		products: state.product,
		orders: state.orders
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
			dispatch(actions.deleteManyPermissions(permissions)),
		getAllCoupons: () => dispatch(actions.getCoupons()),
		deleteCoupon: id => dispatch(actions.deleteCoupon(id)),
		getAllAnswers: () => dispatch(actions.getAllAnswers()),
		deleteAnswer: id => dispatch(actions.deleteAnswer(id)),
		getAllTerms: () => dispatch(actions.getAllTerms()),
		deleteTerm: id => dispatch(actions.deleteTerm(id)),
		getStores: () => dispatch(actions.getStores()),
		deleteStore: id => dispatch(actions.deleteStore(id)),
		getAllProducts: () => dispatch(actions.getAllProducts()),
		deleteProduct: (id, name) => dispatch(actions.deleteProduct(id, name)),
		getAllOrders: () => dispatch(actions.getAllOrders()),
		deleteOrder: id => dispatch(actions.deleteOrder(id))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TableContainer);
