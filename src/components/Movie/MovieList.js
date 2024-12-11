import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const Movie = ({ movie, onPress }) => {
	return (
		<TouchableOpacity style={styles.movieItem} onPress={onPress}>
			<Image source={{ uri: movie.poster }} style={styles.thumbnail} />
			<View style={styles.details}>
				<Text style={styles.title}>{movie.title}</Text>
				<Text style={styles.year}>Year: {movie.year}</Text>
				{movie.releasedate && (
					<Text style={styles.year}>Release Date: {movie.releasedate}</Text>
				)}
				<Text style={styles.genres}>
					Genres:{" "}
					{movie.genres && Array.isArray(movie.genres)
						? movie.genres
								.map((genre) => genre.Name?.trim() || "Unknown")
								.join(", ")
						: "Unknown"}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Movie;
