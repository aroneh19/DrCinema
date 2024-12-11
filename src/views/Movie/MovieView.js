import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	Linking,
	StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";

const MovieView = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { movie } = route.params;
	const movies = useSelector((state) => state.movies);
	const selectedCinemaId = movies.selectedCinema.id;

	const renderShowtimes = (schedule, cinemaName) => {
		return schedule.map((item, index) => {
			const dateTime = moment(item.time, "HH.mm (S)").toDate();
			const formattedDate = moment(dateTime).format("ddd. DD. MMM.");
			const formattedTime = item.time.split(" ")[0];

			return (
				<View key={index} style={styles.showtimeItem}>
					<Text style={styles.showtimeText}>
						{formattedDate}, {formattedTime}, {cinemaName || ""}
					</Text>
					<TouchableOpacity
						style={styles.purchaseButton}
						onPress={() => Linking.openURL(item.purchase_url)}>
						<Text style={styles.purchaseButtonText}>Buy Tickets</Text>
					</TouchableOpacity>
				</View>
			);
		});
	};

	const hasTrailersWithResults =
		movie.trailers &&
		movie.trailers.length > 0 &&
		movie.trailers[0].results &&
		movie.trailers[0].results.length > 0;
	const officialTrailer = hasTrailersWithResults
		? movie.trailers[0].results.find(
				(result) => result.name === "Official Trailer"
		  )
		: null;
	const officialTrailerUrl = officialTrailer ? officialTrailer.url : null;
	console.log(hasTrailersWithResults);
	console.log(officialTrailerUrl);
	console.log(officialTrailerUrl);

	return (
		<View style={styles.screenView}>
			<View style={styles.contentContainer}>
				<TouchableOpacity
					style={styles.goBackButton}
					onPress={() => navigation.goBack()}>
					<Text style={styles.goBackText}>{"< Back"}</Text>
				</TouchableOpacity>
				<ScrollView>
					<Text style={styles.movieTitle}>{movie.title}</Text>
					<Image source={{ uri: movie.poster }} style={styles.movieImage} />
					<Text style={styles.moviePlot}>{movie.plot}</Text>
					{movie.durationMinutes && (
						<Text style={styles.movieInfo}>
							{" "}
							Duration: {movie.durationMinutes} min{" "}
						</Text>
					)}
					<Text style={styles.movieInfo}> Release: {movie.year} </Text>
					<Text style={styles.movieInfo}>
						{" "}
						Genres: {movie.genres[0]?.Name || "N/A"}{" "}
					</Text>

					<View style={styles.showtimeList}>
						{movie.showtimes && movie.showtimes.length > 0 ? (
							movie.showtimes.map((showtime, index) => {
								if (showtime.cinema.id === selectedCinemaId) {
									return renderShowtimes(
										showtime.schedule,
										showtime.cinema.name
									);
								}

								return null;
							})
						) : (
							<Text style={styles.noShowtimes}>No showtimes available.</Text>
						)}
					</View>
					{officialTrailerUrl && (
						<WebView
							style={styles.videoPlayer}
							source={{ uri: officialTrailerUrl }}
							allowsFullscreenVideo
						/>
					)}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screenView: {
		flex: 1,
		backgroundColor: "#f8f8f8",
	},
	contentContainer: {
		padding: 20,
	},
	goBackButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "#333",
		borderRadius: 5,
		marginBottom: 15,
		alignSelf: "flex-start",
	},
	goBackText: {
		color: "#fff",
		fontSize: 16,
	},
	movieTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 15,
		color: "#222",
	},
	movieImage: {
		width: "100%",
		height: 300,
		borderRadius: 10,
		marginBottom: 20,
	},
	moviePlot: {
		fontSize: 16,
		color: "#555",
		marginBottom: 15,
		lineHeight: 22,
	},
	movieInfo: {
		fontSize: 14,
		color: "#666",
		marginBottom: 5,
	},
	showtimeList: {
		marginTop: 20,
	},
	showtimeItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#e8e8e8",
		borderRadius: 5,
		marginBottom: 10,
	},
	showtimeText: {
		fontSize: 14,
		color: "#333",
	},
	purchaseButton: {
		backgroundColor: "#007bff",
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: 5,
	},
	purchaseButtonText: {
		color: "#fff",
		fontSize: 14,
	},
	noShowtimes: {
		fontSize: 14,
		color: "#888",
		textAlign: "center",
		marginTop: 20,
	},
	videoPlayer: {
		height: 200,
		borderRadius: 10,
		marginTop: 20,
	},
});

export default MovieView;
