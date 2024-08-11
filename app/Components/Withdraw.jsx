import { API } from "@/Essentials";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const Withdraw = ({ data, setOpen, fetchData }) => {
  const [loading, setLoading] = useState(false);
  const markPaid = async (id, wid, amount) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API}/v1/payuser/${id}/${wid}`, {
        amount: Number(amount),
      });
      if (res.data.success) {
        setLoading(false);
        await fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const rejectRequest = async (wid) => {
    try {
      setLoading(true);
      const res = await axios.post(`${API}/v1/declinepayuser/${wid}`);
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
          {/* <th scope="col" className="px-6 py-3 min-w-[200px]">
						Userid
					</th> */}
          <th scope="col" className="px-6 py-3">
            User
          </th>
          <th scope="col" className="px-6 py-3">
            Amount
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
              {/* <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
								{d?.id}
							</th> */}
              <td>
                <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={d?.user.dp}
                    alt="Jese image"
                  />

                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {d?.user?.fullname}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">₹ {d?.amount}</td>
              <td className="px-6 py-4">{d?.bank?.bankname}</td>
              <td className="px-6 py-4">{d?.bank?.personname}</td>
              <td className="px-6 py-4">{d?.bank?.branchname}</td>
              <td className="px-6 py-4">{d?.bank?.accountno}</td>

              <td className="px-6 py-4">{d?.bank?.IFSCcode}</td>
              <td>
                <div className="flex justify-center cursor-pointer items-center gap-2">
                  <div
                    onClick={() => rejectRequest(d?._id)}
                    className="bg-[#cf3a30] p-1.5 text-white font-medium px-4 rounded-lg"
                  >
                    Reject
                  </div>
                  <div
                    onClick={() => markPaid(d?.userid, d?._id, d?.amount)}
                    className="bg-[#28974b] p-1.5 text-white font-medium px-4 rounded-lg"
                  >
                    Mark Paid
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

export default Withdraw;
