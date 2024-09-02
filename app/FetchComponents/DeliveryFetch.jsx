import { API } from "@/Essentials";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const DeliveryFetch = ({ data, setOpen, fetchData }) => {
  const [loading, setLoading] = useState(false);
  const acceptRequest = async (id) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API}/acceptdelusers/${id}`);
      if (res.data.success) {
        setLoading(false);
        await fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const rejectRequest = async (id) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API}/rejectdelusers/${id}`);
      if (res.data.success) {
        setLoading(false);
        await fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center w-screen h-screen bg-black/50">
        <div className="animate-spin flex justify-center items-center">
          <ImSpinner9 />
        </div>
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-left rtl:text-right min-w-[1100px] text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-[#f1f1f1] dark:bg-[#0b0808] dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Fullname
          </th>
          <th scope="col" className="px-6 py-3">
            Phone
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Address
          </th>
          <th scope="col" className="px-6 py-3">
            Aadhar Number
          </th>
          <th scope="col" className="px-6 py-3">
            Account Type
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
              <td>
                <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  {d?.fullname}
                </div>
              </td>
              <td className="px-6 py-4">{d?.phone}</td>
              <td className="px-6 py-4">{d?.email}</td>
              <td className="px-6 py-4">{`${d?.address.streetaddress} , ${d?.address.state}, ${d?.address.city}`}</td>
              <td className="px-6 py-4">{d?.adharnumber}</td>

              <td className="px-6 py-4">{d?.accounttype}</td>

              {/* <td className="px-6 py-4">
                <Link
                  href={`/main/bank?id=${d?.id}`}
                  onClick={() => setOpen(true)}
                  className="font-medium bg-[#41A956]/30 p-2 px-5 rounded-3xl text-[#41A956] hover:underline"
                >
                  View
                </Link>
              </td> */}

              <td>
                <div className="flex justify-center cursor-pointer items-center gap-2">
                  <div
                    onClick={() => rejectRequest(d?._id)}
                    className="bg-[#cf3a30] p-1.5 text-white font-medium px-4 rounded-lg"
                  >
                    Reject
                  </div>
                  <div
                    onClick={() => acceptRequest(d?._id)}
                    className="bg-[#28974b] p-1.5 text-white font-medium px-4 rounded-lg"
                  >
                    Accept
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      )}

      {data.length === 0 && (
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

export default DeliveryFetch;
