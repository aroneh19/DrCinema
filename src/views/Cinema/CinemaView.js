import React, { useEffect, useState, useRef } from "react";
import { View, FlatList, Text, Animated, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCinemas } from "../../redux/actions/cinemaActions";
import { getUpcomingMovies } from "../../redux/actions/movieActions";
import Cinema from "../../components/Cinema/CinemaList";
import Movie from "../../components/Movie/MovieList";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import moment from "moment";

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

	const formatReleaseDate = (date) =>
		moment(date).format("DD. MMM. YYYY").toLowerCase();

	const renderMovieItem = ({ item }) => (
		<Movie
			movie={{
				poster: item.poster,
				title: item.title,
				year: item.year,
				releasedate: formatReleaseDate(item["release-dateIS"]),
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

		const sortedUpcoming = [...upcomingMovies].sort(
			(a, b) => new Date(a["release-dateIS"]) - new Date(b["release-dateIS"])
		);

		return (
			<FlatList
				data={sortedUpcoming}
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

export default CinemasAndMoviesScreen;
