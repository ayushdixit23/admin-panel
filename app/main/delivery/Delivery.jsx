"use client";
import { API } from "@/Essentials";
import Pagination from "@/app/Components/Pagination";
import DeliveryFetch from "@/app/FetchComponents/DeliveryFetch";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const search = useSearchParams();
  const mid = search.get("id");
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [client, setClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const lastindex = currentPage * postPerPage;
  const firstIndex = lastindex - postPerPage;
  const postperData = data?.slice(firstIndex, lastindex);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/v1/delusers`);
      console.log(res.data);
      setData(res.data.deluser);
      setUrl(res.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return null;
  }

  return (
    <>
      {/* {open && (
        <BankRequest
          id={mid}
          setOpen={setOpen}
          fetchData={fetchData}
          puradata={data}
        />
      )} */}
      <div className="px-4">
        <div className="text-2xl  font-bold text-[#C2B1FF] py-4">Delivery</div>
        <div className="p-3 flex flex-col gap-7">
          <div className="dark:bg-[#101010] bg-[#fafafa] rounded-xl p-3">
            <div className="flex gap-2  items-center">
              <div className="bg-[#044967] rounded-[3px] w-[13px] h-5"></div>
              <div className="font-bold py-2 text-lg">
                Delivery Users Verification Request
              </div>
            </div>
            <div className="w-full mt-3 overflow-x-scroll no-scrollbar">
              <DeliveryFetch
                data={postperData}
                fetchData={fetchData}
                setOpen={setOpen}
              />
              {data?.length > postPerPage && (
                <Pagination
                  postPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  firstIndex={firstIndex}
                  lastindex={lastindex}
                  length={data.length}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
