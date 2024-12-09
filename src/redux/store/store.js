import { configureStore } from '@reduxjs/toolkit';
import cinemaReducer from './cinema/cinema-slice.js';
import moviesReducer from './movies/movies_slice.js';

export default configureStore({
  reducer: {
    cinema: cinemaReducer,
    movies: moviesReducer
  }
});
