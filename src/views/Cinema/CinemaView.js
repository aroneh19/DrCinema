import React, { useEffect, useState, useRef } from "react";
import {
	View,
	FlatList,
	Text,
	StyleSheet,
	Animated,
	TouchableOpacity,
} from "react-native";
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
	const { upcomingMovies, error: moviesError } = useSelector(
		(state) => state.movies
	);

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
					disabled={index === selectedNavOption}>
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

		const sortedCinemas = [...cinemas].sort((a, b) =>
			a.name.localeCompare(b.name)
		);
		return (
			<FlatList
				data={sortedCinemas}
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
		backgroundColor: "#f0f4f7", // Light background for modern feel
	},
	header: {
		padding: 40,
		backgroundColor: "#344955", // Darker background for the header
		alignItems: "center",
		borderBottomWidth: 0, // Removed border for a cleaner look
		elevation: 5, // Shadow for Android
		shadowColor: "#000", // Shadow for iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	title: {
		padding: 10,
		fontSize: 24,
		fontWeight: "bold",
		color: "#ffffff", // White text for contrast
	},
	navigationBar: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		paddingVertical: 12,
		backgroundColor: "#f9f9f9", // Light background for the navigation bar
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	navigationOption: {
		alignItems: "center",
		padding: 10,
	},
	navigationText: {
		fontSize: 16,
		fontWeight: "600", // Slightly bolder text
		color: "#344955", // Matching the header color
	},
	underline: {
		height: 3,
		backgroundColor: "#f9aa33", // Bright accent color
		marginTop: 6,
		borderRadius: 2, // Rounded edges for a smooth look
	},
	content: {
		flex: 1,
		padding: 10,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	errorText: {
		color: "#d32f2f", // Bright red for error emphasis
		fontSize: 18,
		fontWeight: "500",
		textAlign: "center",
	},
	listContainer: {
		paddingVertical: 20,
		paddingHorizontal: 16,
	},
});

export default CinemasAndMoviesScreen;
