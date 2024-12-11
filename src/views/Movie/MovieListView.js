import React, { useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesInCinema } from "../../redux/actions/movieActions";
import Movie from "../../components/Movie/MovieList";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./stylesList";

const MoviesScreen = ({ route }) => {
	const navigation = useNavigation();
	const { cinema } = route.params; // Get selected cinema ID
	const dispatch = useDispatch();

	const { movies, moviesAreLoading } = useSelector((state) => state.movies);

	useEffect(() => {
		dispatch(getMoviesInCinema(cinema)); // Fetch all movies on mount
	}, [dispatch]);

	if (moviesAreLoading) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Movies are Loading</Text>
			</View>
		);
	}

	const renderMovieItem = ({ item }) => (
		<Movie
			movie={item}
			onPress={() => navigation.navigate("MovieView", { movie: item })}
		/>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={movies}
				keyExtractor={(item) => item._id}
				renderItem={renderMovieItem}
				ListEmptyComponent={
					<Text style={styles.emptyText}>
						No movies available for this cinema.
					</Text>
				}
			/>
		</View>
	);
};

export default MoviesScreen;
