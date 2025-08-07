"use client"

import Account from '@/components/AccountDetails/Account'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'
import React, { useEffect, useState } from 'react'
import { db } from '@/app/firebase.config'
import { useDispatch, useSelector } from 'react-redux'
import { doc, onSnapshot } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { logout } from '@/actions/authActions'
import NavbarOne from '@/components/Layout/NavbarOne'

const AccountDetails = () => {

	const [accountDetails, setAccountDetails] = useState({});
	const { userProfile } = useSelector((state) => state.user);
	const dispatch = useDispatch()

	const deleteUserAccount = async () => {
		try {
			if (!userProfile?.uid) {
				console.warn("No user UID available for deletion.");
				return;
			}

			await deleteDoc(doc(db, "users", userProfile.uid));
			toast.success("User account deleted successfully.");
			setAccountDetails({}); // Clear local state if needed
			dispatch(logout()).unwrap();
		} catch (error) {
			console.error("Error deleting user account:", error);
		}
	};

	useEffect(() => {
		if (!userProfile?.uid) return;

		const unsubscribe = onSnapshot(doc(db, "users", userProfile.uid), (docSnap) => {
			if (docSnap.exists()) {
				setAccountDetails(docSnap.data());
			} else {
				console.warn("User document not found");
			}
		}, (error) => {
			console.error("Error fetching user data:", error);
		});

		return () => unsubscribe(); // Cleanup on unmount
	}, [userProfile?.uid]);

	console.log("Account Details:", accountDetails);


	return (
		<div className="font-poppins">
			<NavbarOne />
			<section className="relative pt-[130px] pb-[50px]">
				<Account accountDetails={accountDetails} deleteUserAccount={deleteUserAccount} />
			</section>

			<Footer />
		</div>
	)
}

export default AccountDetails