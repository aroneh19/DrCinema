import { configureStore } from "@reduxjs/toolkit";
import cinemaReducer from "./reducer/cinemaReducer";
import moviesReducer from "./reducer/movieReducer";

export default configureStore({
	reducer: {
		cinema: cinemaReducer,
		movies: moviesReducer,
	},
});
