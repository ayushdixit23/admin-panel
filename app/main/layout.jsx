"use client";
import { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import user from "../../public/audio/userdownload.wav";
import community from "../../public/audio/community.mp3";
import post from "../../public/audio/post.mp3";
import product from "../../public/audio/product.mp3";
import order from "../../public/audio/order.mp3";
import store from "../../public/audio/store.mp3";
import delivery from "../../public/audio/delivery.mp3";
import creator from "../../public/audio/creator.mp3";
import { useSocketContext } from "../Components/SocketWrapper";

export default function MainLayout({ children }) {
  const audioRef = useRef();
  const [audioToPlay, setAudioToPlay] = useState("");
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      const handleAudioPlay = (audioSource) => {
        console.log("Received audio event:", audioSource);
        setAudioToPlay(audioSource);
      };

      socket.on("admin-new-user", () => handleAudioPlay(user));
      socket.on("admin-new-community", () => handleAudioPlay(community));
      socket.on("admin-new-order", () => handleAudioPlay(order));
      socket.on("admin-new-product", () => handleAudioPlay(product));
      socket.on("admin-new-store", () => handleAudioPlay(store));
      socket.on("admin-new-delivery", () => handleAudioPlay(delivery));
      socket.on("admin-new-creator-user", () => handleAudioPlay(creator));
      socket.on("admin-new-post", () => handleAudioPlay(post));

      return () => {
        socket.off("admin-new-user");
        socket.off("admin-new-community");
        socket.off("admin-new-order");
        socket.off("admin-new-product");
        socket.off("admin-new-store");
        socket.off("admin-new-delivery");
        socket.off("admin-new-creator-user");
        socket.off("admin-new-post");
      };
    }
  }, [socket]);

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current.load();
        await audioRef.current.play(); 
        console.log("Audio played successfully.");
      } catch (error) {
        console.log("Audio play blocked or failed:", error);
      }
    };

    playAudio();
  }, [audioToPlay]); 
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="h-[12vh]">
        <Header />
      </div>
      <div className="h-[88vh] dark:bg-[#171717] overflow-y-scroll py-2 px-3 no-scrollbar">
        <div>
          <audio controls src={audioToPlay} className="hidden" ref={audioRef} />
        </div>
        <div className="dark:bg-[#0D0D0D] rounded-xl">{children}</div>
      </div>
    </div>
  );
}
