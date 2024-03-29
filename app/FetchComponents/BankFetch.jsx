import Link from 'next/link'
import React from 'react'

const BankFetch = ({ data, setOpen }) => {
	return (
		<table className="w-full text-sm text-left rtl:text-right min-w-[1100px] text-gray-500 dark:text-gray-400">
			<thead className="text-xs text-gray-700 uppercase bg-[#f1f1f1] dark:bg-[#0b0808] dark:text-gray-400">
				<tr>
					{/* <th scope="col" className="px-6 py-3 min-w-[200px]">
						Userid
					</th> */}
					<th scope="col" className="px-6 py-3">
						User
					</th>
					<th scope="col" className="px-6 py-3">
						Bankname
					</th>
					<th scope="col" className="px-6 py-3">
						Account Name
					</th>
					<th scope="col" className="px-6 py-3">
						branchname
					</th>
					<th scope="col" className="px-6 py-3">
						account no
					</th>
					<th scope="col" className="px-6 py-3">
						IFSCcode
					</th>
					<th scope="col" className="px-2 py-3">

					</th>
				</tr>
			</thead>
			{data?.length > 0 && <tbody>

				{
					data.map((d, i) => (
						<tr key={i} className="bg-white border-b dark:bg-[#0D0D0D] dark:border-gray-700 hover:bg-gray-50 ">
							{/* <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
								{d?.id}
							</th> */}
							<td>
								<div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
									<img className="w-10 h-10 rounded-full" src={d?.user.dp} alt="Jese image" />

									<div className="ps-3">
										<div className="text-base font-semibold">{d?.user?.fullname}</div>
									</div>
								</div>

							</td>
							<td className="px-6 py-4">
								{d?.bank?.bankname}
							</td>
							<td className="px-6 py-4">
								{d?.bank?.personname}
							</td>
							<td className="px-6 py-4">
								{d?.bank?.branchname}
							</td>
							<td className="px-6 py-4">
								{d?.bank?.accountno}
							</td>

							<td className="px-6 py-4">
								{d?.IFSCcode}
							</td>
							<td className="px-6 py-4">
								<Link href={`/main/bank?id=${d?.id}`} onClick={() => setOpen(true)} className="font-medium bg-[#41A956]/30 p-2 px-5 rounded-3xl text-[#41A956] hover:underline">View</Link>
							</td>
						</tr>
					))
				}
			</tbody>}

			{data.length === 0
				&&
				<tr className='w-full'>
					<td colSpan={5} className="w-full text-2xl font-bold">
						<div className='flex justify-center w-full items-center h-[150px]'>NO DATA FOUND</div>
					</td>
				</tr>
			}
		</table>
	)
}

export default BankFetch