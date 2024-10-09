"use client";
import React, { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { GrUploadOption } from "react-icons/gr";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PiVideoFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setThumbnailImage } from "@/app/redux/postSilce";
import FileUpload from "./FileUpload";
import PostLoading from "./PostLoading";

const CreatePost = ({
  id,
  comid,
  mediaType,
}) => {

  const dispatch = useDispatch();
  const posturl = "https://dt46iilh1kepb.cloudfront.net/";
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(false);
  const [uiThumbnail, setUiThumbnail] = useState(false);
  // const [postAnything] = useCreatePostMutation();
  const router = useRouter();
  const thumbnailImage = useSelector(
    (state) => state?.createPostSlice?.thumbnailImage
  );

  const progress = useSelector((state) => state?.createPostSlice?.progress);
  const isComplete = useSelector((state) => state?.createPostSlice?.isComplete);
 
  const post = useSelector((state) => state?.createPostSlice?.post);

  const savePost = async () => {
    await FileUpload(
        dispatch, post, setLoading, id, comid, router, mediaType, thumbnailImage
    );
  };

  const handleImage = (e) => {
    const files = e.target.files;
    const newMedia = Array.from(files);
    const maxSlots = 10;

    if (
      post?.image.length == 0 &&
      post?.video.length == 0 &&
      e.target.files[0].type.startsWith("video")
    ) {
      setUiThumbnail(true);
    }

    setThumbnail(false);

    const newPostState = (prevPost) => {
      const combinedMedia = [
        ...(prevPost?.image || []),
        ...(prevPost?.video || []),
        ...newMedia,
      ];

      const media = combinedMedia.slice(0, maxSlots);

      const existingVideos = prevPost?.video.filter(
        (video) => typeof video === "string" && video.startsWith(posturl)
      );
      const existingImages = prevPost?.image.filter(
        (image) => typeof image === "string" && image.startsWith(posturl)
      );

      return {
        ...prevPost, // Spread previous state
        image: [
          ...existingImages,
          ...media.filter(
            (file) => file.type && file.type.startsWith("image/")
          ),
        ],
        video: [
          ...existingVideos,
          ...media.filter(
            (file) => file.type && file.type.startsWith("video/")
          ),
        ],
      };
    };

    // Dispatch with the new state
    dispatch(setPost(newPostState(post)));

   
  };

  const handleUpload = (e) => {
    if (
      post?.image.length == 0 &&
      post?.video.length == 1 &&
      e.target.files[0].type.startsWith("image")
    ) {
      handleThumbnail(e);
    } else if (
      post?.image.length == 0 &&
      post?.video.length == 1 &&
      e.target.files[0].type.startsWith("video")
    ) {
      toast.error("Upload Thumbnail for video!");
      return;
    } else {
      handleImage(e);
    }
  };

  const handleThumbnail = (e) => {
    try {
      setThumbnail(true);
      const image = e.target.files[0];
      dispatch(setThumbnailImage(image));
      setUiThumbnail(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTagsRemove = (indexToRemove) => {
    dispatch(
      setPost({
        ...post,
        tags: [...post?.tags.filter((_, i) => i !== indexToRemove)],
      })
    );
  };

  const handleMediaRemove = (indexToRemove, media) => {
    if (post?.video.length === 1 || post?.video.length === 0) {
      setUiThumbnail(false);
      dispatch(setThumbnailImage(""));
      dispatch(
        setPost((prevPost) => {
          let updatedPost = { ...prevPost };

          if (thumbnailImage) {
            updatedPost?.image.push(thumbnailImage);
          }

          updatedPost[media] = prevPost[media].filter(
            (_, i) => i !== indexToRemove
          );

          return updatedPost;
        })
      );
    } else {
      // If there are more than one video, simply remove the item from the specified media array
      dispatch(
        setPost((prevPost) => ({
          ...prevPost,
          [media]: prevPost[media].filter((_, i) => i !== indexToRemove),
        }))
      );
    }
  };


  const saveOrEditPost = async () => {
      await savePost()
  };

  useEffect(() => {
    if (post?.video.length === 1 && post?.image.length === 0) {
      setUiThumbnail(true);
    }
  }, [post?.video, post?.image]);

   if (loading) {
    return (
      <>
        <div className="fixed inset-0 w-screen bg-black bg-opacity-50  z-50 h-screen flex justify-center items-center ">
          <div>
            <PostLoading progress={progress} isComplete={isComplete}/>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
  
      <div
        className={`${
          mediaType
            ? "sm:fixed sm:inset-0 w-screen sm:p-2 z-40 bg-[#cccccc33] sm:h-screen flex justify-center items-center"
            : "hidden -z-50"
        }`}
      >
        <div className="flex flex-col justify-center sm:mb-0 mb-[10%] shadow-md items-center p-3 sm:rounded-xl w-full sm:max-w-[90%] md:max-w-[80%] dark:bg-[#273142] bg-white">
          <div className="flex justify-between w-full items-center p-2">
            <div className="flex justify-center items-center gap-4">
              <div
                onClick={() => {
           
              router.push(`/main/user`);
                }}
                className="cursor-pointer"
              >
                <div>
                  <MdArrowBack className="text-2xl text-[#A5BEFE]" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="pp:text-xl font-semibold">Post On Grovyo</div>
                <div className="pn:max-pp:hidden">
                  You can add up to 4 images or videos.
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              {/* <div className='font-medium p-2 pn:max-pp:hidden px-7 rounded-lg'>Preview</div> */}
              <div
                onClick={saveOrEditPost}
                className="bg-[#4880FF] cursor-pointer font-medium text-white p-2 px-4 pp:px-7 rounded-lg"
              >
                Publish
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 w-full gap-5 p-3">
            <div className="w-full flex flex-col gap-2">
              {mediaType === "video" ? (
                // video
                <div className="w-full">
                  {post?.video?.length > 0 ? (
                    <>
                      {post?.video.map((d, index) => (
                        <div
                          key={index}
                          className="w-full h-[300px] relative rounded-xl overflow-hidden"
                        >
                          <video
                            className="h-full w-full object-cover"
                            src={
                              typeof d === "string" ? d : URL.createObjectURL(d)
                            }
                            controls
                          />
                          <div
                            onClick={() => {
                              dispatch(
                                setPost({
                                  ...post,
                                  video: post?.video.filter(
                                    (_, i) => i !== index
                                  ),
                                })
                              );
                            }}
                            className="absolute cursor-pointer top-0 right-0 p-2"
                          >
                            <RxCross2 />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <label
                      htmlFor="postUpload"
                      className="w-full h-[220px] cursor-pointer shadow-md rounded-2xl"
                    >
                      <div className="h-[220px] dark:border-[#fff] w-full border border-dashed p-2 rounded-2xl flex flex-col justify-center items-center">
                        <div className="rounded-full">
                          <PiVideoFill className="text-5xl dark:text-white text-black" />
                        </div>
                        <div className="text-center mt-2 flex justify-center items-center flex-col">
                          <div className="font-medium">Upload Video</div>
                        </div>
                      </div>
                    </label>
                  )}

                  <input
                    accept="video/*"
                    name="image"
                    onChange={handleUpload}
                    type="file"
                    id="postUpload"
                    className="hidden w-full"
                  />

                  <input
                    accept="image/*"
                    name="image"
                    onChange={(e) =>
                      dispatch(setThumbnailImage(e.target.files[0]))
                    }
                    type="file"
                    id="thumbnailImage"
                    className="hidden w-full"
                  />

                  {thumbnailImage ? (
                    <div className="relative mt-4 w-[200px] h-[120px]">
                      <img
                        src={
                          typeof thumbnailImage === "string"
                            ? thumbnailImage
                            : URL.createObjectURL(thumbnailImage)
                        }
                        className="rounded-lg bg-black object-contain w-full h-full"
                      />
                      <div
                        onClick={() => {
                          dispatch(setThumbnailImage(""));
                          setUiThumbnail(true);
                        }}
                        className="absolute cursor-pointer top-0 right-0 p-1"
                      >
                        <RxCross2 />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <label
                        htmlFor="thumbnailImage"
                        className="w-[200px]  cursor-pointer shadow-md rounded-2xl"
                      >
                        <div className="dark:border-[#fff] w-[200px] border border-dashed p-2 py-7 rounded-2xl flex flex-col justify-center items-center">
                          <div className="rounded-full">
                            <FaImages className="text-2xl dark:text-white text-black" />
                          </div>
                          <div className="text-center mt-2 flex justify-center items-center flex-col">
                            <div className="font-medium text-sm">
                              Add Thumbnail
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              ) : (
                // image
                <div className="w-full">
                  <label
                    htmlFor="postUpload"
                    className="w-full h-[220px] cursor-pointer shadow-md rounded-lg"
                  >
                    <div className="h-[220px] dark:border-[#fff] w-full border border-dashed p-2 rounded-lg flex flex-col justify-center items-center">
                      <div className="p-5 bg-[#F0F4FF] rounded-full">
                        <GrUploadOption className="text-4xl text-[#379AE6] font-thin" />
                      </div>
                      <div className="text-center mt-2 flex justify-center items-center flex-col">
                        <div className="font-medium">
                          <span className="text-[#379AE6]">
                            Click to choose file
                          </span>{" "}
                          or drag and drop.
                        </div>
                        <div className="text-sm text-[#6F7787]">
                          Your ideas will be private until you publish them.
                        </div>
                      </div>
                    </div>
                  </label>

                  <input
                    accept="image/*, video/*"
                    name="image"
                    onChange={handleUpload}
                    type="file"
                    id="postUpload"
                    className="hidden w-full"
                  />

                  <div className="flex items-center gap-4 mt-4">
                    {post?.image.map((d, i) => (
                      <div key={i} className="relative w-[100px] h-[100px]">
                        <img
                          src={
                            typeof d === "string" ? d : URL.createObjectURL(d)
                          }
                          width={100}
                          height={100}
                          alt="image"
                          className="rounded-lg w-full object-contain bg-black h-full "
                        />

                        <div
                          onClick={() => handleMediaRemove(i, "image")}
                          className="absolute cursor-pointer top-0 right-0 p-1"
                        >
                          <RxCross2 />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* <div className="text-sm text-[#6F7787]">
                We recommend high-quality .jpg, .png files less than 20MB or
                .mp4 files 100MB.
              </div> */}
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col w-full gap-1">
                <div>Title</div>
                <div>
                  <input
                    type="text"
                    value={post?.title}
                    onChange={(e) =>
                      dispatch(setPost({ ...post, title: e.target.value }))
                    }
                    className="p-1.5 px-3 bg-[#FAFAFA] dark:bg-[#323d4e] outline-none rounded-lg w-full"
                    placeholder="Enter Title"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Description</div>
                <div>
                  <textarea
                    className="outline-none p-2 bg-[#FAFAFA] dark:bg-[#323d4e] w-[100%] no-scrollbar resize-y rounded-lg min-h-32 max-h-48 "
                    type="text"
                    value={post?.desc}
                    onChange={(e) =>
                      dispatch(setPost({ ...post, desc: e.target.value }))
                    }
                    placeholder="Describe the Post in few words"
                    maxLength={500}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <div>Add Hashtags</div>
                <div className="w-full bg-[#FAFAFA] dark:bg-[#323d4e] rounded-lg flex justify-center items-center">
                  <input
                    value={post?.sampletags}
                    onChange={(e) =>
                      dispatch(setPost({ ...post, sampletags: e.target.value }))
                    }
                    type="text"
                    className="p-1.5 px-3 bg-transparent outline-none rounded-lg w-full"
                    placeholder="Enter Hastags"
                  />
                  <button
                    onClick={() => {
                      if (!post?.sampletags) {
                        return;
                      }
                      dispatch(
                        setPost({
                          ...post,
                          tags: [...post?.tags, post?.sampletags],
                          sampletags: "",
                        })
                      );
                    }}
                    className="flex justify-center items-center p-2 rounded-r-lg text-[#2461FD] dark:bg-[#3d4654] dark:text-white bg-[#F0F4FF]"
                  >
                    <div>
                      <MdAdd />
                    </div>
                    <div>Add</div>
                  </button>
                </div>
                <div className="flex items-center pt-2 flex-wrap gap-2">
                  {post?.tags?.length > 0 &&
                    post?.tags?.map((d, g) => (
                      <div
                        key={g}
                        className="bg-[#FDF8F1] flex justify-center items-center gap-2 text-[#E7A034] p-1 rounded-full px-4"
                      >
                        <div>{d}</div>
                        <div onClick={() => handleTagsRemove(g)}>
                          <RxCross2 />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
