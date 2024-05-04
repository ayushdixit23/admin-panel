"use client"
import { API } from '@/Essentials'
import Pagination from '@/app/Components/Pagination'
import { formatDate } from '@/app/Components/Useful'
import Latestuser from '@/app/FetchComponents/Latestuser'
import LatestUserModel from '@/app/Modals/latestuser'
import Monetization from '@/app/Modals/monteziation'
import ProductsModel from '@/app/Modals/products'
import StoreModel from '@/app/Modals/store'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = () => {
	const [switcher, setSwitcher] = useState(1)
	const search = useSearchParams()
	const mid = search.get("id")
	const [open, setOpen] = useState(false)
	const [client, setClient] = useState(false)
	const [open1, setOpen1] = useState(false)
	const [data, setData] = useState({
		store: [],
		product: [],
		community: [],
		latestUsers: []
	})

	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(7);
	const lastindex = currentPage * postPerPage;
	const firstIndex = lastindex - postPerPage;
	const postperData = data.latestUsers?.slice(firstIndex, lastindex);


	const [count, setCount] = useState({
		totalUser: "", totalCommunities: "", activeuser: "", order: ""
	})
	const [open2, setOpen2] = useState(false)

	const fetchData = async () => {
		try {
			const res = await axios.get(`${API}/dashboard`)
			if (res.data.success) {
				setData({
					...data, store: res.data.store, community: res.data.community, product: res.data.product, latestUsers: res.data.data
				})
			} else {
				toast.error("error in fetching")
			}
		} catch (error) {
			console.log(error)
		}
	}

	const storeData = async () => {
		try {
			const res = await axios.get(`${API}/v1/storecount`)
			if (res.data.success) {
				setCount({
					...count, totalUser: res.data.totaluser, totalCommunities: res.data.community, activeuser: res.data.activeuser,
					order: res.data.order
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		setClient(true)
	}, [])

	useEffect(() => {
		fetchData()
		storeData()
	}, [])

	if (!client) {
		return null
	}


	return (
		<>
			{open1 &&
				<ProductsModel id={mid} setOpen={setOpen1} puradata={data.product} fetchData={fetchData} />
			}
			{open2 &&
				<Monetization id={mid} setOpen={setOpen2} puradata={data.community} fetchData={fetchData} />
			}
			{open &&
				<StoreModel id={mid} setOpen={setOpen} puradata={data.store} fetchData={fetchData} />
			}

			<div className='flex flex-col mt-2 p-3 py-6 w-full'>
				<div>
					<div className='mt-2 mb-4'>
						<div className='text-2xl font-bold text-[#C2B1FF]'>Dashboard</div>
					</div>
					<div className='grid pp:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-10'>
						<div className='flex flex-col gap-3 text-2xl rounded-xl border border-[#5b5858] font-semibold px-7 py-9'>
							<div>Total User</div>
							<div>{count.totalUser}</div>
						</div>
						<div className='flex flex-col gap-3 text-2xl rounded-xl border border-[#5b5858] font-semibold px-7 py-9'>
							<div>Communities</div>
							<div>{count.totalCommunities}</div>
						</div>
						<div className='flex flex-col gap-3 text-2xl rounded-xl border border-[#5b5858] font-semibold px-7 py-9'>
							<div>Active users</div>
							<div>{count.activeuser}</div>
						</div>
						<div className='flex flex-col gap-3 text-2xl rounded-xl border border-[#5b5858] font-semibold px-7 py-9'>
							<div>Orders</div>
							<div>{count.order}</div>
						</div>
					</div>
				</div>

				<div className='mt-4 dark:bg-[#101010] light:text-black rounded-xl p-4'>
					<div className='flex gap-2 items-center'>
						<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
						<div className='font-bold text-lg'>Latest Users</div>
					</div>
					<div className='mt-4'>
						<div className='overflow-auto no-scrollbar'>
							<Latestuser data={postperData} />
							{data.latestUsers?.length > postPerPage && <Pagination
								postPerPage={postPerPage}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								firstIndex={firstIndex}
								lastindex={lastindex}
								length={data.latestUsers.length}
							/>
							}
						</div>
					</div>
				</div>

				<div className='mt-4 dark:bg-[#101010] p-4'>
					<div className='flex gap-2 items-center'>
						<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
						<div className='font-bold text-lg'>New Requests</div>
					</div>
					<div className='w-full flex pp:flex-row flex-col items-center mt-2 gap-4'>
						<div onClick={() => setSwitcher(1)} className={`${switcher == 1 ? "bg-[#4495FF] text-white" : "border-[#E0E3E5] border"} dark:text-white pn:max-pp:w-full font-bold text-sm p-2 px-5 rounded-xl`}>Store verification</div>
						<div onClick={() => setSwitcher(2)} className={`${switcher == 2 ? "bg-[#4495FF] text-white" : "border-[#E0E3E5] border"} dark:text-white  pn:max-pp:w-full font-bold text-sm p-2 px-5 rounded-xl`}>Product Verification</div>
						<div onClick={() => setSwitcher(3)} className={`${switcher == 3 ? "bg-[#4495FF] text-white" : "border-[#E0E3E5] border"} dark:text-white  pn:max-pp:w-full font-bold text-sm p-2 px-5 rounded-xl`}>Monetization Request</div>
					</div>
					<div className='mt-4'>
						{switcher == 1 && <div className='overflow-x-scroll no-scrollbar'>
							<table className="w-full text-sm text-left min-w-[1100px] rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 bg-[#f1f1f1] uppercase dark:bg-[#0b0808] dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											Userid
										</th>
										<th scope="col" className="px-6 py-3">
											Name
										</th>
										<th scope="col" className="px-6 py-3">
											Location
										</th>
										<th scope="col" className="px-6 py-3">
											Date
										</th>
										<th scope="col" className="px-6 py-3">
											status
										</th>
									</tr>
								</thead>
								{data.store.length > 0 && <tbody>

									{
										data.store.map((d, i) => (
											<tr key={i} className="bg-white border-b dark:bg-[#0D0D0D] dark:border-gray-700 hover:bg-gray-50 ">
												<td className="px-6 py-4">
													{d?.userid._id}
												</td>
												<th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
													<img className="w-10 h-10 rounded-full" src={d?.pic} alt="Jese image" />
													<div className="ps-3">
														<div className="text-base font-semibold">{d?.fullname}</div>
													</div>
												</th>

												<td className="px-6 py-4">
													{d?.address.city}, {d?.address.state}
												</td>
												<td className="px-6 py-4">
													{formatDate(d?.createdAt)}
												</td>
												<td className="px-6 py-4">
													<Link href={`/main/dashboard?id=${d?.userid._id}`} onClick={() => setOpen(true)} className="font-medium bg-[#41A956]/30 p-2 px-5 rounded-3xl text-[#41A956] hover:underline">View</Link>
												</td>
											</tr>
										))
									}

								</tbody>}

								{data.store.length === 0
									&&
									<tr className='w-full light:border-2 light:border-[#f1f1f1]'>
										<td colSpan={5} className=" min-w-full text-2xl font-bold">
											<div className='flex justify-center items-center h-[150px]'>NO DATA FOUND</div>
										</td>
									</tr>
								}
							</table>
						</div>
						}
						{switcher == 2 && <div className='overflow-x-scroll no-scrollbar'>
							<table className="w-full text-sm text-left min-w-[1100px] rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase dark:bg-[#0b0808] dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											Userid
										</th>
										<th scope="col" className="px-6 py-3">
											Name
										</th>
										<th scope="col" className="px-6 py-3">
											Location
										</th>
										<th scope="col" className="px-6 py-3">
											Total Products
										</th>
										<th scope="col" className="px-6 py-3">
											status
										</th>
									</tr>
								</thead>
								{data.product.filter((f) => f?.products?.length != 0).length > 0 && <tbody>

									{data.product.filter((f) => f?.products?.length != 0).map((d, i) => (
										<tr key={i} className="bg-white border-b dark:bg-[#0D0D0D] dark:border-gray-700 hover:bg-gray-50 ">
											<td className="px-6 py-4">
												{d?.userid?._id}
											</td>
											<th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
												<img className="w-10 h-10 rounded-full" src={d?.pic} alt="Jese image" />
												<div className="ps-3">
													<div className="text-base font-semibold">{d?.fullname}</div>
												</div>
											</th>

											<td className="px-6 py-4">
												{d?.address.city}, {d?.address.state}
											</td>
											<td className="px-6 py-4">
												{d?.products.length}
											</td>
											<td className="px-6 py-4">
												<Link href={`/main/dashboard?id=${d?.userid._id}`} onClick={() => setOpen1(true)} className="font-medium bg-[#41A956]/30 p-2 px-5 rounded-3xl text-[#41A956] hover:underline">View</Link>
											</td>
										</tr>
									))}
								</tbody>}

								{data.product.filter((f) => f?.products?.length != 0).length === 0
									&&
									<tr className='w-full'>
										<td colSpan={5} className=" min-w-full text-2xl font-bold">
											<div className='flex justify-center items-center h-[150px]'>NO DATA FOUND</div>
										</td>
									</tr>
								}
							</table>
						</div>
						}
						{switcher == 3 && <div className='overflow-x-scroll no-scrollbar'>
							<table className="w-full text-sm text-left rtl:text-right min-w-[1100px] text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase dark:bg-[#0b0808] dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3 min-w-[200px]">
											Community
										</th>
										<th scope="col" className="px-6 py-3">
											Topics
										</th>
										<th scope="col" className="px-6 py-3">
											Toatl Posts
										</th>
										<th scope="col" className="px-6 py-3">
											Members
										</th>
										<th scope="col" className="px-6 py-3">
											Engagement rate
										</th>
										<th scope="col" className="px-6 py-3">
											Category
										</th>
										<th scope="col" className="px-2 py-3">

										</th>
									</tr>
								</thead>
								{data.community.length > 0 && <tbody>

									{
										data.community.map((d, i) => (
											<tr key={i} className="bg-white border-b dark:bg-[#0D0D0D] dark:border-gray-700 hover:bg-gray-50 ">
												<th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
													<img className="w-10 h-10 rounded-full" src={d?.dp} alt="Jese image" />
													<div className="ps-3">
														<div className="text-base font-semibold">{d?.title}</div>
													</div>
												</th>
												<td className="px-6 py-4">
													{d?.topics}
												</td>

												<td className="px-6 py-4">
													{d?.posts}
												</td>
												<td className="px-6 py-4">
													{d?.members}
												</td>
												<td className="px-6 py-4">
													{d?.engagement}
												</td>

												<td className="px-6 py-4">
													{d?.category}
												</td>
												<td className="px-6 py-4">
													<Link href={`/main/dashboard?id=${d?.id}`} onClick={() => setOpen2(true)} className="font-medium bg-[#41A956]/30 p-2 px-5 rounded-3xl text-[#41A956] hover:underline">View</Link>
												</td>
											</tr>
										))
									}
								</tbody>}

								{data.community.length === 0
									&&
									<tr className='w-full'>
										<td colSpan={5} className="w-full text-2xl font-bold">
											<div className='flex justify-center w-full items-center h-[150px]'>NO DATA FOUND</div>
										</td>
									</tr>
								}
							</table>
						</div>
						}
					</div>
					<div className='flex justify-end mt-5 items-center'>
						{(switcher === 1 && data.store.length > 0) && <Link className='bg-blue-500 p-2 px-4 rounded-xl  flex justify-end items-center' href={"/main/store"}>See More...</Link>}
						{(switcher === 2 && data.product.filter((f) => f?.products?.length != 0).length > 0) && < Link className='bg-blue-500 p-2 px-4 rounded-xl  flex justify-end items-center' href={"/main/store"}>See More...</Link>}
						{(switcher === 3 && data.community.length > 0) && <Link className='bg-blue-500 p-2 px-4 rounded-xl  flex justify-end items-center' href={"/main/community"}>See More...</Link>}
					</div>
				</div>
			</div >
		</>
	)
}

export default page