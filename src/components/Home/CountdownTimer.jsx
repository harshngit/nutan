'use client';
import React from 'react';
import Countdown from 'react-countdown';

const CountdownTimer = () => {
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + 4); // 4 days from now

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			return <span className="text-red-500 text-xl font-semibold">Deal Ended!</span>;
		} else {
			const timeUnits = [
				{ label: 'Days', value: days },
				{ label: 'Hr', value: hours },
				{ label: 'Mins', value: minutes },
				{ label: 'Sec', value: seconds },
			];

			return (
				<div className="flex gap-4">
					{timeUnits.map((unit, index) => (
						<div key={index} className="flex flex-col items-center gap-2">
							<div className="bg-[#E7E6E2] text-black text-3xl font-mono px-4 py-3 rounded-lg shadow-lg text-center lg:w-[79px] lg:h-[79px] w-[70px] lg:text-[40px] text-[30px] flex justify-center items-center">
								{String(unit.value).padStart(2, '0')}
							</div>
							<div className="text-sm text-[#484848] mt-1 lg:text-[24px] text-[20px] font-normal">{unit.label}</div>
						</div>
					))}
				</div>
			);
		}
	};

	return <Countdown date={endDate} renderer={renderer} />;
};

export default CountdownTimer;
