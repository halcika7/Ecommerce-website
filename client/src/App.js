import React, {lazy, Suspense, useState, useEffect} from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { checkLoggedInUser } from './helpers/checkLoggedInUser';

import { connect } from 'react-redux';

import './App.css';
import Navigation from './users/components/Navigation/Navigation';
import Footer from './users/components/Footer/Footer';
import Spinner from './users/components/UI/Spinner/Spinner';
import AdminNavigation from './admin/components/Navigation/Navigation';
import NavBar from './admin/components/NavBar/Navbar';
import AdminFooter from './admin/components/Footer/Footer';

const Home = lazy(() => import('./users/containers/Home/Home'));
const Product = lazy(() => import('./users/containers/Product/Product'));
const AuthPage = lazy(() => import('./users/containers/AuthenticationPage/AuthPage'));
const About = lazy(() => import('./users/containers/About/About'));
const Terms = lazy(() => import('./users/containers/Terms/Terms'));
const Support = lazy(() => import('./users/containers/Support/Support'));
const Cart = lazy(() => import('./users/containers/Cart/Cart'));
const Checkout = lazy(() => import('./users/containers/Checkout/Checkout'));
const Contact = lazy(() => import('./users/containers/Contact/Contact'));
const StoreLocator = lazy(() => import('./users/containers/Storelocator/Storelocator'));
const PageNotFound = lazy(() => import('./users/containers/404/404'));
const AccountActivation = lazy(() => import('./users/containers/AuthenticationPage/AccountActivation/AccountActivation'));

// admin routes
const AdminDashboard = lazy(() => import('./admin/containers/AdminDashboard/AdminDashboard'));
const AdminProductsPage = lazy(() => import('./admin/containers/AdminProductsPage/AdminProductsPage'));
const AdminAddProduct = lazy(() => import('./admin/containers/AdminAddProduct/AdminAddProduct'));
const AdminViewUser = lazy(() => import('./admin/containers/User/User'));
const AdminAllUsers = lazy(() => import('./admin/containers/User/AllUsers'));
const AdminAddUser = lazy(() => import('./admin/containers/AdminAddUser/AdminAddUser'));
const UpdateUserRole = lazy(() => import('./admin/containers/Role/UpdateRole'));
const AddUserRole = lazy(() => import('./admin/containers/Role/AddRole'));
const AllUserRoles = lazy(() => import('./admin/containers/Role/AllRoles'));
const AddCategory = lazy(() => import('./admin/containers/Category/Category'));
const CategoryIcon = lazy(() => import('./admin/containers/CategoryIcons/CategoryIcon'));
const Brand = lazy(() => import('./admin/containers/Brand/Brand'));

const AllCategories = lazy(() => import('./admin/containers/Category/AllCategories'));
const AllCategoryIcons = lazy(() => import('./admin/containers/CategoryIcons/AllCategoryIcons'));
const AllBrands = lazy(() => import('./admin/containers/Brand/AllBrands'));

// const TableContainer = lazy(() => import('./admin/containers/TableContainer/TableContainer'));

const App = props => {

    const [state, setState] = useState({
        companySocial: [
            {link: '/', icon: 'fab fa-facebook-f'},
            {link: '/', icon: 'fab fa-twitter'},
            {link: '/', icon: 'fab fa-instagram'},
            {link: '/', icon: 'fab fa-pinterest'},
            {link: '/', icon: 'fab fa-dribbble'},
            {link: '/', icon: 'fab fa-google'}
        ],

        companyDetails: {
            phone: '023-123-345',
            address: 'Semira Fraste 5, Sarajevo 7100, BiH'
        },
        show: false
    })

    useEffect(() => {
        checkLoggedInUser();
        setTimeout(() => {
            setState({
                ...state,
                show: !state.show
            });
        },3500);
        // let elements = [5,3,7,13,33,97];
        // // let elements = [10,34,2,4,7,13,5,42];
        // for(let i = 0; i < elements.length - 1; i++) {
        //     let index = i;
        //     for(let j = i + 1; j < elements.length; j++) {
        //         if(elements[j] < elements[index]) {
        //             index = j;
        //         }
        //     }
        //     const smallerNumber = elements[index];
        //     elements[index] = elements[i];
        //     elements[i] = smallerNumber;
        //     console.log(elements);
        //     setTimeout(() => {}, 500);
        // }
    }, []);

    useEffect(() => {
        checkLoggedInUser();
    }, [props.location.pathname]);

    if(props.isAdmin && props.location.pathname.includes('admindashboard')) {
        return (
            <React.Fragment>
                <section className='AdminWrapper' style={state.show ? null : {display: 'none'}}>
                    <AdminNavigation />
                    <div className='main-panel'>
                        <NavBar />
                        <div className="content">
                            <Switch>
                                <Route path='/admindashboard/dashboard' exact  render={(props) => <Suspense fallback={<Spinner />}><AdminDashboard /></Suspense>}/>
                                <Route path='/admindashboard/profile/id=:id' exact render={(props) => <Suspense fallback={<Spinner />}><AdminViewUser profile={true} {...props} /></Suspense>}/>
                                <Route path='/admindashboard/adminViewUser' exact render={(props) => <Suspense fallback={<Spinner />}><AdminViewUser view={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/adminEditUser' exact  render={(props) => <Suspense fallback={<Spinner />}><AdminViewUser edit={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/adminAllUsers' exact  render={(props) => <Suspense fallback={<Spinner />}><AdminAllUsers /></Suspense>}/>

                                <Route path='/admindashboard/products' exact  render={(props) => <Suspense fallback={<Spinner />}><AdminProductsPage /></Suspense>}/>
                                <Route path='/admindashboard/addproduct' exact  render={(props) => <Suspense fallback={<Spinner />}><AdminAddProduct /></Suspense>}/>

                                <Route path='/admindashboard/adduser' exact  render={(props) => <Suspense fallback={<Spinner />}><AdminAddUser /></Suspense>}/>
                                <Route path='/admindashboard/addrole' render={(props) => <Suspense fallback={<Spinner />}><AddUserRole {...props}/></Suspense>}/>
                                <Route path='/admindashboard/updateRole' render={(props) => <Suspense fallback={<Spinner />}><UpdateUserRole {...props}/></Suspense>}/>
                                <Route path='/admindashboard/viewRole' render={(props) => <Suspense fallback={<Spinner />}><UpdateUserRole view={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/allroles' render={(props) => <Suspense fallback={<Spinner />}><AllUserRoles {...props}/></Suspense>}/>

                                <Route path='/admindashboard/addcategory' render={(props) => <Suspense fallback={<Spinner />}><AddCategory addcategory={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/editcategory' render={(props) => <Suspense fallback={<Spinner />}><AddCategory editcategory={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/viewcategory' render={(props) => <Suspense fallback={<Spinner />}><AddCategory viewcategory={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/allcategories' render={(props) => <Suspense fallback={<Spinner />}><AllCategories /></Suspense>}/>

                                <Route path='/admindashboard/addcategoryicon' render={(props) => <Suspense fallback={<Spinner />}><CategoryIcon addicon={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/viewcategoryicon' render={(props) => <Suspense fallback={<Spinner />}><CategoryIcon viewicon={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/editcategoryicon' render={(props) => <Suspense fallback={<Spinner />}><CategoryIcon editicon={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/allcategoryicons' render={(props) => <Suspense fallback={<Spinner />}><AllCategoryIcons /></Suspense>}/>

                                <Route path='/admindashboard/addbrand' render={(props) => <Suspense fallback={<Spinner />}><Brand addbrand={true} {...props} /></Suspense>}/>
                                <Route path='/admindashboard/viewbrand' render={(props) => <Suspense fallback={<Spinner />}><Brand viewbrand={true} {...props} /></Suspense>}/>
                                <Route path='/admindashboard/editbrand' render={(props) => <Suspense fallback={<Spinner />}><Brand editbrand={true} {...props} /></Suspense>}/>
                                <Route path='/admindashboard/allbrands' render={(props) => <Suspense fallback={<Spinner />}><AllBrands /></Suspense>}/>

                                <Route render={() => <Suspense fallback={<Spinner />}><PageNotFound /></Suspense>}/>
                            </Switch>
                            <AdminFooter />
                        </div>
                    </div>
                </section>
                <Spinner show={state.show}/>
            </React.Fragment>
        );
    }else {
        return (
            <React.Fragment>
                <div className='App' style={state.show ? null : {display: 'none'}}>
                    <Navigation icons={state.companySocial}/>
                    <Switch>
                        <Route path='/' exact  render={() => <Suspense fallback={<Spinner />}><Home /></Suspense>}/>
                        <Route path='/product' exact  render={() => <Suspense fallback={<Spinner />}><Product /></Suspense>}/>
                        <Route path='/authentication' exact  render={(props) => <Suspense fallback={<Spinner />}><AuthPage {...props} reset={false}/></Suspense>}/>
                        <Route path='/authentication/reset' exact  render={(props) => <Suspense fallback={<Spinner />}><AuthPage {...props} reset={true}/></Suspense>}/>
                        <Route path='/confirmationaccount' exact  render={(props) => <Suspense fallback={<Spinner />}><AccountActivation {...props} /></Suspense>}/>
                        <Route path='/about' exact  render={() => <Suspense fallback={<Spinner />}><About /></Suspense>}/>
                        <Route path='/terms' exact  render={() => <Suspense fallback={<Spinner />}><Terms /></Suspense>}/>
                        <Route path='/support' exact  render={() => <Suspense fallback={<Spinner />}><Support /></Suspense>}/>
                        <Route path='/cart' exact  render={() => <Suspense fallback={<Spinner />}><Cart /></Suspense>}/>
                        <Route path='/checkout' exact  render={() => <Suspense fallback={<Spinner />}><Checkout /></Suspense>}/>
                        <Route path='/contact' exact  render={() => <Suspense fallback={<Spinner />}><Contact /></Suspense>}/>
                        <Route path='/storelocator' exact  render={() => <Suspense fallback={<Spinner />}><StoreLocator /></Suspense>}/>
                        <Route path='/404' exact  render={() => <Suspense fallback={<Spinner />}><PageNotFound /></Suspense>}/>
                        <Route render={() => <Suspense fallback={<Spinner />}><PageNotFound /></Suspense>}/>
                    </Switch>
                    <Footer 
                        icons={state.companySocial}
                        details={state.companyDetails}/>
                </div>
                <Spinner show={state.show}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAdmin: state.login.User.isAdmin
    }
}

export default withRouter(connect(mapStateToProps)(App));
