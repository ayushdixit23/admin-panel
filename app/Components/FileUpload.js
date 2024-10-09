import axios from "axios";
import { completeUpload, setMergedDatas, setPost, setProgress, setThumbnailImage, startUpload } from "@/app/redux/postSilce";
import toast from "react-hot-toast";

const FileUpload = async (dispatch, post, setLoading, id, comid, router, mediaType, thumbnailImage) => {
	try {
		console.log(post, "post from upload")
		if (post?.image?.length === 0 && !thumbnailImage) {
			toast.error("Enter required details");
			console.log(post, "post");
			return;
		}
		setLoading(true)
        dispatch(startUpload());
		const data = new FormData();
		data.append("title", post.title);
		data.append("desc", post.desc);
		data.append("tags", post.tags);
	
		data.append("thumbnail", mediaType === "video" ? true : false);
		data.append("thumbnailImage", thumbnailImage);
		post?.image.forEach((d) => {
			data.append("image", d);
		});
		post?.video.forEach((d) => {
			data.append("video", d);
		});

		const res = await axios.post(
			`https://monarchs.grovyo.xyz/api/post/postanythingworkspace/${id}/${comid}`,
			data,
			{
				onUploadProgress: (progressEvent) => {
					const total = progressEvent.total;
					const current = progressEvent.loaded;
					const percentage = Math.floor((current / total) * 100);
					dispatch(setProgress(percentage));
				},
			}
		);

		if (res.data.success) {
            dispatch(completeUpload());
			toast.success("Post Created!");
            setLoading(false)
            router.push("/main/user")
			
        }

		dispatch(setPost({
			title: "",
			desc: "",
			tags: [],
			image: [],
			video: [],
			sampletags: "",
		}))
        dispatch(setThumbnailImage(""))
	} catch (error) {
		console.log(error)
	}finally{
        setLoading(false)
    }
}


export default FileUpload