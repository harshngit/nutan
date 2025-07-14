// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer'; // ✅ FIXED path
import { cartReducer } from '@/reducers/cartReducer';
import { orderReducer } from '@/reducers/orderReducer';
import { wishlistReducer } from '@/reducers/wishlistReducer';



export const store = configureStore({
	reducer: {
		user: authReducer,
		cart: cartReducer,
		order: orderReducer,
		wishlist: wishlistReducer,


	},
});