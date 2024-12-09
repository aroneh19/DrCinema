import {
	setSelectedCinemaReceived,
	getMoviesByCinemaIdLoading,
	getMoviesByCinemaIdReceived,
	getMoviesByCinemaIdError,
	getUpcomingMoviesReceived,
	getUpcomingMoviesError,
} from "../reducer/movieReducer";
import { getAccessToken, baseUrl } from "../auth/auth.js";

export const getMoviesInCinema = (cinemaData) => {
	return async (dispatch) => {
		try {
			dispatch(getMoviesByCinemaIdLoading());
			const accessToken = await getAccessToken();
			const response = await fetch(`${baseUrl}/movies`, {
				method: "GET",
				headers: {
					"x-access-token": accessToken,
				},
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const movies = await response.json();

			const filteredMovies = movies.filter((movie) =>
				movie.showtimes.some((showtime) => showtime.cinema.id === cinemaData.id)
			);

			dispatch(getMoviesByCinemaIdReceived(filteredMovies));
			dispatch(setSelectedCinemaReceived(cinemaData));
		} catch (err) {
			dispatch(getMoviesByCinemaIdError(err.toString()));
		}
	};
};

export const getUpcomingMovies = () => {
	return async (dispatch) => {
		try {
			const accessToken = await getAccessToken();
			const response = await fetch(`${baseUrl}/upcoming`, {
				method: "GET",
				headers: {
					"x-access-token": accessToken,
				},
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const upcomingMovies = await response.json();

			dispatch(getUpcomingMoviesReceived(upcomingMovies));
		} catch (error) {
			dispatch(getUpcomingMoviesError(error.message));
		}
	};
};
