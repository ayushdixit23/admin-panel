import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { formatDate } from '../Components/Useful'
import axios from 'axios'
import { ImSpinner9 } from "react-icons/im";
import { API } from '@/Essentials'
import toast from 'react-hot-toast';

const Monetization = ({ id, setOpen, puradata, fetchData }) => {
	const [loading, setLoading] = useState(false)

	const data = puradata.filter((d) => {
		return d.id === id;
	});

	const handleapprovals = async (e, status) => {
		e.preventDefault()
		try {
			setLoading(true)
			const res = await axios.post(`${API}/requests/${id}`, { status })
			if (res.data.success) {
				toast.success(res.data.message)
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

		<div className='fixed inset-0 w-screen h-screen flex justify-center items-center bg-black/50 '>
			<div className='lg:w-[30%] sm:w-[55%] pp:w-[75%] pn:max-pp:w-[335px] flex flex-col text-black p-5 rounded-lg dark:text-white dark:bg-[#101010] bg-white'>
				<div className='flex justify-between items-center'>
					<div className='flex gap-2 items-center'>
						<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
						<div className='font-bold'>Monetization Request</div>
					</div>
					<div onClick={() => setOpen(false)}>
						<RxCross2 />
					</div>
				</div>
				<div className='grid mt-3 grid-cols-1 w-full'>
					<div className='flex flex-col bg-[#181818]/50 rounded-lg p-3'>
						<div>
							<div class="flex items-center p-2">
								<div class="relative">
									<img class="h-16 w-16 rounded-full object-cover" src={data[0]?.proficpic} alt="Avatar" />
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
							<div className='w-full flex justify-center mt-2 font-bold items-center py-3 gap-3'>
								<button onClick={(e) => handleapprovals(e, "rejected")} className='w-full p-3 px-4 rounded-xl bg-[#FF1A1A]'>Decline</button>
								<button onClick={(e) => handleapprovals(e, "approved")} className='w-full p-3 px-4 rounded-xl bg-[#009A00]'>Approve</button>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Monetization