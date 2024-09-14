import React from "react";

const LatestPosts = ({ data }) => {
  console.log(data, "data");
  return (
    <div className="flex flex-col mt-3 px-5  gap-5 w-full">
      {data?.map((d) => (
        <div className="flex mb-6 gap-3">
          <div>
            <div className="sm:w-[500px] w-full h-full bg-black/40 sm:h-[400px] rounded-2xl overflow-hidden">
              {d?.video ? (
                <div className="w-full h-full">
                  <video
                    src={d?.dps}
                    controls
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <img src={d?.dps} className="w-full h-full object-contain" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 w-full mt-3 gap-2">
            <div className="flex flex-col gap-1">
              <div>Title</div>
              <div>{d?.title}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Description</div>
              <div>{d?.desc}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Likes</div>
              <div>{d?.likes}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Comments</div>
              <div>{d?.totalcomments}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div>Views</div>
              <div>{d?.views}</div>
            </div>
            <div className="flex flex-col gap-1">
              <div>ShareCount</div>
              <div>{d?.sharescount}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestPosts;
