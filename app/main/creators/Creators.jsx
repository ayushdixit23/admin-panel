"use client";
import { API } from "@/Essentials";
import Pagination from "@/app/Components/Pagination";
import CreatorsFetch from "@/app/FetchComponents/CreatorsFetch";
import CreatorModel from "@/app/Modals/CreatorModel";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState([]);
  const search = useSearchParams();
  const email = search.get("email");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const lastindex = currentPage * postPerPage;
  const [client, setClient] = useState(false);
  const firstIndex = lastindex - postPerPage;
  const postperData = data?.slice(firstIndex, lastindex);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/fetchCreators`);
      console.log(res.data);
      if (res.data.success) {
        setData(res.data.creators);
      }
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
      {email && <CreatorModel puradata={data} email={email} />}

      <div className="px-4">
        <div className="text-2xl font-bold text-[#C2B1FF] py-4">Creators</div>
        <div className="p-3">
          <div className="dark:bg-[#101010] bg-[#fafafa] rounded-xl p-3">
            <div className="flex gap-2  items-center">
              <div className="bg-[#044967] rounded-[3px] w-[13px] h-5"></div>
              <div className="font-bold py-2 text-lg">New Creator</div>
            </div>
            <div className="w-full mt-3 overflow-x-scroll no-scrollbar">
              <CreatorsFetch data={postperData} />
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
