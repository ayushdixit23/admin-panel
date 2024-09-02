import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchErrors = createAsyncThunk(
	'errors/fetchErrors',
	async (page, { rejectWithValue }) => {
		try {
			const response = await axios.get("http://localhost:4050/error/getErrors", {
				params: { q: false, page },
			});
			return response.data;
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message);
		}
	}
);

export const resolveError = createAsyncThunk(
	'errors/resolveError',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.patch(`http://localhost:4050/error/${id}`);
			if (response.status === 200) {
				return id;
			} else {
				throw new Error('Failed to resolve error');
			}
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const errorSlice = createSlice({
	name: 'errors',
	initialState: {
		loading: false,
		errors: [],
		currentPage: 1,
		totalPages: 1,
		errorMsg: '',
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchErrors.pending, (state) => {
				state.loading = true;
				state.errorMsg = '';
			})
			.addCase(fetchErrors.fulfilled, (state, action) => {
				// console.log(action.payload)
				state.loading = false;
				state.errors = action.payload.data;
				state.currentPage = action.payload.currentPage;
				state.totalPages = action.payload.totalPages;
			})
			.addCase(fetchErrors.rejected, (state, action) => {
				state.loading = false;
				state.errorMsg = action.payload || 'Failed to fetch errors';
			})
			.addCase(resolveError.fulfilled, (state, action) => {
				state.errors = state.errors.filter((error) => error._id !== action.payload);
			});
	},
});

export default errorSlice.reducer;
