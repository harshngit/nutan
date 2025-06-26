import {
	PLACE_ORDER_START,
	PLACE_ORDER_SUCCESS,
	PLACE_ORDER_FAIL,
	CLEAR_ORDER,
	FETCH_ORDER_START,
	FETCH_ORDER_SUCCESS,
	FETCH_ORDER_FAIL,
} from "@/constants/orderConstant";

const isBrowser = typeof window !== "undefined";

const initialState = {
	orderDetails: isBrowser
		? JSON.parse(localStorage.getItem("orderDetails") || "null")
		: null,
	loading: false,
	error: null,
};

export const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case PLACE_ORDER_START:
		case FETCH_ORDER_START:
			return {
				...state,
				loading: true,
				error: null,
			};

		case PLACE_ORDER_SUCCESS:
		case FETCH_ORDER_SUCCESS:
			if (isBrowser) {
				localStorage.setItem("orderDetails", JSON.stringify(action.payload));
			}

			return {
				...state,
				loading: false,
				orderDetails: action.payload,
				error: null,
			};

		case PLACE_ORDER_FAIL:
		case FETCH_ORDER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case CLEAR_ORDER:
			if (isBrowser) {
				localStorage.removeItem("orderDetails");
			}
			return {
				...state,
				loading: false,
				orderDetails: null,
				error: null,
			};

		default:
			return state;
	}
};