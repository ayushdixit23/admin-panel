import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import Buttons from '../Components/Buttons';
import { formatDate } from '../Components/Useful';
import { API } from '@/Essentials';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';

const ProductsModel = ({ id, setOpen, puradata, fetchData, storeData }) => {
	const [loading, setLoading] = useState(false)

	const data = puradata.filter((d) => {
		return d.userid._id === id;
	});

	const handleapprovals = async (e, status, pid) => {
		console.log(pid)
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios.post(`${API}/productApproval/${id}/${pid}`, { status })
			if (res.data.success) {
				toast.success(res.data.message)
				await fetchData()
			} else {
				toast.error(res.data.message)
			}
			console.log(res.data)
			if (data[0]?.products.length === 0 || data[0]?.products.length === 1) {
				setOpen(false)
			} else {
				setOpen(true)
			}
			setLoading(false)
		} catch (error) {
			console.log(error)
		} finally {
			if (data[0]?.products.length === 0 || data[0]?.products.length === 1) {
				setOpen(false)
			} else {
				setOpen(true)
			}
			setLoading(false)
		}
	}

	const handleallapprovals = async (e, status) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios.post(`${API}/allproductApprovals/${id}`, { status })
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
							<div className='font-bold'>Products Approve</div>
						</div>
						<div onClick={() => setOpen(false)}>
							<RxCross2 />
						</div>
					</div>
					<div className='grid mt-3 pn:max-sm:max-h-full sm:grid-cols-2 w-full'>
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
							</div>
						</div>
						<div className='w-full flex flex-col'>
							<div>
								<div className='font-bold  p-5'>Products</div>
								<div className='flex flex-col max-h-[350px] overflow-y-scroll no-scrollbar p-3 gap-5 px-4'>
									{
										data[0]?.products?.map((d, i) => (
											<div key={d?.id} className='flex justify-center gap-4 items-center w-full'>
												<div>
													<img class=" rounded-2xl object-cover" src={d?.dp} alt="Avatar" />
												</div>
												<div className='flex flex-col w-full'>
													<div className=''>{d?.name}</div>
													{/* <Buttons /> */}
													<div className='w-full flex justify-center mt-2 font-bold items-center py-3 gap-3'>
														<button onClick={(e) => handleapprovals(e, "rejected", d?.id)} className='w-full p-2.5 px-4 rounded-xl text-sm bg-[#FF1A1A]'>Decline</button>
														<button onClick={(e) => handleapprovals(e, "approved", d?.id)} className='w-full p-2.5 px-4 rounded-xl text-sm bg-[#009A00]'>Approve</button>
													</div>
												</div>
											</div>
										))
									}
								</div>
								<div className='w-full flex justify-center mt-2 font-bold items-center p-3 gap-3'>
									<button onClick={(e) => handleallapprovals(e, "rejected")} className='w-full p-2.5 px-4 rounded-xl text-sm bg-[#FF1A1A]'>Decline All</button>
									<button onClick={(e) => handleallapprovals(e, "approved")} className='w-full p-2.5 px-4 rounded-xl text-sm bg-[#009A00]'>Approve All</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductsModel