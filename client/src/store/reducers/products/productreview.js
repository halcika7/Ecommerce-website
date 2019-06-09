import * as actionTypes from '../../actions/actionTypes';
import { updateObject } from '../../../helpers/updateObject';

const initialState = {
	productReviews: [],
	productRatings: [],
	successMessage: false,
	successMessageAddReview: false,
	failedMessage: false,
	failedMessageAddReview: false,
	loading: false
};

const reducer = (state = initialState, action) => {
	let newProductReviews = [...state.productReviews];

	if (action.updateAddReply) {
		const findIndex = newProductReviews.findIndex(
			review => review._id === action.updateAddReply.reviewId
		);
		newProductReviews[findIndex].replys.push(action.updateAddReply.findReview);
	}

	if (action.updateAddReview) {
		newProductReviews = [...state.productReviews, action.updateAddReview];
	}

	if (action.updateDeleteReview) {
		const findIndex = newProductReviews.findIndex(
			review => review._id === action.updateDeleteReview
		);
		newProductReviews.splice(findIndex, 1);
	}

	if (action.updateEditReview) {
		const findIndex = newProductReviews.findIndex(
			review => review._id === action.updateEditReview._id
		);
		if (findIndex !== -1) {
			newProductReviews[findIndex] = { ...action.updateEditReview };
		}
	}

	if (action.updateDeleteReply) {
		const findIndex = newProductReviews.findIndex(
			review => review._id === action.updateDeleteReply.parentId
		);
		const findReplyIndex = newProductReviews[findIndex].replys.findIndex(
			reply => reply.reviewId._id === action.updateDeleteReply.id
		);
		if (findIndex !== -1 && findReplyIndex !== -1) {
			newProductReviews[findIndex].replys.splice(findReplyIndex, 1);
		}
	}

	const actions = {
		[actionTypes.REVIEW_START]: updateObject(state, {
			loading: true,
			successMessage: false,
			successMessageAddReview: false,
			failedMessage: false,
			failedMessageAddReview: false
		}),
		[actionTypes.REVIEW_FAILED]: updateObject(state, {
			failedMessage: action.failedMessage
				? action.failedMessage
				: state.failedMessage,
			failedMessageAddReview: action.failedMessageAddReview
				? action.failedMessageAddReview
				: state.failedMessageAddReview,
			loading: action.loading ? action.loading : false
		}),
		[actionTypes.REVIEW_SUCCESS]: updateObject(state, {
			productReviews: action.productReviews
				? action.productReviews
				: newProductReviews,
			productRatings: action.productRatings
				? action.productRatings
				: state.productRatings,
			successMessage: action.successMessage
				? action.successMessage
				: state.successMessage,
			successMessageAddReview: action.successMessageAddReview
				? action.successMessageAddReview
				: state.successMessageAddReview,
			loading: action.loading ? action.loading : false
		}),
		default: state
	};

	return actions[action.type] || actions.default;
};

export default reducer;
