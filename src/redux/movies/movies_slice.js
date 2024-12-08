import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken, baseUrl } from '../auth/auth.js';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    selectedCinema: {},
    movies: [],
    upcomingMovies: [],
    moviesAreLoading: false,
    moviesError: undefined,
    upcomingMoviesError: undefined
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
    }
  }
});

const {
  setSelectedCinemaReceived,
  getMoviesByCinemaIdLoading,
  getMoviesByCinemaIdReceived,
  getMoviesByCinemaIdError,
  getUpcomingMoviesReceived,
  getUpcomingMoviesError
} = moviesSlice.actions;

export function getMoviesInCinema (cinemaData) {
  return async (dispatch) => {
    try {
      dispatch(getMoviesByCinemaIdLoading());
      const accessToken = await getAccessToken();
      const response = await fetch(`${baseUrl}/movies`, {
        method: 'GET',
        headers: {
          'x-access-token': accessToken
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const movies = await response.json();

      const filteredMovies = movies.filter(movie =>
        movie.showtimes.some(showtime => showtime.cinema.id === cinemaData.id)
      );

      dispatch(getMoviesByCinemaIdReceived(filteredMovies));
      dispatch(setSelectedCinemaReceived(cinemaData));
    } catch (err) {
      dispatch(getMoviesByCinemaIdError(err.toString()));
    }
  };
}

export function getUpcomingMovies () {
  return async (dispatch) => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(`${baseUrl}/upcoming`, {
        method: 'GET',
        headers: {
          'x-access-token': accessToken
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const upcomingMovies = await response.json();

      dispatch(getUpcomingMoviesReceived(upcomingMovies));
    } catch (error) {
      dispatch(getUpcomingMoviesError(error.message));
    }
  };
}

export default moviesSlice.reducer;
