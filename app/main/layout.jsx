// "use client";
import Header from "../Components/Header";
// import user from "../../public/audio/userdownload.wav";
// import { useEffect, useRef } from "react";

export default function MainLayout({ children }) {
  // const audioRef = useRef();

  // useEffect(() => {
  //   if (audioRef.current) {
  //     const playPromise = audioRef.current.play();
  //     if (playPromise !== undefined) {
  //       playPromise.catch((error) => {
  //         console.log("Autoplay blocked or failed:", error);
  //       });
  //     }
  //   }
  // }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="h-[12vh]">
        <Header />
      </div>

      {/* <div>
        <audio controls src={user} ref={audioRef} />
      </div> */}

      <div className="h-[88vh] dark:bg-[#171717] overflow-y-scroll py-2 px-3 no-scrollbar">
        <div className="dark:bg-[#0D0D0D] rounded-xl">{children}</div>
      </div>
    </div>
  );
}
