import React from 'react';
import Lottie from 'lottie-react';
import cappingLoader from '../../../public/asset/loader/capping.json'; // Update with your path

const LoadingScreen = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-white text-black">
			<div className="w-[500px] h-[500px] mb-4">
				<Lottie animationData={cappingLoader} loop={true} />
			</div>
			{/* <p className="text-lg font-medium tracking-wide"></p> */}
		</div>
	);
};

export default LoadingScreen;