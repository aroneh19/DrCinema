import React, { useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { getMoviesInCinema } from "../../redux/movies/movies_slice";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../../components/Movie";

const CinemaDetailView = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { cinema } = route.params;

	const dispatch = useDispatch();
	const movies = useSelector((state) => state.movies);

	useEffect(() => {
		dispatch(getMoviesInCinema(cinema));
	}, [cinema]);

	return (
		<View style={styles.screenView}>
			<View style={styles.contentContainer}>
				<TouchableOpacity
					style={styles.goBackButton}
					onPress={() => navigation.goBack()}>
					<Text style={styles.goBackText}>{"< Back"}</Text>
				</TouchableOpacity>
				<ScrollView style={styles.cinemaDetail}>
					<Text style={styles.title}>{cinema.name}</Text>
					<Text style={styles.info}>
						Address: {cinema["address\t"]}, {cinema.city}
					</Text>
					<Text style={styles.info}>Phone number: {cinema.phone}</Text>
					<Text style={styles.link}>Website: {cinema.website}</Text>
					<Text style={styles.description}>{cinema.description}</Text>

					<View>
						{movies.moviesAreLoading ? (
							<Text style={styles.loading}>Loading Movies...</Text>
						) : movies.movies.length === 0 ? (
							<Text style={styles.noMovies}>No movies in {cinema.name}</Text>
						) : movies.moviesError ? (
							<Text style={styles.loading}>
								Error occurred: {movies.moviesError}
							</Text>
						) : (
							<>
								{movies.movies.map((movie, index) => (
									<Movie
										key={index}
										movieData={movie}
										isLastItem={index === movies.movies.length - 1}
									/>
								))}
							</>
						)}
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default CinemaDetailView;
