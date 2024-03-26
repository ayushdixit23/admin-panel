import React from 'react'

const Buttons = () => {
	return (
		<div className='w-full flex justify-center mt-2 font-bold items-center py-3 gap-3'>
			<button className='w-full p-3 px-4 rounded-xl bg-[#FF1A1A]'>Decline</button>
			<button className='w-full p-3 px-4 rounded-xl bg-[#009A00]'>Approve</button>
		</div>
	)
}

export default Buttons