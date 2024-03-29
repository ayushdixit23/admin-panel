"use client"
import { API } from '@/Essentials'
import Pagination from '@/app/Components/Pagination'
import AdsFetch from '@/app/FetchComponents/AdsFetch'
import CommunityFetch from '@/app/FetchComponents/Community'
import AdsRequest from '@/app/Modals/ads'
import Monetization from '@/app/Modals/monteziation'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
	const search = useSearchParams()
	const mid = search.get("id")
	const [open, setOpen] = useState(false)
	const [data, setData] = useState([])
	const [client, setClient] = useState(false)

	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(6);
	const lastindex = currentPage * postPerPage;
	const firstIndex = lastindex - postPerPage;
	const postperData = data?.slice(firstIndex, lastindex);

	const fetchData = async () => {
		try {
			const res = await axios.get(`${API}/v1/fetchads`)
			console.log(res.data)
			setData(res.data.adswithmedia)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchData()
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
				<AdsRequest id={mid} setOpen={setOpen} fetchData={fetchData} puradata={data} />
			}
			<div className='px-4'>
				<div className='text-2xl  font-bold text-[#C2B1FF] py-4'>Ads</div>
				<div className='p-3'>
					<div className='dark:bg-[#101010] bg-[#fafafa] rounded-xl p-3'>
						<div className='flex gap-2  items-center'>
							<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
							<div className='font-bold py-2 text-lg'>Ads Request </div>
						</div>
						<div className='w-full mt-3 overflow-x-scroll no-scrollbar'>

							<AdsFetch data={postperData} setOpen={setOpen} />
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
				</div>
			</div>
		</>
	)
}

export default page