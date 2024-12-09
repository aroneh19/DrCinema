import { createSlice } from "@reduxjs/toolkit";

const cinemaSlice = createSlice({
	name: "cinema",
	initialState: {
		cinemas: [],
		cinemasError: undefined,
	},
	reducers: {
		getCinemasReceived: (state, action) => {
			state.cinemasError = undefined;
			state.cinemas = action.payload;
		},
		getCinemasError: (state, action) => {
			state.cinemasError = action.payload;
		},
	},
});

export const { getCinemasReceived, getCinemasError } = cinemaSlice.actions;

export default cinemaSlice.reducer;
