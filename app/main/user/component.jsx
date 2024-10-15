"use client";
import CreatePost from "@/app/Components/CreatePost";
import Notification from "@/app/Components/Notification";
import { API } from "@/Essentials";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { GoChevronDown, GoChevronUp, GoPlus } from "react-icons/go";

const DeletePostModal = ({ isOpen, onClose, onDelete }) => {
  const [postId, setPostId] = useState("");

  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete(postId); // Call the onDelete function with the post ID
    setPostId(""); // Clear the input field
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center ">
      <div className="p-6 rounded-lg bg-[#273142] shadow-md">
        <h2 className="text-lg font-semibold mb-4">Delete a Post</h2>
        <input
          type="text"
          placeholder="Enter Post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className=" rounded px-4 py-2 mr-2">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white rounded px-4 py-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  const [text, setText] = useState("");
  const [arr, setArr] = useState([]);
  const [selectedUser, setSelectedUser] = useState(
    arr.length > 0 ? arr[0]?.id : ""
  ); // Default to first user
  const [users, setUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
  const [isDropdownOpenCom, setIsDropdownOpenCom] = useState(false); // Track dropdown state
  const [communities, setCommunities] = useState([]);
  const [selectedCom, setSelectedCom] = useState(
    communities.length > 0 ? communities[0]?.id : ""
  ); // Default to first user
  const params = useSearchParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const mediaType = params.get("mediaType");
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, 300); // 300ms delay for debouncing

    return () => clearTimeout(timer); // Clear timeout if user keeps typing
  }, [text]);

  const handleSearch = async (searchText) => {
    try {
      if (searchText) {
        const res = await axios.post(`${API}/givePassword`, {
          text: searchText,
        });
        setUsers(res.data.data || []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  // Trigger search whenever debouncedText updates
  useEffect(() => {
    if (debouncedText) {
      handleSearch(debouncedText);
    } else {
      setUsers([]);
    }
  }, [debouncedText]);

  // Toggle the dropdown open/close state
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle user selection from the dropdown
  const handleUserSelect = (user) => {
    setSelectedUser(user); // Set the selected user
    setIsDropdownOpen(false); // Close the dropdown
    fetchCommunity(user.id);
  };

  const toggleDropdownCom = () => {
    setIsDropdownOpenCom(!isDropdownOpenCom);
  };

  // Handle user selection from the dropdown
  const handleUserSelectCom = (user) => {
    setSelectedCom(user); // Set the selected user
    setIsDropdownOpenCom(false); // Close the dropdown
  };

  const savetoLocalStorage = (d) => {
    // Get the current array from local storage or initialize it as an empty array
    let savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];

    // Check if userId already exists in the array
    if (!savedUsers.includes(d?.id)) {
      // If not, push the new d?.id to the array
      savedUsers.push(d?.id);

      setArr([...arr, d]);
      if (!selectedUser) {
        setSelectedUser(d);
        fetchCommunity(d.id);
      }

      // Update local storage with the new array
      localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
    } else {
      console.log(`User ID ${d?.id} is already saved.`);
    }
  };

  const fetchUserDataFromLocalStorage = async () => {
    let savedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];

    if (savedUsers.length === 0) return [];

    try {
      const response = await axios.post(`${API}/getUserfromLocal`, {
        stringifyIds: JSON.stringify(savedUsers),
      });

      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchUserDataFromLocalStorage();
      setArr(fetchedData);
      setSelectedUser(fetchedData[0]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchCommunity(selectedUser?.id);
    }
  }, [selectedUser]);

  const fetchCommunity = async (id) => {
    try {
      const res = await axios.get(`${API}/fetchCommunity/${id}`);
      console.log(res.data, "data of community");
      if (res.data.success) {
        setCommunities(res.data.data);
        setSelectedCom(res.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (postId) => {
    console.log(`Deleting post with ID: ${postId}`);
    const res = await axios.post(`${API}/deletePost`, { id: postId });
    if (res.data.success) {
      toast.success(`Deleted post with ID: ${postId}`);
    }
  };

  return (
    <>
      <div className="dark:bg-[#101010] bg-white rounded-xl p-6 w-full shadow-lg">
        <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          User Management
        </div>

        {/* Search Section */}
        <div className="mb-4">
          <div className=" mb-2">Search</div>
          <div className="flex space-x-2">
            <input
              className="flex-grow p-2 border border-gray-300 rounded-md outline-none dark:text-white"
              placeholder="Search Passwords for email, username, or fullname"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />

            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* User List Section */}
        <div className="space-y-4 overflow-y-scroll no-scrollbar max-h-[250px] border rounded-xl">
          {users.map((d) => (
            <div
              key={d?.id}
              className="flex justify-between items-center p-4 rounded-md shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={d?.dp}
                    alt="User Avatar"
                  />
                </div>

                <div className="text-gray-900 dark:text-white">
                  <div className="text-base font-semibold">{d?.fullname}</div>
                  <div className="text-sm text-gray-500">
                    {d?.password ? d?.password : "undefined"}
                  </div>
                </div>
              </div>
              <div>
                <GoPlus
                  className="text-2xl text-blue-600 cursor-pointer hover:text-blue-700 transition"
                  onClick={() => savetoLocalStorage(d)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dropdown for Selected User */}
        <div className="w-full relative mt-8">
          {selectedUser && (
            <div
              className="flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:shadow-md transition"
              onClick={toggleDropdown}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={selectedUser?.dp}
                    alt="Selected User"
                  />
                </div>
                <div className="text-gray-900 dark:text-white">
                  <div className="text-base font-semibold">
                    {selectedUser?.fullname}
                  </div>
                  <div className="text-sm text-gray-500">
                    {selectedUser?.username}
                  </div>
                </div>
              </div>
              <div>
                {isDropdownOpen ? (
                  <GoChevronUp className="text-2xl text-gray-500" />
                ) : (
                  <GoChevronDown className="text-2xl text-gray-500" />
                )}
              </div>
            </div>
          )}

          {/* Dropdown List */}
          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-black/50 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {arr.map((d) => (
                <div
                  key={d?.id}
                  className="flex justify-between items-center px-4 py-2 cursor-pointer hover dark:hover:bg-gray-800 transition"
                  onClick={() => handleUserSelect(d)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={d?.dp}
                        alt="Dropdown User"
                      />
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      <div className="text-sm font-semibold">{d?.fullname}</div>
                      <div className="text-xs text-gray-500">{d?.username}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full relative mt-8">
          {selectedCom && (
            <div
              className="flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:shadow-md transition"
              onClick={toggleDropdownCom}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={selectedCom?.dps}
                    alt="Selected User"
                  />
                </div>
                <div className="text-gray-900 dark:text-white">
                  <div className="text-base font-semibold">
                    {selectedCom?.title}
                  </div>
                </div>
              </div>
              <div>
                {isDropdownOpenCom ? (
                  <GoChevronUp className="text-2xl text-gray-500" />
                ) : (
                  <GoChevronDown className="text-2xl text-gray-500" />
                )}
              </div>
            </div>
          )}

          {/* Dropdown List */}
          {isDropdownOpenCom && (
            <div className="absolute z-10 mt-2 w-full bg-black/50 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {communities.map((d) => (
                <div
                  key={d?.id}
                  className="flex justify-between items-center px-4 py-2 cursor-pointer hover dark:hover:bg-gray-800 transition"
                  onClick={() => handleUserSelectCom(d)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={d?.dps}
                        alt="Dropdown User"
                      />
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      <div className="text-sm font-semibold">{d?.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center gap-3">
        <Link
          className="bg-blue-500 text-white p-2 px-5 text-sm rounded-xl"
          href={"/main/user?mediaType=video"}
        >
          Create Video Post
        </Link>
        <Link
          className="bg-blue-500 text-white p-2 px-5 text-sm rounded-xl"
          href={"/main/user?mediaType=image"}
        >
          Create Image Post
        </Link>

        <div
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 cursor-pointer text-white p-2 px-5 text-sm rounded-xl"
        >
          Delete a Post
        </div>
        <DeletePostModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onDelete={handleDeletePost}
        />

        {mediaType && (
          <CreatePost
            id={selectedUser.id}
            comid={selectedCom.id}
            mediaType={mediaType}
          />
        )}
      </div>

      <Notification />
    </>
  );
};

export default page;
