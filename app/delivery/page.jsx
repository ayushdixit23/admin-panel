"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { API } from "@/Essentials";

const Page = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const scrollContainerRef = useRef(null); // Create a ref for the scrollable container

  useEffect(() => {
    const loadDeliveries = async () => {
      const res = await fetch(`${API}/deliveries?page=${currentPage}`);
      const data = await res.json();
      setDeliveries((prevDeliveries) => [
        ...prevDeliveries,
        ...data.deliveries,
      ]);
      setTotalPages(data.totalPages);
    };

    loadDeliveries();
  }, [currentPage]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      if (
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100
      ) {
        if (currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentPage, totalPages]);

  const toggleDetails = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-[#101010] p-3 rounded-xl  flex flex-col gap-y-10">
      <div className="flex gap-2  items-center">
        <div className="bg-[#044967] rounded-[3px] w-[13px] h-5"></div>
        <div className="font-bold py-2 text-lg">Delivery</div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex flex-col p-4 min-w-[320px] gap-y-[12px]"
      >
        <div className="text-xs">
          <div className="flex justify-between items-center text-md w-full">
            <div className="flex gap-x-4 justify-evenly w-full pr-12">
              <p className="text-white w-[100px] text-right">#ORDERID</p>
              <p className="text-white w-[150px] text-right">TITLE</p>
              <p className="text-white w-[200px] text-right">
                AMOUNT | EARNING
              </p>
              <p className="text-white w-[150px] text-right">STATUS</p>
              <p className="text-white w-[150px] text-right">MODE</p>
              <p className="text-white w-[150px] text-right">PHONENUMBER</p>
            </div>
          </div>
        </div>
        {deliveries &&
          deliveries.map((delivery) => (
            <div
              key={delivery._id}
              className="bg-[#0D0D0D] border-[1px] border-[#1B1B1B] py-4 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center text-md w-full px-4">
                <div className="flex text-gray-300 flex-col sm:flex-row gap-x-4 justify-evenly w-full text-center sm:text-right">
                  <p className=" w-full sm:w-[100px]">{`#${delivery.orderId}`}</p>
                  <p className=" w-full sm:w-[150px]">{delivery.title}</p>
                  <p className=" w-full sm:w-[180px] flex items-center justify-between">
                    <FaIndianRupeeSign className="text-green-500" />{" "}
                    {delivery.amount} RS | {delivery.earning} RS
                  </p>
                  <p
                    className={` w-full sm:w-[150px] ${
                      delivery.status === "Delivered"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {delivery.status}
                  </p>
                  <p
                    className={` w-full sm:w-[150px] ${
                      delivery.mode === "Cash"
                        ? "text-gray-500"
                        : "text-red-500"
                    }`}
                  >
                    {delivery.mode}
                  </p>
                  <Link
                    href={`tel:${delivery.phonenumber}`}
                    className="text-white w-full sm:w-[150px] flex items-center justify-between"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoCall className="text-gray-600" />
                    {delivery.phonenumber}
                  </Link>
                </div>
                <div className="mt-2 sm:mt-0">
                  <button
                    className=" text-white p-2 rounded"
                    onClick={() => toggleDetails(delivery._id)}
                  >
                    {expandedItems[delivery._id] ? (
                      <MdArrowDropUp />
                    ) : (
                      <MdArrowDropDown />
                    )}
                  </button>
                </div>
              </div>

              {expandedItems[delivery._id] && (
                <div className="text-white mt-4 flex flex-col sm:flex-row">
                  {/* Pickup Address */}
                  <div className="flex flex-col gap-y-4 sm:gap-y-6 border-b-2 sm:border-b-0 sm:border-r-2 border-[#1B1B1B] p-4 w-full sm:w-1/2">
                    <h3 className="font-bold">Pickup Address:</h3>
                    <div className="flex flex-col gap-y-2">
                      <p>City: {delivery.pickupaddress.city}</p>
                      <p>Landmark: {delivery.pickupaddress.landmark}</p>
                      <p>
                        Latitude: {delivery.pickupaddress.coordinates.latitude}
                      </p>
                      <p>
                        Longitude:{" "}
                        {delivery.pickupaddress.coordinates.longitude}
                      </p>
                    </div>
                  </div>

                  {/* Dropping Address */}
                  <div className="flex flex-col gap-y-4 sm:gap-y-6 p-4 w-full sm:w-1/2">
                    <h3 className="font-bold">Dropping Address:</h3>
                    <div className="flex flex-col gap-y-2">
                      <p>Street: {delivery.droppingaddress.streetaddress}</p>
                      <p>City: {delivery.droppingaddress.city}</p>
                      <p>State: {delivery.droppingaddress.state}</p>
                      <p>Landmark: {delivery.droppingaddress.landmark}</p>
                      <p>Pincode: {delivery.droppingaddress.pincode}</p>
                      <p>
                        Latitude:{" "}
                        {delivery.droppingaddress.coordinates.latitude}
                      </p>
                      <p>
                        Longitude:{" "}
                        {delivery.droppingaddress.coordinates.longitude}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
