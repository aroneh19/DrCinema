import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCinemas } from "../../redux/actions/cinemaActions";
import { getUpcomingMovies } from "../../redux/actions/movieActions";
import Cinema from "../../components/Cinema/CinemaList";
import Movie from "../../components/Movie/MovieList";
import { useNavigation } from "@react-navigation/native";

const CinemasAndMoviesScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCinemas());
		dispatch(getUpcomingMovies());
	}, [dispatch]);


	const { cinemas, error: cinemaError } = useSelector((state) => state.cinema);
	const { upcomingMovies, error: moviesError } = useSelector((state) => state.movies);


	const [selectedNavOption, setSelectedNavOption] = useState(0);
	const underlineWidth = useRef(new Animated.Value(100)).current;

	useEffect(() => {
		Animated.timing(underlineWidth, {
			toValue: 100,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [selectedNavOption]);

	const navigationOptions = [
		{ name: "Cinemas", onPress: () => setSelectedNavOption(0) },
		{ name: "Upcoming Movies", onPress: () => setSelectedNavOption(1) },
	];

	const renderNavigationBar = () => (
		<View style={styles.navigationBar}>
			{navigationOptions.map((option, index) => (
				<TouchableOpacity
					key={index}
					style={styles.navigationOption}
					onPress={option.onPress}
					disabled={index === selectedNavOption}
				>
					<Text style={styles.navigationText}>{option.name}</Text>
					{index === selectedNavOption && (
						<Animated.View
							style={[styles.underline, { width: underlineWidth }]}
						/>
					)}
				</TouchableOpacity>
			))}
		</View>
	);

	const renderCinemaItem = ({ item }) => (
		<Cinema
			cinema={item}
			onPress={() => navigation.navigate("CinemaDetailView", { cinema: item })}
		/>
	);

	const renderMovieItem = ({ item }) => (
		<Movie
			movie={{
				poster: item.poster,
				title: item.title,
				year: item.year,
				genres: item.genres || [], // Ensure it's an array
			}}
			onPress={() => navigation.navigate("MovieView", { movie: item })}
		/>
	);

	const renderCinemas = () => {
		if (cinemaError) {
			return (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{cinemaError}</Text>
				</View>
			);
		}

		return (
			<FlatList
				data={cinemas}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderCinemaItem}
				contentContainerStyle={styles.listContainer}
			/>
		);
	};

	const renderUpcomingMovies = () => {
		if (moviesError) {
			return (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{moviesError}</Text>
				</View>
			);
		}

		return (
			<FlatList
				data={upcomingMovies}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderMovieItem}
				contentContainerStyle={styles.listContainer}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			<View style={styles.header}>
				<Text style={styles.title}>Dr. Cinema</Text>
				{renderNavigationBar()}
			</View>
			<View style={styles.content}>
				{selectedNavOption === 0 ? renderCinemas() : renderUpcomingMovies()}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		padding: 16,
		backgroundColor: "#f8f8f8",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
	navigationBar: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		paddingVertical: 8,
	},
	navigationOption: {
		alignItems: "center",
	},
	navigationText: {
		fontSize: 16,
		color: "#333",
	},
	underline: {
		height: 2,
		backgroundColor: "tomato",
		marginTop: 4,
	},
	content: {
		flex: 1,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "red",
		fontSize: 16,
	},
	listContainer: {
		padding: 16,
	},
});

export default CinemasAndMoviesScreen;
