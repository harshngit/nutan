// src/store/LoadUser.js
"use client";

import { loadUser } from "@/actions/authActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadWishlistFromStorage } from "@/actions/wishlistActions";



const LoadUser = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, [dispatch]);

	return null;
};

export default LoadUser;