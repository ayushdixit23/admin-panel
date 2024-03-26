import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { formatDate } from '../Components/Useful';

const TrackOder = ({ id, setOpen, storeData, puradata, url, purl }) => {


	const data = puradata.filter((d) => {
		return d._id === id;
	});

	console.log(data)

	return (
		<div className='fixed inset-0 w-screen h-screen p-2 flex justify-center items-center bg-black/50 '>
			<div className='md:w-[80%] w-full p-5 rounded-lg  flex flex-col dark:text-white dark:bg-[#101010] bg-white text-black h-auto'>
				<div className='flex justify-between items-center'>
					<div className='flex gap-2 items-center'>
						<div className='bg-[#044967] rounded-[3px] w-[13px] h-5'></div>
						<div className='font-bold'>Track order</div>
					</div>
					<div onClick={() => setOpen(false)}>
						<RxCross2 />
					</div>
				</div>
				<div className='mt-3'>
					<div className='flex sm:flex-row flex-col pn:max-sm:gap-2 sm:justify-between sm:items-center'>
						<div className='font-bold'>Order ID: {id}</div>
						<div className='flex sm:justify-center items-center gap-2'>
							<div className='p-2 px-4 rounded-lg border border-white/10'>Invoice</div>
							<div className='p-2 px-4 rounded-lg bg-[#8678F1] text-white'>Track order</div>
						</div>
					</div>
					<div className='flex flex-wrap gap-2 mt-2 items-center'>
						<div className='font-bold border-r border-white pr-2'>Order date: {formatDate(data[0]?.createdAt)}</div>
						{/* <div className='font-bold border-r border-white pr-2'>Estimated delivery: May 16, 2022</div> */}
						<div className='font-bold'>Payment: {data[0]?.paymentMode}</div>
					</div>

					<div className='bg-[#0D0D0D] mt-3 rounded-xl p-4'>
						<div className='font-bold'>Customer Details</div>
						<div className='flex justify-between mt-3 flex-col sm:flex-row pn:max-sm:gap-3 sm:items-center'>
							<div class="flex items-center">
								<div class="relative">
									<img class="h-16 w-16 rounded-full object-cover" src={url + data[0]?.buyerId?.profilepic
									} alt="Avatar" />
									<div class="absolute inset-0 rounded-full shadow-inner"></div>
								</div>
								<div class="ml-2 flex flex-col gap-[2px]">
									<h2 class="font-bold ">{data[0]?.buyerId?.fullname}</h2>
									<p class="text-xs">@{data[0]?.buyerId?.username}</p>
								</div>
							</div>
							<div>
								<div>UserId:{data[0]?.buyerId?._id}</div>
								{data[0]?.buyerId?.phone && < div > Phone: {data[0]?.buyerId?.phone && data[0].buyerId?.phone.substring(2)}</div>}
							</div>
						</div>
						<div className='flex sm:flex-row flex-col justify-between mt-2 sm:items-center'>
							<div>
								<div>Address</div>
								<div> {data[0]?.buyerId?.address?.streetaddress ? data[0]?.buyerId?.address?.streetaddress : "Not Given"}, {data[0]?.buyerId?.address?.city ? data[0]?.buyerId?.address?.city : "Not Given"}, {data[0]?.buyerId?.address?.state ? data[0]?.buyerId?.address?.state : "Not Given"}</div>
							</div>
							<div className='text-lg font-semibold'>
								Total : ₹{data[0]?.total}
							</div>
						</div>
					</div>

					<div>
						<div className='mt-3 font-bold mb-2'>
							Store Address
						</div>
						<div className='overflow-auto no-scrollbar'>
							<div className='grid grid-cols-2 gap-3 max-h-[300px]'>
								{
									data[0]?.sellerId?.map((d, i) => (
										<div key={i} className='p-3 rounded-lg min-w-[350px] w-full bg-[#0D0D0D]'>
											<div className='flex border-b border-white pb-3 flex-col'>
												<div className='flex justify-between mt-3 items-center'>
													<div class="flex items-center">
														<div class="relative">
															<img class="h-12 w-12 rounded-full object-cover" src={url + d?.profilepic} alt="Avatar" />
															<div class="absolute inset-0 rounded-full shadow-inner"></div>
														</div>
														<div class="ml-2 flex flex-col gap-[2px]">
															<h2 class="font-bold text-sm">{d?.fullname}</h2>
															<p class="text-xs">@{d?.username}</p>
														</div>
													</div>
													<div className='text-sm flex flex-col gap-1'>
														<div>UserId:{d?._id}</div>
														<div>Phone:</div>
													</div>
												</div>
												<div className='flex justify-between mt-2 items-center'>
													<div>
														<div>Address</div>
														<div>{d?.storeAddress.buildingno}, {d?.storeAddress.city}, {d?.storeAddress.state}</div>
													</div>
												</div>
											</div>

											{
												data[0].data?.filter((w) => w?.seller == d?._id).map((f, k) => (
													<div key={k} className='flex justify-between pt-3 items-center'>
														<div className='flex items-center gap-2'>
															<div><img class="h-16 w-16 rounded-full object-cover" src={purl + f?.images?.[0].content} alt="Avatar" /></div>
															<div>
																<div>{f?.product?.name}</div>
																<div>{f?.product?.brandname}</div>
															</div>
														</div>
														<div>
															<div>₹ {f?.price}</div>
															<div>Oty: {f?.qty}</div>
														</div>
													</div>
												))
											}
										</div>
									))
								}

							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}

export default TrackOder