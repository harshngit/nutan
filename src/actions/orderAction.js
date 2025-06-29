import {
	PLACE_ORDER_START,
	PLACE_ORDER_SUCCESS,
	PLACE_ORDER_FAIL,
	CLEAR_ORDER,
} from "@/constants/orderConstant";

import {
	FETCH_ORDER_START,
	FETCH_ORDER_SUCCESS,
	FETCH_ORDER_FAIL,
} from "@/constants/orderConstant";



import { doc, setDoc, Timestamp, collection } from "firebase/firestore";
import { REMOVE_CART } from "@/constants/cartConstant";
import { db } from "@/app/firebase.config";

export const placeOrder = (formData, cartItems, userProfile, totalAmount, router) => async (dispatch) => {
	dispatch({ type: PLACE_ORDER_START });
	try {
		const orderID = `${Date.now().toString().slice(2, 11)}`;
		const orderRef = doc(collection(db, "Order"), orderID);

		const payload = {
			OrderID: orderID,
			createdAt: Timestamp.now(),
			uid: userProfile?.uid || "",
			customerName: userProfile?.name || "",
			email: userProfile?.email || "",
			phone: formData.phone || "",
			status: "unfulfilled",
			orderStatus: "New",
			customerName: `${formData.firstName} ${formData.lastName}`.trim(),
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
		router.push("/");
		router.push("/orderConfirmation");
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
			dispatch({ type: FETCH_ORDER_SUCCESS, payload: orderSnap.data() });
		} else {
			dispatch({ type: FETCH_ORDER_FAIL, payload: "Order not found" });
		}
	} catch (error) {
		dispatch({ type: FETCH_ORDER_FAIL, payload: error.message });
	}
};