import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { formatDate } from '../Components/Useful';
import { ImSpinner9 } from 'react-icons/im';
import toast from 'react-hot-toast';
import { API } from '@/Essentials';
import axios from 'axios';

const StoreModel = ({ id, setOpen, puradata, fetchData, storeData }) => {

	const [loading, setLoading] = useState(false)

	const data = puradata?.filter((d) => {
		return d.userid._id === id;
	});

	const handleapprovals = async (e, status) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios.post(`${API}/approveStoreofUser/${id}`, { status })
			if (res.data.success) {
				toast.success(res.data.message)
				if (storeData) {
					await storeData()
				}
				await fetchData()
			} else {
				toast.error(res.data.message)
			}
			console.log(res.data)
			setOpen(false)
			setLoading(false)
		} catch (error) {
			console.log(error)
		} finally {
			setOpen(false)
			setLoading(false)
		}
	}

	if (loading) {
		return <div className='fixed inset-0 flex justify-center items-center w-screen h-screen bg-black/50'>
			<div className='animate-spin flex justify-center items-center'>
				<ImSpinner9 />
			</div>
		</div>
	}


	return (
		<>
			<div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-black/50 '>
				<div className='md:w-[70%] sm:max-md:min-w-[750px] flex flex-col text-black p-5 rounded-lg dark:text-white dark:bg-[#101010] bg-white'>
					<div className='flex justify-between items-center'>
						<div className='flex gap-2 items-center'>
							<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
							<div className='font-bold'>Store request</div>
						</div>
						<div onClick={() => setOpen(false)}>
							<RxCross2 />
						</div>
					</div>
					<div className='grid mt-3 pn:max-pp:w-[335px] pp:min-w-[450px] sm:grid-cols-2 w-full'>
						<div className='flex flex-col  bg-[#181818]/50 rounded-lg p-3'>
							<div>
								<div class="flex items-center">
									<div class="relative">
										<img class="h-16 w-16 rounded-full object-cover" src={data[0]?.pic} alt="Avatar" />
										<div class="absolute inset-0 rounded-full shadow-inner"></div>
									</div>
									<div class="ml-2">
										<h2 class="font-bold ">{data[0]?.fullname}</h2>
										<p class=" text-xs">@{data[0]?.username}</p>
										<p class=" text-xs">userid-{data[0]?.userid._id}</p>
									</div>
								</div>
							</div>
							<div className='text-xs mt-4'>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Request Send</div>
									<div>{formatDate(data[0]?.createdAt)}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Address</div>
									<div>{data[0]?.address.buildingno}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Pincode</div>
									<div>{data[0]?.address.postal}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>City / state</div>
									<div>{data[0]?.address.city} / {data[0]?.address.state}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Aadhaar number</div>
									<div>{data[0]?.address?.documenttype}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Gst </div>
									<div>{data[0]?.address.gst}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Communities</div>
									<div>{data[0]?.communities}</div>
								</div>
								{/* <div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Total members</div>
									<div>Aug 20, 2021</div>
								</div> */}
								{/* <Buttons /> */}
								<div className='w-full flex justify-center mt-2 font-bold items-center py-3 gap-3'>
									<button onClick={(e) => handleapprovals(e, "rejected")} className='w-full p-3 px-4 rounded-xl bg-[#FF1A1A]'>Decline</button>
									<button onClick={(e) => handleapprovals(e, "approved")} className='w-full p-3 px-4 rounded-xl bg-[#009A00]'>Approve</button>
								</div>
							</div>
						</div>
						<div className='max-w-full h-full flex justify-center items-center p-3'>
							<img src={data[0]?.address.documentfile} alt='image' className='w-full h-full object-contain bg-black rounded-lg' />
							{/* <img src={data[0]?.documentphoto} alt='image' /> */}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default StoreModel