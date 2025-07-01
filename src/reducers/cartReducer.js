import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	SAVE_SHIPPING_INFO,
	REMOVE_CART,
	UPDATE_CART_QUANTITY,
	APPLY_COUPON,
} from "@/constants/cartConstant";

// ✅ Load from localStorage initially (only on client)
const isBrowser = typeof window !== "undefined";

const initialState = {
	cartItems: isBrowser ? JSON.parse(localStorage.getItem("cartItems") || "[]") : [],
	shippingInfo: isBrowser ? JSON.parse(localStorage.getItem("shippingInfo") || "{}") : {},
};

export const cartReducer = (state = initialState, action) => {
	let updatedCart;
	switch (action.type) {
		case "ADD_TO_CART": {
			const item = action.payload;
			const existItem = state.cartItems.find(i => i.product === item.product && i.size === item.size && i.color === item.color);

			if (existItem) {
				updatedCart = state.cartItems.map(i =>
					i.product === existItem.product && i.size === item.size && i.color === item.color ? item : i
				);
			} else {
				updatedCart = [...state.cartItems, item];
			}

			if (isBrowser) {
				localStorage.setItem("cartItems", JSON.stringify(updatedCart));
			}

			return {
				...state,
				 cartItems: [...state.cartItems, action.payload],
			};
		}

		case REMOVE_CART_ITEM: {
			updatedCart = state.cartItems.filter(i => i.product !== action.payload);
			if (isBrowser) {
				localStorage.setItem("cartItems", JSON.stringify(updatedCart));
			}
			return {
				...state,
				cartItems: updatedCart,
			};
		}

		case SAVE_SHIPPING_INFO: {
			if (isBrowser) {
				localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
			}
			return {
				...state,
				shippingInfo: action.payload,
			};
		}
		case UPDATE_CART_QUANTITY: {
			const updatedItems = state.cartItems.map((item) =>
				item.product === action.payload.productId &&
					item.size === action.payload.size &&
					item.color === action.payload.color
					? { ...item, quantity: action.payload.quantity }
					: item
			);

			if (typeof window !== "undefined") {
				localStorage.setItem("cartItems", JSON.stringify(updatedItems));
			}

			return {
				...state,
				cartItems: updatedItems,
			};
		}

		case APPLY_COUPON:
			return {
				...state,
				cartItems: action.payload,
			};

		case REMOVE_CART:
			if (isBrowser) {
				localStorage.removeItem("cartItems");
				localStorage.removeItem("shippingInfo");
			}
			return {
				...state,
				cartItems: [],
				shippingInfo: {},
			};

		default:
			return state;
	}
};