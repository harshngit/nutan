import {
	PLACE_ORDER_START,
	PLACE_ORDER_SUCCESS,
	PLACE_ORDER_FAIL,
	CLEAR_ORDER,
	FETCH_ORDER_START,
	FETCH_ORDER_SUCCESS,
	FETCH_ORDER_FAIL,
} from "@/constants/orderConstant";

import { doc, setDoc, Timestamp, collection, getDoc } from "firebase/firestore";
import { REMOVE_CART } from "@/constants/cartConstant";
import { db } from "@/app/firebase.config";

export const placeOrder = (formData, cartItems, userProfile, totalAmount, router) => async (dispatch) => {
	dispatch({ type: PLACE_ORDER_START });
	try {
		const orderID = `${Date.now().toString().slice(2, 11)}`;
		const orderRef = doc(collection(db, "Order"), orderID);

		const payload = {
			OrderID: orderID,
			createdAt: Timestamp.now().toMillis(), // Convert to milliseconds
			uid: userProfile?.uid || "",
			customerName: `${formData.firstName} ${formData.lastName}`.trim(),
			email: userProfile?.email || formData.email || "",
			phone: formData.phone || "",
			status: "unfulfilled",
			orderStatus: "New",
			dimensions: cartItems.map((item) => ({
				p_name: item.name,
				p_price: item.price,
				p_qty: item.quantity,
				p_size: item.size,
				p_color: item.color,
				p_img: item.image,
			})),
			dropoff_location: {
				address: formData.address,
				city: formData.city,
				region: formData.state,
				zip: formData.pincode,
				phone: formData.phone,
			},
			invoices: [
				{
					ident: orderID,
					ewaybill: "",
					n_value: totalAmount,
				},
			],
		};

		await setDoc(orderRef, payload);

		dispatch({ type: PLACE_ORDER_SUCCESS, payload });
		dispatch({ type: REMOVE_CART }); // clear cart
		router.push(`/orderConfirmation?orderID=${orderID}`);
	} catch (error) {
		dispatch({ type: PLACE_ORDER_FAIL, payload: error.message });
	}
};

export const fetchOrderDetails = (orderID) => async (dispatch) => {
	dispatch({ type: FETCH_ORDER_START });

	try {
		const orderRef = doc(db, "Order", orderID);
		const orderSnap = await getDoc(orderRef);

		if (orderSnap.exists()) {
			const orderData = orderSnap.data();

			// Convert Timestamp to milliseconds if present
			if (orderData.createdAt?.toMillis) {
				orderData.createdAt = orderData.createdAt.toMillis();
			}

			dispatch({ type: FETCH_ORDER_SUCCESS, payload: orderData });
		} else {
			dispatch({ type: FETCH_ORDER_FAIL, payload: "Order not found" });
		}
	} catch (error) {
		dispatch({ type: FETCH_ORDER_FAIL, payload: error.message });
	}
};
