import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
	name: "createPostSlice",
	initialState: {
		post: {
			title: "",
			desc: "",
			tags: [],
			image: [],
			video: [],
			sampletags: "",
		},
		mergedData: [],
		thumbnailImage: "",
		isLoading: false,
		progress: 0,
		isComplete: false,
		comid: "",
	},
	reducers: {
		setPost: (state, action) => {
			state.post = {
				...state.post,
				...action.payload,
			};
		},
		setMergedData: (state, action) => {
			state.mergedData = action.payload;
		},
		setMergedDatas: (state, action) => {
			state.mergedData = [...state.mergedData, action.payload];
		},
		setThumbnailImage: (state, action) => {
			state.thumbnailImage = action.payload
		},
		startUpload: (state) => {
			state.isLoading = true;
			state.progress = 0;
			state.isComplete = false;
		},
		setProgress: (state, action) => {
			state.progress = action.payload;
		},
		completeUpload: (state) => {
			state.isLoading = false;
			state.isComplete = true;
		},
		setComid: (state, action) => {
			state.comid = action.payload
		}
	},
});

export const { setPost, setMergedData, setMergedDatas, setComid, setThumbnailImage, completeUpload, setProgress, startUpload } = createPostSlice.actions;
export default createPostSlice.reducer;