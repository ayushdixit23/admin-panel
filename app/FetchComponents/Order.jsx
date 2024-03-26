import Link from 'next/link'
import React from 'react'
import { formatDate } from '../Components/Useful'

const OrderFetch = ({ data, setOpen3 }) => {
	return (
		<table className="w-full text-sm text-left min-w-[1100px] rtl:text-right text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 uppercase bg-[#f1f1f1] dark:bg-[#0b0808] dark:text-gray-400">
				<tr>
					<th scope="col" className="px-6 py-3">
						Order ID
					</th>
					<th scope="col" className="px-6 py-3">
						Product
					</th>
					<th scope="col" className="px-6 py-3">
						Date
					</th>
					<th scope="col" className="px-6 py-3">
						Total
					</th>
					<th scope="col" className="px-6 py-3">
						Customer
					</th>
					<th scope="col" className="px-6 py-3">
						Payment
					</th>
					<th scope="col" className="px-6 py-3">
						Status
					</th>
				</tr>
			</thead>
			{data.length > 0 && < tbody >
				{
					data?.map((d, i) => (
						<tr key={i} className="bg-white border-b dark:bg-[#0D0D0D] dark:border-gray-700 hover:bg-gray-50 ">
							<td className="px-6 py-4">
								{d?._id}
							</td>
							<th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
								<img className="w-10 h-10 rounded-full" src={data.purl + d?.productId?.[0]?.images?.[0]?.content} alt="Product Image" />
								<div className="ps-3">
									<div className="text-base font-semibold">{d?.productId?.[0]?.name}</div>
								</div>
							</th>


							<td className="px-6 py-4">
								{formatDate(d?.createdAt)}
							</td>
							<td className="px-6 py-4">
								{d?.total}
							</td>
							<td className="px-6 py-4">
								{d?.buyerId?.fullname}
							</td>
							<td className="px-6 py-4">
								{d?.paymentMode}
							</td>
							<td className="px-6 py-4">
								{
									(d?.currentStatus === "pending" || d?.currentStatus === "processing" || d?.currentStatus === "shipped")
										?
										<Link href={`/main/store?id=${d?._id}`} onClick={() => setOpen3(true)} className="font-medium 
							bg-[#6a3e91]/30 p-2 px-5 rounded-3xl text-[#fff] hover:underline">Track</Link> :
										< Link href={"#"} className="font-medium 
							bg-[#41A956]/30 p-2 px-5 rounded-3xl text-[#41A956]">{d?.currentStatus}</Link>

								}
							</td>
						</tr>
					))
				}
			</tbody>}

			{data.length === 0 &&
				<tr className='w-full'>
					<td colSpan={5} className=" min-w-full text-2xl font-bold">
						<div className='flex justify-center items-center h-[150px]'>NO DATA FOUND</div>
					</td>
				</tr>
			}
		</table >
	)
}

export default OrderFetch