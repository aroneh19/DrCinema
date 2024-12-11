import {useEffect} from "react";
import {getUpcomingMovies} from "../../redux/actions/movieActions";
import {useDispatch, useSelector} from "react-redux";
import {View} from "react-native";
import Movie from "../../components/Movie/MovieList";


const UpcomingMovieList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUpcomingMovies());
    }, []);

    const upcomingMovies = useSelector((state) => state.upcomingMovies);

    const upcomingMoviesList = () => {
        if (upcomingMovies.upcomingMovies && Array.isArray(upcomingMovies.upcomingMovies)) {
            return upcomingMovies.upcomingMovies.map((movie, index) => (
                <Movie key={movie.id} movieData={movie} isLastItem={index === upcomingMovies.upcomingMovies.length - 1} />
            ));
        } else {
            return <Text style={styles.title}>No upcoming movies</Text>;
        }
    };

    return (
        <View style={styles.screenView}>
            <View>
                {upcomingMovies.upcomingMoviesAreLoading
                    ? (<Text style={styles.loading}>Loading Movies...</Text>)
                    : upcomingMovies.upcomingMovies.length === 0
                        ? (<Text style={styles.noMovies}>No upcoming movies</Text>)
                        : (
                            <>
                                {upcomingMoviesList()}
                            </>
                        )}
            </View>
        </View>
    );
};

export default UpcomingMovieList
