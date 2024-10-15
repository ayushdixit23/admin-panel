"use client";
import { API } from "@/Essentials";
import axios from "axios";
import React, { useState } from "react";

const Notification = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const sendNotification = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/pushNotificationToUser`, {
        text,
        title,
      });

      if (res.data.success) {
        console.log("done", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4">
      <div className=" mb-2">Notifications</div>
      <div className="flex space-x-2">
        <input
          className="flex-grow p-2 border border-gray-300 rounded-md outline-none dark:text-white"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <input
          className="flex-grow p-2 border border-gray-300 rounded-md outline-none dark:text-white"
          placeholder="Desc"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />

        <button
          onClick={sendNotification}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Send Notification
        </button>
      </div>
    </div>
  );
};

export default Notification;
