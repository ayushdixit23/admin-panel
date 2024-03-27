import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { formatDate } from '../Components/Useful';

const TrackOder = ({ id, setOpen, storeData, puradata, url, purl }) => {


	const data = puradata.filter((d) => {
		return d._id === id;
	});

	console.log(data)

	const uniqueSellerIds = [...new Set(data[0]?.sellerId.map(seller => seller?._id))];

	return (
		<div className='absolute top-0 left-0 sm:fixed sm:inset-0 w-screen pn:max-sm:overflow-auto pn:max-sm:no-scrollbar min-h-full sm:h-screen bg-black/60 z-50 sm:bg-black/50 container flex justify-center items-center'>
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
					<div className='flex sm:flex-row flex-col gap-3 mb-2 text-sm sm:text-base pn:max-sm:gap-2 sm:justify-between sm:items-center'>
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
							<div className="flex items-center">
								<div className="relative">
									<img className="h-16 w-16 min-w-10 min-h-10 rounded-full object-cover" src={url + data[0]?.buyerId?.profilepic
									} alt="Avatar" />
									<div className="absolute inset-0 rounded-full shadow-inner"></div>
								</div>
								<div className="ml-2 flex flex-col gap-[2px]">
									<h2 className="font-bold ">{data[0]?.buyerId?.fullname}</h2>
									<p className="pn:max-sm:text-xs">@{data[0]?.buyerId?.username}</p>
								</div>
							</div>
							<div>
								<div className="text-xs">UserId:{data[0]?.buyerId?._id}</div>
								{data[0]?.buyerId?.phone && < div className="pn:max-sm:text-xs"> Phone: {data[0]?.buyerId?.phone && data[0].buyerId?.phone.substring(2)}</div>}
							</div>
						</div>
						<div className='flex sm:flex-row flex-col justify-between mt-2 sm:items-center'>
							<div>
								<div className="pn:max-sm:text-xs">Address</div>
								<div className="pn:max-sm:text-xs"> {data[0]?.buyerId?.address?.streetaddress ? data[0]?.buyerId?.address?.streetaddress : "Not Given"}, {data[0]?.buyerId?.address?.city ? data[0]?.buyerId?.address?.city : "Not Given"}, {data[0]?.buyerId?.address?.state ? data[0]?.buyerId?.address?.state : "Not Given"}</div>
							</div>
							<div className='sm:text-lg pn:max-sm:mt-2 font-semibold'>
								Total : ₹{data[0]?.total}
							</div>
						</div>
					</div>

					<div>
						<div className='mt-3 font-bold mb-2'>
							Store Address
						</div>
						<div className='overflow-auto no-scrollbar'>
							<div className='grid sm:grid-cols-2 gap-3 max-h-[300px]'>
								{/* {
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

															<div><img class="h-14 w-14 rounded-full object-cover" src={purl + f?.product?.images?.[0].content} alt="Avatar" /></div>
															<div>
																<div>{f?.product?.name.length > 30 ? `${f?.product?.name.slice(0, 30)}...` : f?.product?.name}</div>
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
								} */}

								{

									uniqueSellerIds.map((sellerId, i) => {
										// Find the corresponding seller object
										const uniqueSeller = data[0]?.sellerId.find(seller => seller._id === sellerId);

										return (
											<div key={i} className='p-3 rounded-lg min-w-[350px] w-full border-b border-[#3d4654] rounded-b-none bg-[#0D0D0D]'>
												{/* Seller information */}
												<div className='flex border-b border-white pb-3 flex-col'>
													{/* Seller details */}
													<div className='flex sm:flex-row flex-col sm:gap-0 gap-3 justify-between mt-3 dm:items-center'>
														{/* Seller profile */}
														<div className="flex items-center">
															{/* Seller profile picture */}
															<div className="relative">

																<img className="min-h-16 min-w-16 max-h-[66px] max-w-[66px] rounded-full object-cover" src={url + uniqueSeller?.profilepic} alt="Avatar" />
																<div className="absolute inset-0 rounded-full shadow-inner"></div>
															</div>
															{/* Seller name and username */}
															<div className="ml-2 flex flex-col gap-[2px]">
																<h2 className="font-bold text-sm">{uniqueSeller?.fullname}</h2>
																<p className="text-xs">@{uniqueSeller?.username}</p>
															</div>
														</div>
														{/* Seller contact details */}
														<div className='text-sm flex flex-col gap-1'>
															<div>UserId:{uniqueSeller?._id}</div>
															<div>Phone:</div>
														</div>
													</div>
													{/* Seller address */}
													<div className='flex justify-between mt-2 items-center'>
														<div>
															<div>Address</div>
															<div>{uniqueSeller?.storeAddress.buildingno}, {uniqueSeller?.storeAddress.city}, {uniqueSeller?.storeAddress.state}</div>
														</div>
													</div>
												</div>

												{/* Products sold by the seller */}
												{
													// Filter data based on the current seller ID
													data[0].data?.filter(w => w?.seller === sellerId).map((f, k) => (
														<div key={k} className='flex justify-between sm:flex-row flex-col pt-3 sm:items-center'>
															<div className='flex items-center gap-2'>
																{/* Product image */}
																<div><img className="min-h-14 min-w-14 max-w-16 max-h-16 rounded-full object-cover" src={purl + f?.product?.images?.[0].content} alt="Avatar" /></div>
																{/* Product details */}
																<div>
																	<div>{f?.product?.name.length > 30 ? `${f?.product?.name.slice(0, 30)}...` : f?.product?.name}</div>
																	<div>{f?.product?.brandname}</div>
																</div>
															</div>
															{/* Product price and quantity */}
															<div className='pn:max-sm:flex pn:max-sm:items-center pn:max-sm:mt-2 pn:max-sm:gap-4'>
																<div>₹ {f?.price}</div>
																<div>Oty: {f?.qty}</div>
															</div>
														</div>
													))
												}
											</div>
										);
									})
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