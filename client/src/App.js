import React, { lazy, Suspense, useState, useEffect } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { checkLoggedInUser, checkCart } from "./helpers/checkLoggedInUser";
import { connect } from "react-redux";

import "./App.css";
import Navigation from "./users/components/Navigation/Navigation";
import Footer from "./users/components/Footer/Footer";
import Spinner from "./users/components/UI/Spinner/Spinner";
import AdminNavigation from "./admin/components/Navigation/Navigation";
import NavBar from "./admin/components/NavBar/Navbar";
import AdminFooter from "./admin/components/Footer/Footer";
import SmallSpinner from "./users/components/UI/SmallSpinner/SmallSpinner";

const Home = lazy(() => import("./users/containers/Home/Home"));
const Product = lazy(() => import("./users/containers/Product/Product"));
const Products = lazy(() => import("./users/containers/Products/Products"));
const AuthPage = lazy(() => import("./users/containers/AuthenticationPage/AuthPage"));
const About = lazy(() => import("./users/containers/About/About"));
const Terms = lazy(() => import("./users/containers/Terms/Terms"));
const Support = lazy(() => import("./users/containers/Support/Support"));
const Cart = lazy(() => import("./users/containers/Cart/Cart"));
const Checkout = lazy(() => import("./users/containers/Checkout/Checkout"));
const Contact = lazy(() => import("./users/containers/Contact/Contact"));
const StoreLocator = lazy(() =>import("./users/containers/Storelocator/Storelocator"));
const PageNotFound = lazy(() => import("./users/containers/404/404"));
const AccountActivation = lazy(() => import("./users/containers/AuthenticationPage/AccountActivation/AccountActivation"));
// admin routes
const Dashboard = lazy(() => import("./admin/containers/Dashboard/Dashboard"));
const AddProduct = lazy(() => import("./admin/containers/AddProduct/AddProduct") );
const ViewUser = lazy(() => import("./admin/containers/User/User"));
const AddUser = lazy(() => import("./admin/containers/AddUser/AddUser"));
const UpdateRole = lazy(() => import("./admin/containers/Role/UpdateRole"));
const AddRole = lazy(() => import("./admin/containers/Role/AddRole"));
const AddCategory = lazy(() => import("./admin/containers/Category/Category"));
const CategoryIcon = lazy(() => import("./admin/containers/CategoryIcons/CategoryIcon") );
const Brand = lazy(() => import("./admin/containers/Brand/Brand"));
const Permission = lazy(() => import("./admin/containers/Permission/Permission") );
const AnswersToQuestions = lazy(() => import('./admin/containers/AnswersToQuestions/AnswersToQuestions'));
const TermBack = lazy(() => import('./admin/containers/Terms/Terms'));
const AddCoupon = lazy(() => import('./admin/containers/Coupons/AddCoupon'));
const Store = lazy(() => import('./admin/containers/Store/Store'));

const TableContainer = lazy(() => import("./admin/containers/TableContainer/TableContainer") );

const App = props => {
  const [state, setState] = useState({
    companySocial: [
      { link: "/", icon: "fab fa-facebook-f" },
      { link: "/", icon: "fab fa-twitter" },
      { link: "/", icon: "fab fa-instagram" },
      { link: "/", icon: "fab fa-pinterest" },
      { link: "/", icon: "fab fa-dribbble" },
      { link: "/", icon: "fab fa-google" }
    ],

    companyDetails: {
      phone: "023-123-345",
      address: "Semira Fraste 5, Sarajevo 7100, BiH"
    },
    show: false
  });

  useEffect(() => {
    storageChanged();
    setTimeout(() => { setState({ ...state, show: !state.show}); }, 2000);
    window.addEventListener('storage', storageChanged)
    return () => setState({ ...state, show: false });
  }, []);

  useEffect(() => { storageChanged(); }, [props]);

  const storageChanged = () => {
    checkLoggedInUser(props.history.push);
    checkCart();
  }

  if (props.isAdmin && props.location.pathname.includes("admindashboard")) {
    return (
      <React.Fragment>
        <section className="AdminWrapper" style={state.show ? null : { display: "none" }} >
          <AdminNavigation />
          <div className="main-panel">
            <NavBar />
            <div className="content">
              <Switch>
                <Route path="/admindashboard/dashboard" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <Dashboard />
                    </Suspense>
                  )}
                />
                {/* user */}
                <Route path="/admindashboard/profile" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <ViewUser profile={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/add-user" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <AddUser />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/view-user" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <ViewUser view={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/edit-user" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <ViewUser edit={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/all-users" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Users={true} />
                    </Suspense>
                  )}
                />
                {/* products */}
                <Route path="/admindashboard/all-products" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Products={true} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/add-product" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <AddProduct />
                    </Suspense>
                  )}
                />
                {/* permissions */}
                <Route path="/admindashboard/add-permission" exact render={props => (
                    <Suspense fallback={<div className="bg-white"><SmallSpinner /></div>}>
                      <Permission {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/all-permissions" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Permissions={true} />
                    </Suspense>
                  )}
                />
                {/* roles */}
                <Route path="/admindashboard/add-role" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <AddRole {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/edit-role" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <UpdateRole {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/view-role" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <UpdateRole view={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/all-roles" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Roles={true} />
                    </Suspense>
                  )}
                />
                {/* category icons */}
                <Route path="/admindashboard/add-category" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <AddCategory addcategory={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/edit-category" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <AddCategory editcategory={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/view-category" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <AddCategory viewcategory={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/all-categories" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Categories={true} />
                    </Suspense>
                  )}
                />
                {/* Category Icon */}
                <Route path="/admindashboard/add-category-icon" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <CategoryIcon addicon={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/view-category-icon" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <CategoryIcon viewicon={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/edit-category-icon" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <CategoryIcon editicon={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/all-category-icons" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Icons={true} />
                    </Suspense>
                  )}
                />
                {/* Brand */}
                <Route path="/admindashboard/add-brand" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <Brand addbrand={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/view-brand" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <Brand viewbrand={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/edit-brand" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <Brand editbrand={true} {...props} />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/all-brands" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Brands={true} />
                    </Suspense>
                  )}
                />
                {/* Answers */}
                <Route path="/admindashboard/add-answer" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <AnswersToQuestions addanswer={true} {...props}/>
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/view-answer" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <AnswersToQuestions view={true} {...props}/>
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/edit-answer" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <AnswersToQuestions edit={true} {...props}/>
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/all-answers" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Answers={true} />
                    </Suspense>
                  )}
                />
                {/* Terms */}
                <Route path="/admindashboard/add-term" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TermBack addterm={true} {...props}/>
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/view-term" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TermBack view={true} {...props}/>
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/edit-term" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TermBack edit={true} {...props}/>
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/all-terms" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Terms={true} />
                    </Suspense>
                  )}
                />
                {/* Coupons */}
                <Route path="/admindashboard/add-coupon" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <AddCoupon />
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/all-coupons" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Coupons={true} />
                    </Suspense>
                  )}
                />
                {/* Stores */}
                <Route path="/admindashboard/add-store" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <Store addstore={true} {...props}/>
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/view-store" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <Store view={true} {...props}/>
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/edit-store" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <Store edit={true} {...props}/>
                    </Suspense>
                  )}
                />
                <Route path="/admindashboard/all-stores" exact render={props => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <TableContainer Stores={true} />
                    </Suspense>
                  )}
                />
                <Route render={() => (
                    <Suspense fallback={<div className="Card bg-white"><SmallSpinner /></div>}>
                      <PageNotFound />
                    </Suspense>
                  )}
                />
              </Switch>
              <AdminFooter />
            </div>
          </div>
        </section>
        <Spinner show={state.show} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="App" style={state.show ? null : { display: "none" }}>
          <Navigation icons={state.companySocial} {...props}/>
          <Switch>
            <Route path="/" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <Home />
                </Suspense>
              )}
            />
            <Route path="/product" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <Product {...props} show={state.show}/>
                </Suspense>
              )}
            />
            <Route path="/products" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <Products {...props} show={state.show}/>
                </Suspense>
              )}
            />
            <Route path="/authentication" exact render={props => (
                <Suspense fallback={<Spinner />}>
                  <AuthPage {...props} reset={false} />
                </Suspense>
              )}
            />
            <Route path="/authentication/reset" exact render={props => (
                <Suspense fallback={<Spinner />}>
                  <AuthPage {...props} reset={true} />
                </Suspense>
              )}
            />
            <Route path="/confirmationaccount" exact render={props => (
                <Suspense fallback={<Spinner />}>
                  <AccountActivation {...props} />
                </Suspense>
              )}
            />
            <Route path="/about" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <About />
                </Suspense>
              )}
            />
            <Route path="/terms" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <Terms />
                </Suspense>
              )}
            />
            <Route path="/support" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <Support />
                </Suspense>
              )}
            />
            <Route path="/cart" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <Cart />
                </Suspense>
              )}
            />
            <Route path="/checkout" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <Checkout />
                </Suspense>
              )}
            />
            <Route path="/contact" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <Contact />
                </Suspense>
              )}
            />
            <Route path="/storelocator" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <StoreLocator />
                </Suspense>
              )}
            />
            <Route path="/404" exact render={() => (
                <Suspense fallback={<Spinner />}>
                  <PageNotFound />
                </Suspense>
              )}
            />
            <Route render={() => (
                <Suspense fallback={<Spinner />}>
                  <PageNotFound />
                </Suspense>
              )}
            />
          </Switch>
          <Footer icons={state.companySocial} details={state.companyDetails} />
        </div>
        <Spinner show={state.show} />
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAdmin: state.login.User.role.isAdmin
  };
};

export default withRouter(connect(mapStateToProps)(App));
