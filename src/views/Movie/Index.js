import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import styles from './styles';
import { useSelector } from 'react-redux';

const Movie = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { movie } = route.params;
    const movies = useSelector((state) => state.movies);
    const selectedCinemaId = movies.selectedCinema.id;

    const renderShowtimes = (schedule, cinemaName) => {
        return schedule.map((item, index) => (
            <View key={index} style={styles.showtimeItem}>
                <Text style={styles.showtimeText}>{item.time.substring(0, 5)}{ cinemaName !== undefined ? ', ' + cinemaName : '' }</Text>
                <TouchableOpacity
                    style={styles.purchaseButton}
                    onPress={() => Linking.openURL(item.purchase_url)}
                >
                    <Text style={styles.purchaseButtonText}>Buy Tickets</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    const hasTrailersWithResults = movie.trailers && movie.trailers.length > 0 && movie.trailers[0].results && movie.trailers[0].results.length > 0;
    const officialTrailer = hasTrailersWithResults ? movie.trailers[0].results.find(result => result.name === 'Official Trailer') : null;
    const officialTrailerUrl = officialTrailer ? officialTrailer.url : null;

    return (
        <View style={styles.screenView}>
            <View style={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.goBackButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.goBackText}>{'< Back'}</Text>
                </TouchableOpacity>
                <ScrollView>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <Image
                        source={{ uri: movie.poster }}
                        style={styles.movieImage}
                    />
                    <Text style={styles.moviePlot}>{movie.plot}</Text>
                    { movie.durationMinutes && <Text style={styles.movieInfo}> Duration: {movie.durationMinutes} min </Text>}
                    <Text style={styles.movieInfo}> Release: {movie.year} </Text>
                    <Text style={styles.movieInfo}> Genres: {movie.genres[0].Name} </Text>

                    <View style={styles.showtimeList}>
                        {movie.showtimes && movie.showtimes.length > 0
                            ? movie.showtimes.map((showtime, index) => {
                                if (showtime.cinema.id === selectedCinemaId) {
                                    return renderShowtimes(showtime.schedule, showtime.cinema.name);
                                }

                                return null;
                            })
                            : null}
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

export default Movie;
