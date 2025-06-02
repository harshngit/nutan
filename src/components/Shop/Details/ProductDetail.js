import React from 'react'
import LightBox from './LightBox'
import Details from './Details'

const ProductDetail = () => {
	return (
		<div className='px-5 py-5 '>
			<div className='grid lg:grid-cols-2 grid-cols-1'>
				{/* lightbox */}
				<div>
					<LightBox />
				</div>
				<div>
					<Details />
				</div>
			</div>
		</div>
	)
}

export default ProductDetail