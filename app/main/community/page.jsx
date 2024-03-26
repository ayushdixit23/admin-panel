"use client"
import React, { Suspense } from 'react'
import { ImSpinner9 } from 'react-icons/im'
import dynamic from 'next/dynamic'
const Community = dynamic(() => import("./Community"), { ssr: false })

const page = () => {
	return (

		<Suspense fallback={<div className='fixed inset-0 flex justify-center items-center w-screen h-screen bg-black/50'>
			<div className='animate-spin flex justify-center items-center'>
				<ImSpinner9 />
			</div>
		</div>}>
			<Community />
		</Suspense>
	)
}

export default page