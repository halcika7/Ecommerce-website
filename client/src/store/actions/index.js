export {
    login,
    setCurrentUser,
    logoutUser,
    userUpdateProfilePicture
} from './auth/login';
export {
    register,
    activateAccount,
    resendActivationLink
} from './auth/register';

export {
    resetUserPasswordEmail
} from './auth/resetPasswordEmail';

export {
    resetPassword,
    resetState,
    updatePassword
} from './auth/resetpassword';

export {
    getAllUsers,
    getSingleUser,
    deleteUser,
    getLoggedInUserPhoto
} from './auth/getUsers';

export { 
    addNewPermission,
    getAllPermissions,
    deletePermission
 } from './auth/permissions';

export {
    addRole,
    getRoles,
    deleteUserRole,
    getUserRole,
    updateUserRole
} from './roles/userRoles';

export {
    addNewUser,
    updateUser
} from './auth/addNewUser';

export { 
    addCategory,
    getAllCategories,
    getCategory,
    editCategory,
    deleteCategory,
    clearState
 } from './products/category';

 export { 
     addCategoryIcon,
     getAllCategoryIcons,
     getCategoryIcon,
     editCategoryIcon,
     deleteCategoryIcon,
     clearStateIcons
  } from './products/categoryicon';