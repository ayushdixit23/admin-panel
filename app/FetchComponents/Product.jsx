import React from 'react'
import Link from 'next/link'

const ProductFetch = ({ data, setOpen1 }) => {
	return (
		<table className="w-full text-sm text-left min-w-[1100px] rtl:text-right text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 uppercase bg-[#f1f1f1] dark:bg-[#0b0808] dark:text-gray-400">
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
			{data.filter((f) => f?.products?.length != 0).length > 0 && <tbody>

				{data.filter((f) => f?.products?.length != 0).map((d, i) => (
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
							<Link href={`/main/store?id=${d?.userid._id}`} onClick={() => setOpen1(true)} className="font-medium bg-[#41A956]/30 p-2 px-5 rounded-3xl text-[#41A956] hover:underline">View</Link>
						</td>
					</tr>
				))}
			</tbody>}

			{data.filter((f) => f?.products?.length != 0).length === 0
				&&
				<tr className='w-full'>
					<td colSpan={5} className=" min-w-full text-2xl font-bold">
						<div className='flex justify-center items-center h-[150px]'>NO DATA FOUND</div>
					</td>
				</tr>
			}
		</table>
	)
}

export default ProductFetch