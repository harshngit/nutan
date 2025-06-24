// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer'; // ✅ FIXED path

export const store = configureStore({
	reducer: {
		user: authReducer,
	},
});