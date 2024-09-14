"use client";
import Pagination from "@/app/Components/Pagination";
import LatestPosts from "@/app/FetchComponents/LatestPosts";
import { API } from "@/Essentials";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const lastindex = currentPage * postPerPage;
  const firstIndex = lastindex - postPerPage;
  const postperData = data?.slice(firstIndex, lastindex);
  const [community, setCommunity] = useState();

  useEffect(() => {
    if (params?.id) {
      axios
        .get(`${API}/fetchPosts/${params?.id}`)
        .then((res) => {
          setData(res.data.posts);
          setCommunity(res.data.community);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params?.id]);
  return (
    <div className="px-4">
      <div className="text-2xl  font-bold text-[#C2B1FF] py-4">Posts</div>
      <div className="p-3">
        <div className="dark:bg-[#101010] bg-[#fafafa] rounded-xl p-3">
          <div className="flex gap-2  items-center">
            <div className="bg-[#044967] rounded-[3px] w-[13px] h-5"></div>
            <div className="font-bold py-2 text-lg">
              Latest Posts from {community?.title}
            </div>
          </div>
          <div className="w-full mt-3 overflow-x-scroll no-scrollbar">
            <LatestPosts data={postperData} community={community} />
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
  );
};

export default page;
