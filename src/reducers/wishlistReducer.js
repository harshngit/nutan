// reducers/wishlistReducer.js
import {
	WISHLIST_TOGGLE_ITEM,
	WISHLIST_LOAD_FROM_STORAGE,
} from "@/constants/wishlistConstant";

const initialState = {
	wishlist: {},
};

export const wishlistReducer = (state = initialState, action) => {
	switch (action.type) {
		case WISHLIST_TOGGLE_ITEM:
		case WISHLIST_LOAD_FROM_STORAGE:
			return {
				...state,
				wishlist: action.payload,
			};
		default:
			return state;
	}
};