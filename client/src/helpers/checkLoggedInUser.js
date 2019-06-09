import jwt_decode from 'jwt-decode';
import { store } from '../store/store';
import * as actions from '../store/actions';

export const checkLoggedInUser = callBack => {
	if (localStorage.jwtToken) {
		const decoded = jwt_decode(localStorage.jwtToken);
		store.dispatch(actions.setCurrentUser(decoded));
		store.dispatch(actions.getLoggedInUserPhoto(decoded.id));
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			store.dispatch(actions.logoutUser(callBack));
		}
	}
};

export const clearResetState = () => {
	store.dispatch(actions.resetState());
};

export const checkCart = () => {
	store.dispatch(actions.setCart());
};
