import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { formatDate } from '../Components/Useful'
import axios from 'axios'
import { ImSpinner9 } from "react-icons/im";
import { API } from '@/Essentials'
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';

const Monetization = ({ id, setOpen, puradata, fetchData }) => {
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState(false)
	const [text, setText] = useState("")
	const path = usePathname()
	const router = useRouter()
	const data = puradata.filter((d) => {
		return d.id === id;
	});

	const handleapprovals = async (e, status, text) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios.post(`${API}/requests/${id}`, { status, text })
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
			<div className={` fixed inset-0 w-screen pn:max-sm:overflow-auto pn:max-sm:no-scrollbar min-h-full sm:h-screen bg-black/60 ${state ? "z-30" : "z-50 "}sm:bg-black/50 container flex justify-center items-center`} >
				<div className='lg:w-[30%] sm:w-[55%] pp:w-[75%] pn:max-pp:w-[335px] flex flex-col text-black p-5 rounded-lg dark:text-white dark:bg-[#101010] bg-white'>
					<div className='flex justify-between items-center'>
						<div className='flex gap-2 items-center'>
							<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
							<div className='font-bold'>Monetization Request</div>
						</div>
						<div onClick={() => { setOpen(false); router.push(path) }}>
							<RxCross2 />
						</div>
					</div>
					<div className='grid mt-3 grid-cols-1 w-full'>
						<div className='flex flex-col bg-[#181818]/50 rounded-lg p-3'>
							<div>
								<div class="flex items-center p-2">

									<div class="relative">
										<img class="h-16 w-16 rounded-full object-cover" src={data[0]?.profilepic} alt="Avatar" />
										<div class="absolute inset-0 rounded-full shadow-inner"></div>
									</div>
									<div class="ml-2 flex flex-col gap-[2px]">
										<h2 class="font-bold text-lg">{data[0]?.fullname}</h2>
										<p class=" text-xs">@{data[0]?.username}</p>
										<p class=" text-xs">userid-{id}</p>
									</div>
								</div>
							</div>
							<div className='text-xs mt-2 p-2'>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Request Send</div>
									<div>{formatDate(data[0]?.requested)}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Joined on</div>
									<div>{formatDate(data[0]?.createdAt)}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Community </div>
									<div>{data[0]?.title}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Community ID </div>
									<div>{id}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Members</div>
									<div>{data[0]?.members}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Total posts</div>
									<div>{data[0]?.posts}</div>
								</div>
								<div className='flex justify-between py-4 border-b text-xs items-center w-full'>
									<div>Poularity </div>
									<div>{data[0]?.engagement}</div>
								</div>
								{/* <Buttons /> */}
								{/* onClick={(e) => handleapprovals(e, "rejected")} */}
								<div className='w-full flex justify-center mt-2 font-bold items-center py-3 gap-3'>
									<button onClick={() => setState(true)} className='w-full p-3 px-4 rounded-xl bg-[#FF1A1A]'>Decline</button>
									<button onClick={(e) => handleapprovals(e, "approved")} className='w-full p-3 px-4 rounded-xl bg-[#009A00]'>Approve</button>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div >
		</>
	)
}

export default Monetization