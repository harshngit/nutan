import Link from 'next/link'
import React from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

const Account = ({ accountDetails, deleteUserAccount }) => {
	return (
		<div className="max-w-xl mx-auto py-10 px-4">
			<div className='flex justify-start items-center'>
				<Link href={"/viewProfile"}>
					<FiArrowLeft className="text-lg" />
				</Link>
			</div>
			<div className='flex flex-col justify-center items-center'>
				<h2 className=" text-lg font-semibold mb-8">MY DETAILS</h2>
			</div>

			<ul className="space-y-6">
				{[
					{ label: "Name", value: accountDetails?.name },
					{ label: "E-mail", value: accountDetails?.email },
					{ label: "Mobile", value: accountDetails?.contact }
				].map((item, index) => (
					<li key={index} className="flex justify-between items-start">
						<div>
							<p className="text-xs uppercase font-semibold text-black mb-1">
								{item.label}
							</p>
							<p className="text-sm text-black">{item.value}</p>
						</div>
						{/* <button className="text-sm hover:underline text-black hover:text-gray-800">
							Edit
						</button> */}
					</li>
				))}
			</ul>

			<div className="mt-10">
				<button onClick={() => deleteUserAccount()} className="text-sm text-[#000] hover:underline">
					Delete account
				</button>
			</div>
		</div>
	)
}

export default Account