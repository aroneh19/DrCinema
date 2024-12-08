import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUpcomingMovies } from '../../redux/movies/movies_slice';
import Movie from '../../components/Movie';

const UpcomingMovies = () => {
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

export default UpcomingMovies;
