// src/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';
import {
	LOGIN_REQUEST,
	REGISTER_USER_REQUEST,
	REGISTER_USER_FAIL,
	REGISTER_USER_SUCCESS,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_FAIL,
	LOGOUT_SUCCESS,
	CLEAR_ERRORS,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	GOOGLE_REQUEST,
	GOOGLE_SUCCESS,
	GOOGLE_FAIL,
} from "../constants/userConstant";

const initialState = {
	users: {},
	userProfile: {},
	loading: false,
	isAuthenticated: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		[CLEAR_ERRORS]: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(LOGIN_REQUEST, (state) => {
				state.loading = true;
				state.isAuthenticated = false;
			})
			.addCase(REGISTER_USER_REQUEST, (state) => {
				state.loading = true;
				state.isAuthenticated = false;
			})
			.addCase(GOOGLE_REQUEST, (state) => {
				state.loading = true;
				state.isAuthenticated = false;
			})
			.addCase(LOAD_USER_REQUEST, (state) => {
				state.loading = true;
				state.isAuthenticated = true;
			})
			.addCase(LOAD_USER_SUCCESS, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.userProfile = action.payload;
			})
			.addCase(LOGIN_SUCCESS, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.users = action.payload;
			})
			.addCase(REGISTER_USER_SUCCESS, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.users = action.payload;
			})
			.addCase(GOOGLE_SUCCESS, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.users = action.payload;
			})
			.addCase(LOGOUT_SUCCESS, (state) => {
				state.loading = false;
				state.users = null;
				state.isAuthenticated = false;
			})
			.addCase(LOGIN_FAIL, (state, action) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.users = null;
				state.error = action.payload;
			})
			.addCase(REGISTER_USER_FAIL, (state, action) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.users = null;
				state.error = action.payload;
			})
			.addCase(GOOGLE_FAIL, (state, action) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.users = null;
				state.error = action.payload;
			})
			.addCase(LOAD_USER_FAIL, (state, action) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.userProfile = null;
				state.error = action.payload;
			})
			.addCase(LOGOUT_FAIL, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.user = null;
			});
	},
});

export const { [CLEAR_ERRORS]: clearErrors } = authSlice.actions;
export default authSlice.reducer;