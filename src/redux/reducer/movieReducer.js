import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
	name: "movies",
	initialState: {
		selectedCinema: {},
		movies: [],
		upcomingMovies: [],
		moviesAreLoading: false,
		moviesError: undefined,
		upcomingMoviesError: undefined,
	},
	reducers: {
		setSelectedCinemaReceived: (state, action) => {
			state.selectedCinema = action.payload;
		},
		getMoviesByCinemaIdLoading: (state) => {
			state.moviesAreLoading = true;
		},
		getMoviesByCinemaIdReceived: (state, action) => {
			state.moviesAreLoading = false;
			state.moviesError = undefined;
			state.movies = action.payload;
		},
		getMoviesByCinemaIdError: (state, action) => {
			state.moviesAreLoading = false;
			state.moviesError = action.payload;
		},
		getUpcomingMoviesReceived: (state, action) => {
			state.upcomingMoviesError = undefined;
			state.upcomingMovies = action.payload;
		},
		getUpcomingMoviesError: (state, action) => {
			state.upcomingMoviesError = action.payload;
		},
	},
});

export const {
	setSelectedCinemaReceived,
	getMoviesByCinemaIdLoading,
	getMoviesByCinemaIdReceived,
	getMoviesByCinemaIdError,
	getUpcomingMoviesReceived,
	getUpcomingMoviesError,
} = moviesSlice.actions;

export default moviesSlice.reducer;
