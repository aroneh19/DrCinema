import React, { useEffect, useMemo } from "react";
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesInCinema } from "../../redux/actions/movieActions";
import Movie from "../../components/Movie/MovieList";
import {useNavigation} from "@react-navigation/native";

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
                    <Text style={styles.emptyText}>No movies available for this cinema.</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
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
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#555",
        marginTop: 20,
    },
});

export default MoviesView;
