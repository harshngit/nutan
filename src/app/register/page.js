"use client"

import RegisterForm from '@/components/Register/RegisterForm'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { auth, db } from '../firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
	const router = useRouter();

	// Form States
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [contact, setContact] = useState("")

	// Register function
	const handleCreateUser = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				await setDoc(doc(db, "users", user.uid), {
					name,
					email,
					password,
					contact,
					role: "Customer",
					service: "Nutan",
					uid: user.uid,
				})
				router.push("/login")
			}).catch((err) => {
				console.log(err)
			})
	}

	return (
		<div className="relative w-full h-screen xl:h-screen lg:h-screen flex justify-center items-center overflow-hidden">
			{/* Blurred Background Layer */}
			<div
				className="absolute inset-0 bg-cover bg-no-repeat bg-center blur-sm scale-110"
				style={{ backgroundImage: "url('/asset/Shop/5.webp')" }}
			></div>

			{/* Foreground Content */}
			<div className="relative w-[100%] z-10">
				<RegisterForm 
					name={name} setName={setName}
					email={email} setEmail={setEmail}
					password={password} setPassword={setPassword}
					contact={contact} setContact={setContact}
					handleCreateUser={handleCreateUser}
				/>
			</div>
		</div>
	)
}

export default Register
