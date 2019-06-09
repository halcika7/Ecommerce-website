export { login, setCurrentUser, logoutUser } from "./auth/login";
export {
  register,
  activateAccount,
  resendActivationLink
} from "./auth/register";

export { resetUserPasswordEmail } from "./auth/resetPasswordEmail";

export {
  resetPassword,
  resetState,
  updatePassword
} from "./auth/resetpassword";

export {
  getAllUsers,
  getSingleUser,
  deleteUser,
  addNewUser,
  updateUser,
  userUpdateProfilePicture,
  getLoggedInUserPhoto
} from "./auth/user";

export {
  addNewPermission,
  getAllPermissions,
  getAllModelNames,
  deleteManyPermissions,
  deletePermission
} from "./roles&permissions/permissions";

export {
  addRole,
  getRoles,
  deleteUserRole,
  getUserRole,
  deleteManyUserRoles,
  updateUserRole
} from "./roles&permissions/userRoles";

export {
  addCategory,
  getAllCategories,
  getCategory,
  editCategory,
  deleteCategory,
  deleteManyCategories,
  clearState
} from "./products/category";

export {
  addCategoryIcon,
  getAllCategoryIcons,
  getCategoryIcon,
  editCategoryIcon,
  deleteCategoryIcon,
  deleteManyCategoryIcons,
  clearStateIcons
} from "./products/categoryicon";

export {
  addBrand,
  getAllBrands,
  getBrand,
  getBrandByCategory,
  editBrand,
  deleteBrand,
  deleteManyBrands,
  clearBrandState
} from "./products/brand";

export {
  addProduct,
  homePageProducts,
  getBannerProducts,
  getProduct,
  getAllProducts,
  deleteProduct,
  getNewProducts,
  searchProducts,
  clearSingleProduct
} from "./products/product";

export {
  getFilters,
  filterProducts
} from "./products/filterproducts";

export {
  addReview,
  editReview,
  deleteReview,
  updateAddReview,
  updateEditReview,
  updateDeleteReview,
  addReply,
  editReply,
  deleteReply,
  updateAddReply,
  updateDeleteReply,
  getReviews,
  clearReviews
} from "./products/productreview";

export {
  addAnswer,
  deleteAnswer,
  getAnswer,
  updateAnswer,
  getAllAnswers
} from "./answers/answers";

export {
  addTerm,
  deleteTerm,
  getTerm,
  updateTerm,
  getAllTerms
} from "./answers/terms";

export {
  addToCart,
  moveToSaveForLater,
  moveToCart,
  deleteFromCart,
  deleteFromSavedForLater,
  updateCartItem,
  setCart,
  applyCoupon,
  removeCoupon,
  processPayment
} from "./cart/cart";

export {
  addCoupon,
  deleteCoupon,
  getCoupons
} from "./cart/coupon";

export {
  addStore,
  deleteStore,
  updateStore,
  getStore,
  getStoreContact,
  getStoresFront,
  getStores
} from "./stores/stores";

export {
  getAllUserOrders,
  getAllOrders,
  getOrder,
  deleteOrder,
  deleteUserOrder,
  updateOrder
} from "./orders/orders";

export {
  getDashboard
} from "./dashboard/dashboard";
