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
  checkProductName,
  addProduct
} from "./products/product";
