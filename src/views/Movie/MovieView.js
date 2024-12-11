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
} from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import { styles } from "./styles";

const MovieView = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { movie } = route.params;
	const movies = useSelector((state) => state.movies);
	const selectedCinemaId = movies.selectedCinema.id;

	const formatReleaseDate = (date) =>
		moment(date).format("DD. MMM. YYYY").toLowerCase();

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
					<Text style={styles.movieInfo}> Year: {movie.year} </Text>
					<Text style={styles.movieInfo}>
						{" "}
						Release Date: {formatReleaseDate(movie["release-dateIS"])}
					</Text>
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

export default MovieView;
