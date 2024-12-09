import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const Movie = ({ movie, onPress }) => {
    return (
        <TouchableOpacity style={styles.movieItem} onPress={onPress}>
            <Image source={{ uri: movie.poster }} style={styles.thumbnail} />
            <View style={styles.details}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.year}>Year: {movie.year}</Text>
                <Text style={styles.genres}>
                    Genres: {movie.genres.map((genre) => genre.Name.trim()).join(", ")}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    movieItem: {
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    thumbnail: {
        width: 80,
        height: 120,
        marginRight: 12,
        borderRadius: 4,
    },
    details: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    year: {
        fontSize: 14,
        color: "#555",
        marginVertical: 4,
    },
    genres: {
        fontSize: 14,
        color: "#777",
    },
});

export default Movie;
