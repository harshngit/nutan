import { createSlice } from '@reduxjs/toolkit';
import {
	loginUsingEmail,
	registerUser,
	logout,
	loadUser,
	loginWithGoogle,
} from '../actions/authActions';

const initialState = {
	users: null,
	userProfile: null,
	loading: false,
	isAuthenticated: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearErrors: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUsingEmail.pending, (state) => {
				state.loading = true;
				state.isAuthenticated = false;
			})
			.addCase(loginUsingEmail.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuthenticated = true;
				state.users = action.payload;
			})
			.addCase(loginUsingEmail.rejected, (state, action) => {
				state.loading = false;
				state.isAuthenticated = false;
				state.users = null;
				state.error = action.payload;
			})

			.addCase(registerUser.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.users = action.payload;
				state.loading = false;
			})

			.addCase(loadUser.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.userProfile = action.payload;
				state.loading = false;
			})

			.addCase(logout.fulfilled, (state) => {
				state.users = null;
				state.userProfile = null;
				state.isAuthenticated = false;
				state.loading = false;
				state.error = null;
			});
	},
});

export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;