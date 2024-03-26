"use client"
import ProductsModel from '@/app/Modals/products'
import TrackOrder from '@/app/Modals/TrackOder'
import StoreModel from '@/app/Modals/store'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '@/Essentials'
import toast from 'react-hot-toast'
import StoreFetch from '@/app/FetchComponents/Store'
import Pagination from '@/app/Components/Pagination'
import ProductFetch from '@/app/FetchComponents/Product'
import OrderFetch from '@/app/FetchComponents/Order'

const Store = () => {
	const search = useSearchParams()
	const mid = search.get("id")
	const [count, setCount] = useState({
		totalStore: "", totalRequests: "", totalPendingStore: "", order: ""
	})
	const [data, setData] = useState({
		store: [],
		product: [],
		order: [],
		url: "",
		purl: ""
	})
	const [client, setClient] = useState(false)
	const [open1, setOpen1] = useState(false)
	const [open2, setOpen2] = useState(false)
	const [open3, setOpen3] = useState(false)

	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(10);
	const lastindex = currentPage * postPerPage;
	const firstIndex = lastindex - postPerPage;
	const postperStoreData = data.store?.slice(firstIndex, lastindex);
	const postperProductData = data.product?.slice(firstIndex, lastindex);
	const postperOrderData = data.order?.slice(firstIndex, lastindex);

	useEffect(() => {
		setClient(true)
	}, [])

	const storeData = async () => {
		try {
			const res = await axios.get(`${API}/v1/storecount`)
			if (res.data.success) {
				setCount({
					...count, totalStore: res.data.totalStore, totalRequests: res.data.totalRequests, totalPendingStore: res.data.totalPendingStore,
					order: res.data.order
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	const fetchData = async () => {
		try {
			const res = await axios.get(`${API}/v1/store`)
			if (res.data.success) {

				setData({
					...data, store: res.data.store, product: res.data.product, order: res.data.orders, url: res.data.url, purl: res.data.purl
				})
			} else {
				toast.error("Error in fetching")
			}
		} catch (error) {
			console.log(error)
		}
	}

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
				<ProductsModel id={mid} setOpen={setOpen1} storeData={storeData} puradata={data.product} fetchData={fetchData} />
			}
			{open3 &&
				<TrackOrder id={mid} storeData={storeData} puradata={data.order} purl={data.purl} setOpen={setOpen3} url={data.url} />
			}
			{open2 &&
				<StoreModel id={mid} setOpen={setOpen2} puradata={data.store} storeData={storeData} fetchData={fetchData} />
			}


			<div className='flex flex-col mt-2 p-3 py-6 w-full'>
				<div>
					<div className='mt-2 mb-4'>
						<div className='text-2xl font-bold text-[#C2B1FF]'>Store</div>
					</div>
					<div className='grid pp:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-10'>
						<div className='flex flex-col gap-3 text-2xl rounded-xl border border-[#5b5858] font-semibold px-7 py-9'>
							<div>Total stores</div>
							<div>{count.totalStore}</div>
						</div>
						<div className='flex flex-col gap-3 text-2xl rounded-xl border border-[#5b5858] font-semibold px-7 py-9'>
							<div>Total request</div>
							<div>{count.totalRequests}</div>
						</div>
						<div className='flex flex-col gap-3 text-2xl rounded-xl border border-[#5b5858] font-semibold px-7 py-9'>
							<div>Pending Request</div>
							<div>{count.totalPendingStore}</div>
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
						<div className='font-bold text-lg'>Store Requests</div>
					</div>
					<div className='mt-4'>
						<div className='overflow-auto no-scrollbar'>

							<StoreFetch data={postperStoreData} setOpen2={setOpen2} />
							{data.store?.length > postPerPage && <Pagination
								postPerPage={postPerPage}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								firstIndex={firstIndex}
								lastindex={lastindex}
								length={data.store.length}
							/>
							}
						</div>
					</div>
				</div>
				<div className='mt-4 dark:bg-[#101010] light:text-black rounded-xl p-4'>
					<div className='flex gap-2 items-center'>
						<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
						<div className='font-bold text-lg'>Products request</div>
					</div>
					<div className='mt-4'>
						<div className='overflow-auto no-scrollbar'>


							<ProductFetch data={postperProductData} setOpen1={setOpen1} />
							{data.product?.length > postPerPage && <Pagination
								postPerPage={postPerPage}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								firstIndex={firstIndex}
								lastindex={lastindex}
								length={data.product.length}
							/>
							}
						</div>
					</div>
				</div>
				<div className='mt-4 dark:bg-[#101010] light:text-black rounded-xl p-4'>
					<div className='flex gap-2 items-center'>
						<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
						<div className='font-bold text-lg'>Track orders</div>
					</div>
					<div className='mt-4'>
						<div className='overflow-auto no-scrollbar'>

							<OrderFetch data={postperOrderData} setOpen3={setOpen3} url={data.purl} />
							{data.order?.length > postPerPage && <Pagination
								postPerPage={postPerPage}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								firstIndex={firstIndex}
								lastindex={lastindex}
								length={data.order.length}
							/>
							}
						</div>
					</div>
				</div>
			</div >
		</>
	)
}

export default Store