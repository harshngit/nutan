import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	SAVE_SHIPPING_INFO,
	REMOVE_CART,
	UPDATE_CART_QUANTITY,
} from "@/constants/cartConstant";

export const addToCart = (product) => ({
	type: ADD_TO_CART,
	payload: product,
});

export const removeCartItem = (productId) => ({
	type: REMOVE_CART_ITEM,
	payload: productId,
});

export const saveShippingInfo = (data) => ({
	type: SAVE_SHIPPING_INFO,
	payload: data,
});

export const updateCartQuantity = (productId, size, color, quantity) => ({
	type: UPDATE_CART_QUANTITY,
	payload: { productId, size, color, quantity },
});

export const removeCart = () => ({
	type: REMOVE_CART,
});