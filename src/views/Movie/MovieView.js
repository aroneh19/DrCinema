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
			<ScrollView style={styles.contentContainer}>
				<TouchableOpacity
					style={styles.goBackButton}
					onPress={() => navigation.goBack()}>
					<Text style={styles.goBackText}>{"< Back"}</Text>
				</TouchableOpacity>
				<ScrollView>
					<Text style={styles.movieTitle}>{movie.title}</Text>
					<Image
						source={{ uri: movie.poster }}
						style={styles.movieImage}
						resizeMode="contain" // Ensure the entire image is visible
					/>
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
					<Text style={styles.moviePlot}>{movie.plot} </Text>

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
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	screenView: {
		paddingVertical: 20,
		flex: 1,
		backgroundColor: "#f0f4f7", // Light background for a modern look
	},
	contentContainer: {
		padding: 20,
	},
	goBackButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "#344955", // Consistent dark accent
		borderRadius: 8,
		marginBottom: 20,
		alignSelf: "flex-start",
		elevation: 3, // Shadow for Android
		shadowColor: "#000", // Shadow for iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	goBackText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	movieTitle: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#344955", // Matches other headings
		textAlign: "center",
	},
	movieImage: {
		width: "100%",
		height: 300,
		borderRadius: 100, // Smooth rounded corners
		marginBottom: 20,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 10,
		shadowRadius: 10,
	},
	moviePlot: {
		fontSize: 16,
		color: "#555",
		marginBottom: 8,
		lineHeight: 24,
		marginTop: 8,
	},
	movieInfo: {
		fontSize: 16,
		color: "#555", // Neutral color for info text
		marginBottom: 8,
	},
	showtimeList: {
		marginTop: 20,
	},
	showtimeItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
		backgroundColor: "#ffffff", // White background for showtime cards
		borderRadius: 8,
		marginBottom: 12,
		elevation: 2, // Light shadow
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	showtimeText: {
		fontSize: 14,
		color: "#344955",
		fontWeight: "600",
	},
	purchaseButton: {
		backgroundColor: "#f9aa33", // Accent color
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 6,
	},
	purchaseButtonText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "bold",
	},
	noShowtimes: {
		fontSize: 16,
		color: "#888",
		textAlign: "center",
		marginTop: 20,
		fontStyle: "italic",
	},
	videoPlayer: {
		height: 220,
		borderRadius: 12,
		marginTop: 20,
		marginBottom: 20,
		overflow: "hidden",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
});

export default MovieView;
