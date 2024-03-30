import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { formatDate } from '../Components/Useful'
import axios from 'axios'
import { ImSpinner9 } from "react-icons/im";
import { API } from '@/Essentials'
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';

const AdsRequest = ({ id, setOpen, puradata, fetchData }) => {
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState(false)
	const [text, setText] = useState("")
	const path = usePathname()
	const router = useRouter()
	console.log(puradata)
	const data = puradata.filter((d) => {
		return d._id === id;
	});

	console.log(data)

	const handleapprovals = async (e, status, text) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios.post(`${API}/approveAds/${id}`, { status, text })
			if (res.data.success) {
				toast.success(res.data.message)
				await fetchData()
			} else {
				toast.error(res.data.message)
			}
			setOpen(false)
			router.push(path)
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
			<div className={`${state ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md" : "hidden -z-50"}`}>
				<div className="flex justify-center items-center w-[90%] pp:w-[65%] sm:max-w-[500px] dark:text-white lg:w-[30%] p-3 rounded-xl h-[250px] dark:bg-[#273142] bg-white">
					<div className="flex flex-col flex-grow gap-3 justify-center items-center w-full">
						<div className="text-2xl font-semibold">Are You Sure?</div>

						<div className='w-full mt-3'>
							<input value={text} onChange={(e) => setText(e.target.value)} className='p-2 bg-transparent w-full border-2 dark:border-white outline-none px-3 rounded-xl' placeholder='Enter Reason for Rejection (Optional)' />
						</div>
						<div className="flex justify-center w-full mt-4 gap-3 items-center">
							<button onClick={() => setState(false)} className="w-full border-2 dark:border-white p-2 px-5 rounded-xl">Cancel</button>
							<button onClick={(e) => { setState(false); handleapprovals(e, "rejected", text) }} className="w-full bg-[#f44336] text-white p-2 px-5 rounded-xl">Reject</button>
						</div>
					</div>

				</div>
			</div>
			<div className='absolute top-0 left-0 md:fixed sm:inset-0 w-screen pn:max-sm:overflow-auto pn:max-sm:no-scrollbar min-h-full sm:h-screen bg-black/60 z-50 sm:bg-black/50 flex justify-center items-center'>
				<div className='md:w-[80%] sm:w-[90%] w-full flex flex-col text-black p-5 rounded-lg dark:text-white dark:bg-[#101010] bg-white'>
					<div className='flex justify-between items-center'>
						<div className='flex gap-2 items-center'>
							<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
							<div className='font-bold'>Ads Request</div>
						</div>
						<div onClick={() => { setOpen(false); router.push(path) }}>
							<RxCross2 />
						</div>
					</div>
					<div className='grid mt-3 grid-cols-1 gap-7 sm:grid-cols-5 w-full'>

						<div class="rounded col-span-2 overflow-hidden shadow-lg">
							<div>{data[0]?.contenttype?.startsWith("image") && <img className=" rounded-lg" src={data[0]?.media} alt="Jese image" />}
								{data[0]?.contenttype?.startsWith("video") && <video controls className=" rounded-lg" src={data[0]?.media} alt="Jese image" />}</div>

							<button className='flex justify-center items-center bg-blue-600 text-white w-full mt-3 p-2 px-3 rounded-xl'><a href={data[0]?.ctalink}>{data[0]?.cta}</a></button>

							<div class="py-4">
								<div class="font-bold text-xl mb-2">{data[0]?.headline}</div>
								<p class="text-gray-700 text-base">
									{data[0]?.desc}
								</p>
							</div>

						</div>
						<div className='col-span-3 flex flex-grow h-full justify-between flex-col gap-5'>
							<div className=' flex flex-col gap-5'>
								<div className='flex items-center gap-2'>
									<img src={data[0]?.userimage} className='w-[50px] rounded-xl object-contain bg-black' />
									<div className='text-lg font-bold'>
										{data[0]?.fullname}
									</div>
								</div>
								<div className='flex sm:flex-row flex-col gap-4 w-full'>
									<div className='w-full flex gap-4  flex-col'>
										<div className='font-semibold flex flex-col gap-1'>
											<div>Adname</div>
											<div>{data[0]?.adname}</div>
										</div>
										<div className='font-semibold flex flex-col gap-1'>
											<div>Targeted Location</div>
											<div>{data[0]?.goal}</div>
										</div>
										<div className='font-semibold flex flex-col gap-1'>
											<div>Type</div>
											<div>{data[0]?.type}</div>
										</div>
										<div className='font-semibold flex flex-col gap-1'>
											<div>Selected Audience</div>
											<div>{data[0]?.gender}</div>
										</div>

									</div>
									<div className='w-full flex gap-4  flex-col'>
										<div className='font-semibold flex flex-col gap-1'>
											<div>Tags</div>
											<div>{data[0]?.tags}</div>
										</div>

										<div className='font-semibold flex flex-col gap-1'>
											<div>Category</div>
											<div>{data[0]?.category}</div>
										</div>
										<div className='font-semibold flex flex-col gap-1'>

											<div>Total Budget</div>
											<div>{data[0]?.totalbudget}</div>
										</div>
										<div className='flex items-center gap-5'>
											<div className='font-semibold flex flex-col gap-1'>
												<div>Start Date</div>
												<div>{data[0]?.startdate}</div>
											</div>
											<div className='font-semibold flex flex-col gap-1'>
												<div>End Date</div>
												<div>{data[0]?.enddate}</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='w-full flex justify-center mt-2 font-bold items-center py-3 gap-3'>
								<button onClick={() => setState(true)} className='w-full p-3 px-4 rounded-xl bg-[#FF1A1A]'>Decline</button>
								<button onClick={(e) => handleapprovals(e, "approved")} className='w-full p-3 px-4 rounded-xl bg-[#009A00]'>Approve</button>
							</div>
						</div>
					</div>
				</div>
			</div >
		</>
	)
}

export default AdsRequest