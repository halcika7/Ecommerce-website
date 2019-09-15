import React, { lazy, useState, useEffect } from 'react';
import { withRouter, Switch } from 'react-router-dom';
import { checkLoggedInUser, checkCart } from './helpers/checkLoggedInUser';
import { connect } from 'react-redux';

import './App.css';
import Navigation from './users/components/Navigation/Navigation';
import Footer from './users/components/Footer/Footer';
import AdminNavigation from './admin/components/Navigation/Navigation';
import NavBar from './admin/components/NavBar/Navbar';
import AdminFooter from './admin/components/Footer/Footer';
import PrivateRoute from './helpers/PrivateRoute/PrivateRoute';
import AdminRoute from './helpers/PrivateRoute/AdminRoute';
import PublicRoute from './helpers/PrivateRoute/PublicRoute';

const Home = lazy(() => import('./users/containers/Home/Home'));
const Profile = lazy(() => import('./users/containers/Profile/Profile'));
const Product = lazy(() => import('./users/containers/Product/Product'));
const Products = lazy(() => import('./users/containers/Products/Products'));
const AuthPage = lazy(() =>
	import('./users/containers/AuthenticationPage/AuthPage')
);
const About = lazy(() => import('./users/containers/About/About'));
const Terms = lazy(() => import('./users/containers/Terms/Terms'));
const Support = lazy(() => import('./users/containers/Support/Support'));
const Cart = lazy(() => import('./users/containers/Cart/Cart'));
const Checkout = lazy(() => import('./users/containers/Checkout/Checkout'));
const Contact = lazy(() => import('./users/containers/Contact/Contact'));
const StoreLocator = lazy(() =>
	import('./users/containers/Storelocator/Storelocator')
);
const PageNotFound = lazy(() => import('./users/containers/404/404'));
const AccountActivation = lazy(() =>
	import(
		'./users/containers/AuthenticationPage/AccountActivation/AccountActivation'
	)
);
// admin routes
const Dashboard = lazy(() => import('./admin/containers/Dashboard/Dashboard'));
const AddProduct = lazy(() =>
	import('./admin/containers/AddProduct/AddProduct')
);
const ViewUser = lazy(() => import('./admin/containers/User/User'));
const AddUser = lazy(() => import('./admin/containers/AddUser/AddUser'));
const UpdateRole = lazy(() => import('./admin/containers/Role/UpdateRole'));
const AddRole = lazy(() => import('./admin/containers/Role/AddRole'));
const AddCategory = lazy(() => import('./admin/containers/Category/Category'));
const CategoryIcon = lazy(() =>
	import('./admin/containers/CategoryIcons/CategoryIcon')
);
const Brand = lazy(() => import('./admin/containers/Brand/Brand'));
const Permission = lazy(() =>
	import('./admin/containers/Permission/Permission')
);
const AnswersToQuestions = lazy(() =>
	import('./admin/containers/AnswersToQuestions/AnswersToQuestions')
);
const TermBack = lazy(() => import('./admin/containers/Terms/Terms'));
const AddCoupon = lazy(() => import('./admin/containers/Coupons/AddCoupon'));
const Store = lazy(() => import('./admin/containers/Store/Store'));
const Order = lazy(() => import('./admin/containers/Order/Order'));

const TableContainer = lazy(() =>
	import('./admin/containers/TableContainer/TableContainer')
);

const App = props => {
	const [state, setState] = useState({
		companySocial: [
			{ link: '/', icon: 'fab fa-facebook-f' },
			{ link: '/', icon: 'fab fa-twitter' },
			{ link: '/', icon: 'fab fa-instagram' },
			{ link: '/', icon: 'fab fa-pinterest' },
			{ link: '/', icon: 'fab fa-dribbble' },
			{ link: '/', icon: 'fab fa-google' }
		],

		companyDetails: {
			phone: '023-123-345',
			address: 'Semira Fraste 5, Sarajevo 7100, BiH'
		}
	});

	useEffect(() => {
		storageChanged();
		checkLoggedInUser(props.history.push);
		window.addEventListener('storage', storageChanged);
		return () => setState({ ...state, show: false });
	}, []);

	useEffect(() => {
		checkLoggedInUser(props.history.push);
	}, [props.location.search, props.match.params]);

	const storageChanged = () => checkCart();

	if (
		props.isAdmin.role.isAdmin &&
		props.isAuthenticated &&
		props.location.pathname.includes('admindashboard')
	) {
		return (
			<React.Fragment>
				<section
					className="AdminWrapper">
					<AdminNavigation />
					<div className="main-panel">
						<NavBar />
						<div className="content">
							<Switch>
								<AdminRoute
									PageToLoad={Dashboard}
									path="/admindashboard/dashboard"
									exact
								/>
								{/* user */}
								<AdminRoute
									PageToLoad={ViewUser}
									componentProps={{ profile: true }}
									path="/admindashboard/profile"
									exact
								/>
								<AdminRoute
									PageToLoad={AddUser}
									path="/admindashboard/add-user"
									exact
								/>
								<AdminRoute
									PageToLoad={ViewUser}
									componentProps={{ view: true }}
									path="/admindashboard/view-user"
									exact
								/>
								<AdminRoute
									PageToLoad={ViewUser}
									componentProps={{ edit: true }}
									path="/admindashboard/edit-user"
									exact
								/>
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Users: true }}
									path="/admindashboard/all-users"
									exact
								/>
								{/* Orders */}
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Orders: true }}
									path="/admindashboard/all-orders"
									exact
								/>
								<AdminRoute
									PageToLoad={Order}
									componentProps={{ view: true }}
									path="/admindashboard/view-order"
									exact
								/>
								<AdminRoute
									PageToLoad={Order}
									componentProps={{ edit: true }}
									path="/admindashboard/edit-order"
									exact
								/>
								{/* products */}
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Products: true }}
									path="/admindashboard/all-products"
									exact
								/>
								<AdminRoute
									PageToLoad={AddProduct}
									path="/admindashboard/add-product"
									exact
								/>
								{/* permissions */}
								<AdminRoute
									PageToLoad={Permission}
									path="/admindashboard/add-permission"
									exact
								/>
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Permissions: true }}
									path="/admindashboard/all-permissions"
									exact
								/>
								{/* roles */}
								<AdminRoute
									PageToLoad={AddRole}
									path="/admindashboard/add-role"
									exact
								/>
								<AdminRoute
									PageToLoad={UpdateRole}
									path="/admindashboard/edit-role"
									exact
								/>
								<AdminRoute
									PageToLoad={UpdateRole}
									componentProps={{ view: true }}
									path="/admindashboard/view-role"
									exact
								/>
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Roles: true }}
									path="/admindashboard/all-roles"
									exact
								/>
								{/* category icons */}
								<AdminRoute
									PageToLoad={AddCategory}
									componentProps={{ addcategory: true }}
									path="/admindashboard/add-category"
									exact
								/>
								<AdminRoute
									PageToLoad={AddCategory}
									componentProps={{ editcategory: true }}
									path="/admindashboard/edit-category"
									exact
								/>
								<AdminRoute
									PageToLoad={AddCategory}
									componentProps={{ viewcategory: true }}
									path="/admindashboard/view-category"
									exact
								/>
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Categories: true }}
									path="/admindashboard/all-categories"
									exact
								/>
								{/* Category Icon */}
								<AdminRoute
									PageToLoad={CategoryIcon}
									componentProps={{ addicon: true }}
									path="/admindashboard/add-category-icon"
									exact
								/>
								<AdminRoute
									PageToLoad={CategoryIcon}
									componentProps={{ viewicon: true }}
									path="/admindashboard/view-category-icon"
									exact
								/>
								<AdminRoute
									PageToLoad={CategoryIcon}
									componentProps={{ editicon: true }}
									path="/admindashboard/edit-category-icon"
									exact
								/>
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Icons: true }}
									path="/admindashboard/all-category-icons"
									exact
								/>
								{/* Brand */}
								<AdminRoute
									PageToLoad={Brand}
									componentProps={{ addbrand: true }}
									path="/admindashboard/add-brand"
									exact
								/>
								<AdminRoute
									PageToLoad={Brand}
									componentProps={{ viewbrand: true }}
									path="/admindashboard/view-brand"
									exact
								/>
								<AdminRoute
									PageToLoad={Brand}
									componentProps={{ editbrand: true }}
									path="/admindashboard/edit-brand"
									exact
								/>
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Brands: true }}
									path="/admindashboard/all-brands"
									exact
								/>
								{/* Answers */}
								<AdminRoute
									PageToLoad={AnswersToQuestions}
									componentProps={{ addanswer: true }}
									path="/admindashboard/add-answer"
									exact
								/>
								<AdminRoute
									PageToLoad={AnswersToQuestions}
									componentProps={{ view: true }}
									path="/admindashboard/view-answer"
									exact
								/>
								<AdminRoute
									PageToLoad={AnswersToQuestions}
									componentProps={{ edit: true }}
									path="/admindashboard/edit-answer"
									exact
								/>
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Answers: true }}
									path="/admindashboard/all-answers"
									exact
								/>
								{/* Terms */}
								<AdminRoute
									PageToLoad={TermBack}
									componentProps={{ addterm: true }}
									path="/admindashboard/add-term"
									exact
								/>
								<AdminRoute
									PageToLoad={TermBack}
									componentProps={{ view: true }}
									path="/admindashboard/view-term"
									exact
								/>
								<AdminRoute
									PageToLoad={TermBack}
									componentProps={{ edit: true }}
									path="/admindashboard/edit-term"
									exact
								/>
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Terms: true }}
									path="/admindashboard/all-terms"
									exact
								/>
								{/* Coupons */}
								<AdminRoute
									PageToLoad={AddCoupon}
									path="/admindashboard/add-coupon"
									componentProps={{ add: true }}
									exact
								/>
								<AdminRoute
									PageToLoad={AddCoupon}
									path="/admindashboard/view-coupon"
									componentProps={{ view: true }}
									exact
								/>
								<AdminRoute
									PageToLoad={AddCoupon}
									path="/admindashboard/edit-coupon"
									componentProps={{ edit: true }}
									exact
								/>
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Coupons: true }}
									path="/admindashboard/all-coupons"
									exact
								/>
								{/* Stores */}
								<AdminRoute
									PageToLoad={Store}
									componentProps={{ addstore: true }}
									path="/admindashboard/add-store"
									exact
								/>
								<AdminRoute
									PageToLoad={Store}
									componentProps={{ view: true }}
									path="/admindashboard/view-store"
									exact
								/>
								<AdminRoute
									PageToLoad={Store}
									componentProps={{ edit: true }}
									path="/admindashboard/edit-store"
									exact
								/>
								<AdminRoute
									PageToLoad={TableContainer}
									componentProps={{ Stores: true }}
									path="/admindashboard/all-stores"
									exact
								/>
								<AdminRoute PageToLoad={PageNotFound} />
							</Switch>
							<AdminFooter />
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<div className="App">
					<Navigation icons={state.companySocial} {...props} />
					<Switch>
						<PublicRoute PageToLoad={Home} path="/" exact />
						<PrivateRoute PageToLoad={Profile} path="/profile" exact />
						<PublicRoute
							PageToLoad={Product}
							path="/product"
							componentProp={{ show: state.show }}
							exact
						/>
						<PublicRoute
							PageToLoad={Products}
							path="/products"
							componentProp={{ show: state.show }}
							exact
						/>
						<PublicRoute
							PageToLoad={AuthPage}
							path="/authentication"
							componentProp={{ reset: false }}
							exact
						/>
						<PublicRoute
							PageToLoad={AuthPage}
							path="/authentication/reset"
							componentProp={{ reset: true }}
							exact
						/>
						<PublicRoute
							PageToLoad={AccountActivation}
							path="/confirmationaccount"
							exact
						/>
						<PublicRoute PageToLoad={About} path="/about" exact />
						<PublicRoute PageToLoad={Terms} path="/terms" exact />
						<PublicRoute PageToLoad={Support} path="/support" exact />
						<PublicRoute PageToLoad={Cart} path="/cart" exact />
						<PrivateRoute PageToLoad={Checkout} path="/checkout" exact />
						<PublicRoute PageToLoad={Contact} path="/contact" exact />
						<PublicRoute PageToLoad={StoreLocator} path="/storelocator" exact />
						<PublicRoute PageToLoad={PageNotFound} />
					</Switch>
					<Footer icons={state.companySocial} details={state.companyDetails} />
				</div>
			</React.Fragment>
		);
	}
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.login.isAuthenticated,
		isAdmin: state.login.User,
		login: state.login
	};
};

export default withRouter(React.memo(connect(mapStateToProps)(App)));
