"use client"
import { API } from '@/Essentials'
import Pagination from '@/app/Components/Pagination'
import CommunityFetch from '@/app/FetchComponents/Community'
import LatestCommunity from '@/app/FetchComponents/LatestCommunity'
import Monetization from '@/app/Modals/monteziation'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
	const search = useSearchParams()
	const mid = search.get("id")
	const [open, setOpen] = useState(false)
	const [data, setData] = useState([])
	const [client, setClient] = useState(false)
	const [comData, setComData] = useState([])
	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(6);
	const lastindex = currentPage * postPerPage;
	const firstIndex = lastindex - postPerPage;
	const comperData = comData?.slice(firstIndex, lastindex);
	const postperData = data?.slice(firstIndex, lastindex);

	const fetchData = async () => {
		try {
			const res = await axios.get(`${API}/v1/getCommunitiesforMon`)
			console.log(res.data)
			setData(res.data.community)
		} catch (error) {
			console.log(error)
		}
	}


	const fetchCommunityData = async () => {
		try {
			const res = await axios.get(`${API}/v1/latestCommunities`)
			console.log(res.data)
			setComData(res.data.communityData)
		} catch (error) {
			console.log(error)
		}
	}

	console.log(comData, "communi")

	useEffect(() => {
		fetchData()
		fetchCommunityData()
	}, [])

	useEffect(() => {
		setClient(true)
	}, [])

	if (!client) {
		return null
	}

	return (
		<>
			{open &&
				<Monetization id={mid} setOpen={setOpen} fetchData={fetchData} puradata={data} />
			}
			<div className='px-4'>
				<div className='text-2xl  font-bold text-[#C2B1FF] py-4'>Communities</div>
				<div className='p-3'>

					<div className='dark:bg-[#101010] bg-[#fafafa] rounded-xl p-3'>
						<div className='flex gap-2  items-center'>
							<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
							<div className='font-bold py-2 text-lg'>Latest Communities</div>
						</div>
						<div className='w-full mt-3 overflow-x-scroll no-scrollbar'>

							<LatestCommunity data={comperData} setOpen={setOpen} />
							{comData?.length > postPerPage && <Pagination
								postPerPage={postPerPage}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								firstIndex={firstIndex}
								lastindex={lastindex}
								length={comData.length}
							/>
							}
						</div>
					</div>

					<div className='dark:bg-[#101010] mt-4 bg-[#fafafa] rounded-xl p-3'>
						<div className='flex gap-2  items-center'>
							<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
							<div className='font-bold py-2 text-lg'>Monetization request</div>
						</div>
						<div className='w-full mt-3 overflow-x-scroll no-scrollbar'>

							<CommunityFetch data={postperData} setOpen={setOpen} />
							{data?.length > postPerPage && <Pagination
								postPerPage={postPerPage}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								firstIndex={firstIndex}
								lastindex={lastindex}
								length={data.length}
							/>
							}
						</div>
					</div>

					{/* <div className='dark:bg-[#101010] mt-4 bg-[#fafafa] rounded-xl p-3'>
						<div className='flex gap-2 items-center'>
							<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
							<div className='font-bold py-2 text-lg'>Reports</div>
						</div>
						<div className='w-full mt-3 overflow-x-scroll no-scrollbar'>

							<CommunityFetch data={postperData} setOpen={setOpen} />
							{data?.length > postPerPage && <Pagination
								postPerPage={postPerPage}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								firstIndex={firstIndex}
								lastindex={lastindex}
								length={data.length}
							/>
							}
						</div>
					</div> */}

				</div>
			</div>
		</>
	)
}

export default page