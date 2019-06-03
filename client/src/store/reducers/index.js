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
import cartReducer from "./cart/cart";
import couponReducer from "./cart/coupon";

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
  cart: cartReducer,
  coupon: couponReducer
});
