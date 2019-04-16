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
const Dashboard = lazy(() => import('./admin/containers/Dashboard/Dashboard'));
const ProductsPage = lazy(() => import('./admin/containers/AdminProductsPage/AdminProductsPage'));
const AddProduct = lazy(() => import('./admin/containers/AddProduct/AddProduct'));
const ViewUser = lazy(() => import('./admin/containers/User/User'));
const AddUser = lazy(() => import('./admin/containers/AddUser/AddUser'));
const UpdateUserRole = lazy(() => import('./admin/containers/Role/UpdateRole'));
const AddUserRole = lazy(() => import('./admin/containers/Role/AddRole'));
const AllUserRoles = lazy(() => import('./admin/containers/Role/AllRoles'));
const AddCategory = lazy(() => import('./admin/containers/Category/Category'));
const CategoryIcon = lazy(() => import('./admin/containers/CategoryIcons/CategoryIcon'));
const Brand = lazy(() => import('./admin/containers/Brand/Brand'));

// const AdminAllUsers = lazy(() => import('./admin/containers/User/AllUsers'));
// const AllCategories = lazy(() => import('./admin/containers/Category/AllCategories'));
// const AllCategoryIcons = lazy(() => import('./admin/containers/CategoryIcons/AllCategoryIcons'));
// const AllBrands = lazy(() => import('./admin/containers/Brand/AllBrands'));

const TableContainer = lazy(() => import('./admin/containers/TableContainer/TableContainer'));

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
                                <Route path='/admindashboard/dashboard' exact  render={(props) => <Suspense fallback={<Spinner />}><Dashboard /></Suspense>}/>
                                <Route path='/admindashboard/profile' exact render={(props) => <Suspense fallback={<Spinner />}><ViewUser profile={true} {...props} /></Suspense>}/>
                                <Route path='/admindashboard/view-user' exact render={(props) => <Suspense fallback={<Spinner />}><ViewUser view={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/edit-user' exact  render={(props) => <Suspense fallback={<Spinner />}><ViewUser edit={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/all-users' exact  render={(props) => <Suspense fallback={<Spinner />}><TableContainer Users={true} /></Suspense>}/>

                                <Route path='/admindashboard/products' exact  render={(props) => <Suspense fallback={<Spinner />}><ProductsPage /></Suspense>}/>
                                <Route path='/admindashboard/add-product' exact  render={(props) => <Suspense fallback={<Spinner />}><AddProduct /></Suspense>}/>

                                <Route path='/admindashboard/add-user' exact  render={(props) => <Suspense fallback={<Spinner />}><AddUser /></Suspense>}/>
                                <Route path='/admindashboard/add-role' exact render={(props) => <Suspense fallback={<Spinner />}><AddUserRole {...props}/></Suspense>}/>
                                <Route path='/admindashboard/update-role' exact render={(props) => <Suspense fallback={<Spinner />}><UpdateUserRole {...props}/></Suspense>}/>
                                <Route path='/admindashboard/view-role' exact render={(props) => <Suspense fallback={<Spinner />}><UpdateUserRole view={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/all-roles' exact render={(props) => <Suspense fallback={<Spinner />}><AllUserRoles {...props}/></Suspense>}/>

                                <Route path='/admindashboard/add-category' exact render={(props) => <Suspense fallback={<Spinner />}><AddCategory addcategory={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/edit-category' exact render={(props) => <Suspense fallback={<Spinner />}><AddCategory editcategory={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/view-category' exact render={(props) => <Suspense fallback={<Spinner />}><AddCategory viewcategory={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/all-categories' exact render={(props) => <Suspense fallback={<Spinner />}><TableContainer Categories={true} /></Suspense>}/>

                                <Route path='/admindashboard/add-category-icon' exact render={(props) => <Suspense fallback={<Spinner />}><CategoryIcon addicon={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/view-category-icon' exact render={(props) => <Suspense fallback={<Spinner />}><CategoryIcon viewicon={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/edit-category-icon' exact render={(props) => <Suspense fallback={<Spinner />}><CategoryIcon editicon={true} {...props}/></Suspense>}/>
                                <Route path='/admindashboard/all-category-icons' exact render={(props) => <Suspense fallback={<Spinner />}><TableContainer Icons={true } /></Suspense>}/>

                                <Route path='/admindashboard/add-brand' exact render={(props) => <Suspense fallback={<Spinner />}><Brand addbrand={true} {...props} /></Suspense>}/>
                                <Route path='/admindashboard/view-brand' exact render={(props) => <Suspense fallback={<Spinner />}><Brand viewbrand={true} {...props} /></Suspense>}/>
                                <Route path='/admindashboard/edit-brand' exact render={(props) => <Suspense fallback={<Spinner />}><Brand editbrand={true} {...props} /></Suspense>}/>
                                <Route path='/admindashboard/all-brands' exact render={(props) => <Suspense fallback={<Spinner />}><TableContainer Brands={true}  /></Suspense>}/>

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
