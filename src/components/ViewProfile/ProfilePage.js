"use client"

import { logout } from '@/actions/authActions';
import Link from 'next/link';
import React from 'react'
import { FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const ProfilePage = () => {
	const { userProfile } = useSelector(state => state.user)
	const menuItems = [
		{
			name: "My Purchases",
			link: "/orders", // Update with actual path if needed
		},
		{
			name: "My Details",
			link: "/accountDetails", // fixed spelling
		},
		{
			name: "Wishlist",
			link: "/wishlist",
		}
	];

	const dispatch = useDispatch()
	const handleLogout = async () => {
		try {
			await dispatch(logout()).unwrap();
			router.push("/");
			toast.success("Logout Successfull")
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};
	return (
		<div className="w-full max-w-md mx-auto p-6">
			<div>
				<h2 className='text-[40px] my-[20px]'>
					{userProfile?.displayName}
				</h2>
			</div>
			<ul className="space-y-5">
				{menuItems.map((item, idx) => (
					<li key={idx} className="flex justify-between items-center text-sm font-medium text-black hover:opacity-70 cursor-pointer">
						<Link href={item.link} className="flex justify-between w-full items-center">
							<span className="uppercase">{item.name}</span>
							<FiArrowRight className="text-lg" />
						</Link>
					</li>
				))}
			</ul>

			<div className="mt-12">
				<button
					onClick={handleLogout}
					className="text-sm hover:underline text-black hover:text-gray-800"
				>
					Sign out
				</button>
			</div>
		</div>
	)
}

export default ProfilePage