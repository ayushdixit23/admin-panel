import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner9 } from "react-icons/im";
import Link from "next/link";
import axios from "axios";
import { API } from "@/Essentials";

const CreatorModel = ({ email, puradata }) => {
  const [loading, setLoading] = useState(true);
  const [creator, setCreator] = useState(null);
  const [url, setUrl] = useState("");

  const [posturl, setPosturl] = useState(null);

  const data = puradata.filter((d) => {
    return d.email === email;
  });

  // console.log(data, "data", creator);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(true);
      axios
        .post(`${API}/monitorCreatorsByEmail`, { email: data[0]?.email })
        .then((res) => {
          setUrl(res.data.URL);
          setPosturl(res.data?.POST_URL);
          setCreator(res.data.user);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [data?.[0]?.email]);

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
    <>
      <div className="absolute top-0 left-0 md:fixed sm:inset-0 w-screen pn:max-sm:overflow-auto pn:max-sm:no-scrollbar min-h-full sm:h-screen bg-black/60 z-50 sm:bg-black/50 flex justify-center items-center">
        <div className="md:w-[80%] sm:w-[90%] w-full flex flex-col text-black p-5 rounded-lg dark:text-white dark:bg-[#101010] bg-white">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-[#044967] rounded-[3px] w-[15px] h-6"></div>
              <div className="text-2xl font-bold">Creator</div>
            </div>
            <div>
              <Link href={"/main/creators"}>
                <RxCross2 />
              </Link>
            </div>
          </div>
          {/* all data */}
          <div className="mt-4 grid grid-cols-2 w-full">
            <div className="flex flex-col gap-1">
              <div className="text-lg font-bold">User Details</div>
              <div className="flex flex-col text-sm gap-3">
                <div className="flex  items-center gap-2">
                  <div className="w-[55px] h-[55px] overflow-hidden">
                    <img
                      src={url + creator?.profilepic}
                      className="w-full h-full object-cover rounded-xl "
                    />
                  </div>
                  <div className="flex flex-col ">
                    <div className="text-[17px] font-medium">
                      {creator?.fullname}
                    </div>
                    <div className="text-base font-medium">
                      @{creator?.username}
                    </div>
                  </div>
                </div>
                <div>Email : {creator?.email}</div>
                <div>Phone : {creator?.phone}</div>
                <div>
                  Address :{" "}
                  {!creator?.address && !creator?.city && !creator?.state ? (
                    "Not Available"
                  ) : (
                    <>
                      {creator?.address?.streetaddress},
                      {creator?.address?.state}, {creator?.address?.city}
                    </>
                  )}
                </div>
                <div>
                  Is Store Created?{" "}
                  {creator?.storeAddress.length > 0 ? "Yes!" : "No!"}
                </div>
                <div>
                  {creator?.storeAddress.length > 0 && (
                    <>
                      <div>
                        StoreAddress : {creator?.storeAddress?.[0]?.buildingno},
                        {creator?.storeAddress?.[0]?.state},{" "}
                        {creator?.storeAddress?.[0]?.city}
                      </div>

                      <div>
                        Is Store Verified?{" "}
                        {creator?.isStoreVerified ? "Yes" : "No"}
                      </div>
                    </>
                  )}
                </div>
                <div>
                  Community Created : {creator?.communitycreated?.length}
                </div>
                <div>Community Joined : {creator?.communityjoined?.length}</div>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold">Community Details</div>
              <div className="mt-1">
                <div className="flex gap-3 items-center">
                  {creator?.communitycreated?.length > 0 ? (
                    <>
                      {creator?.communitycreated?.map((d) => (
                        <div className="w-full flex flex-col gap-3">
                          <div className="flex gap-3 flex-col w-full">
                            <div className="flex  items-center gap-2">
                              <div className="w-[55px] h-[55px] overflow-hidden">
                                <img
                                  src={url + d?.dp}
                                  className="w-full h-full object-cover rounded-xl "
                                />
                              </div>
                              <div className="flex flex-col ">
                                <div className="text-[17px] font-medium">
                                  {d?.title}
                                </div>
                                <div className="text-base font-medium">
                                  {d?.category}
                                </div>
                              </div>
                            </div>
                            <div>
                              <Link
                                href={`${`/main/community/${d?._id}`}`}
                                className="flex justify-center items-center text-sm p-2 px-4 bg-blue-600 text-white rounded-lg"
                              >
                                View Posts
                              </Link>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 w-full">
                            <div>Members: {d?.memberscount}</div>
                            <div>Posts: {d?.posts?.length}</div>
                            <div>
                              IsMonetized: {d?.ismonetized ? "Yes" : "No"}
                            </div>
                            <div>Topics: {d?.topics.length}</div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>No Community Found!</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorModel;
