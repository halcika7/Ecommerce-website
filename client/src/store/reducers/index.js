import { combineReducers } from "redux";
import loginReducer from "./auth/login";
import registerReducer from "./auth/register";
import resetPasswordReducer from "./auth/resetpassword";
import resetPasswordEmailReducer from "./auth/resetPasswordEmail";
import getUserReducer from "./auth/user";
import permissionsReducer from "./roles&permissions/permissions";
import userRolesReducer from "./roles&permissions/userRoles";
import categoryReducer from "./products/category";
import categoryIconReducer from "./products/categoryicon";
import brandReducer from "./products/brand";
import productReducer from "./products/product";
import filterProductReducer from "./products/filterproducts";
import productReviewReducer from "./products/productreview";
import answerReducer from "./answers/answers";
import termReducer from "./answers/terms";
import cartReducer from "./cart/cart";
import couponReducer from "./cart/coupon";
import storeReducer from "./stores/stores";

export const combinedReducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
  resetEmail: resetPasswordEmailReducer,
  resetPassword: resetPasswordReducer,
  user: getUserReducer,
  permissions: permissionsReducer,
  roles: userRolesReducer,
  category: categoryReducer,
  categoryIcon: categoryIconReducer,
  brand: brandReducer,
  product: productReducer,
  filteredProducts: filterProductReducer,
  reviews: productReviewReducer,
  answers: answerReducer,
  terms: termReducer,
  cart: cartReducer,
  coupon: couponReducer,
  stores: storeReducer,
});
