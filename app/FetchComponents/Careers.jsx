import Link from "next/link";
import React from "react";

const Careers = ({ data, setOpen }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right min-w-[1100px] text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-[#f1f1f1] dark:bg-[#0b0808] dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3 min-w-[200px]">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Phone
          </th>
          <th scope="col" className="px-6 py-3">
            Batch
          </th>
          <th scope="col" className="px-6 py-3">
            Job
          </th>
          <th scope="col" className="px-2 py-3"></th>
        </tr>
      </thead>

      {data?.length > 0 && (
        <tbody>
          {data.map((d, i) => (
            <tr
              key={i}
              className="bg-white border-b dark:bg-[#0D0D0D] dark:border-gray-700 hover:bg-gray-50 "
            >
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                {d?.name}
              </th>
              <td>{d?.email}</td>
              {console.log(d)}
              <td className="px-6 py-4">{d?.phone}</td>

              <td className="px-6 py-4">{d?.batch}</td>
              <td className="px-6 py-4">{d?.job}</td>

              <td className="px-6 py-4">
                <Link
                  href={`/main/careers?id=${d?._id}`}
                  onClick={() => setOpen(true)}
                  className="font-medium bg-[#41A956]/30 p-2 px-5 rounded-3xl text-[#41A956] hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      )}

      {data?.length === 0 && (
        <tr className="w-full">
          <td colSpan={5} className="w-full text-2xl font-bold">
            <div className="flex justify-center w-full items-center h-[150px]">
              NO DATA FOUND
            </div>
          </td>
        </tr>
      )}
    </table>
  );
};

export default Careers;
