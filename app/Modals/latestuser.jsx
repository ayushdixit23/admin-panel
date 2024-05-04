

// import React, { useState } from 'react'
// import { RxCross2 } from 'react-icons/rx'
// import { formatDate } from '../Components/Useful'
// import axios from 'axios'
// import { ImSpinner9 } from "react-icons/im";
// import { API } from '@/Essentials'
// import toast from 'react-hot-toast';
// import { usePathname, useRouter } from 'next/navigation';

// const LatestUserModel = ({ id, setOpen, url, puradata, fetchData }) => {
// 	const [loading, setLoading] = useState(false)
// 	const [state, setState] = useState(false)
// 	const [text, setText] = useState("")
// 	const path = usePathname()
// 	const router = useRouter()
// 	console.log(puradata)
// 	const data = puradata.filter((d) => {
// 		return d._id === id;
// 	});

// 	console.log(data[0]?.media)

// 	const handleapprovals = async (e, status, text) => {
// 		e.preventDefault()
// 		try {
// 			setLoading(true)
// 			const res = await axios.post(`${API}/approveAds/${id}`, { status, text })
// 			if (res.data.success) {
// 				toast.success(res.data.message)
// 				await fetchData()
// 			} else {
// 				toast.error(res.data.message)
// 			}
// 			setOpen(false)
// 			router.push(path)
// 			setLoading(false)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setOpen(false)
// 			setLoading(false)
// 		}
// 	}

// 	if (loading) {
// 		return <div className='fixed inset-0 flex justify-center items-center w-screen h-screen bg-black/50'>
// 			<div className='animate-spin flex justify-center items-center'>
// 				<ImSpinner9 />
// 			</div>
// 		</div>
// 	}

// 	return (
// 		<>

// 			<div className='absolute top-0 left-0 md:fixed sm:inset-0 w-screen pn:max-sm:overflow-auto pn:max-sm:no-scrollbar min-h-full sm:h-screen bg-black/60 z-50 sm:bg-black/50 flex justify-center items-center'>
// 				<div className='md:w-[80%] sm:w-[90%] w-full flex flex-col text-black p-5 rounded-lg dark:text-white dark:bg-[#101010] bg-white'>
// 					<div className='flex justify-between items-center'>
// 						<div className='flex gap-2 items-center'>
// 							<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
// 							<div className='font-bold'>Ads Request</div>
// 						</div>
// 						<div onClick={() => { setOpen(false); router.push(path) }}>
// 							<RxCross2 />
// 						</div>
// 					</div>
// 					<div className='grid mt-3 grid-cols-1 gap-7 sm:grid-cols-5 w-full'>

// 						<div class="rounded col-span-2 overflow-hidden shadow-lg">
// 							{console.log(url + data[0]?.doc)}
// 							<div> <img className="min-w-[300px] min-h-[300px] rounded-lg" src={url + data[0]?.doc} alt="Jese image" />
// 							</div>



// 							<div class="py-4">
// 								<div class="font-bold text-xl mb-2">{data[0]?.headline}</div>
// 								<p class="text-gray-700 text-base">
// 									{data[0]?.desc}
// 								</p>
// 							</div>

// 						</div>
// 						<div className='col-span-3 flex flex-grow h-full justify-between flex-col gap-5'>
// 							<div className=' flex flex-col gap-5'>
// 								<div className='flex items-center gap-2'>
// 									<img src={data[0]?.userimage} className='w-[50px] rounded-xl object-contain bg-black' />
// 									<div className='text-lg font-bold'>
// 										{data[0]?.fullname}
// 									</div>
// 								</div>
// 								<div className='flex sm:flex-row flex-col gap-4 w-full'>
// 									<div className='w-full flex gap-4  flex-col'>
// 										<div className='font-semibold flex flex-col gap-1'>
// 											<div>Name</div>
// 											<div>{data[0]?.name}</div>
// 										</div>
// 										<div className='font-semibold flex flex-col gap-1'>
// 											<div>Email</div>
// 											<div>{data[0]?.email}</div>
// 										</div>
// 										<div className='font-semibold flex flex-col gap-1'>
// 											<div>Phone</div>
// 											<div>{data[0]?.phone}</div>
// 										</div>


// 									</div>
// 									<div className='w-full flex gap-4  flex-col'>
// 										<div className='font-semibold flex flex-col gap-1'>
// 											<div>Batch</div>
// 											<div>{data[0]?.batch}</div>
// 										</div>
// 										<div className='font-semibold flex flex-col gap-1'>
// 											<div>Job Application</div>
// 											<div>{data[0]?.job}</div>
// 										</div>
// 										<div className='font-semibold flex flex-col gap-1'>
// 											<div>Message</div>
// 											<div>{data[0]?.message}</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 							{/* <div className='w-full flex justify-center mt-2 font-bold items-center py-3 gap-3'>
// 								<button onClick={() => setState(true)} className='w-full p-3 px-4 rounded-xl bg-[#FF1A1A]'>Decline</button>
// 								<button onClick={(e) => handleapprovals(e, "approved")} className='w-full p-3 px-4 rounded-xl bg-[#009A00]'>Approve</button>
// 							</div> */}
// 						</div>
// 					</div>
// 				</div>
// 			</div >
// 		</>
// 	)
// }

// export default LatestUserModel