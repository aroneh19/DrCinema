import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import styles from './styles';
import Cinema from '../../components/Cinema';
import { useDispatch, useSelector } from 'react-redux';
import { getCinemas } from '../../redux/cinema/cinema-slice';
import { getUpcomingMovies } from '../../redux/movies/movies_slice';
import Movie from '../../components/Movie';

const Cinemas = () => {
  const dispatch = useDispatch();

  // region Data Fetching

  useEffect(() => {
    dispatch(getCinemas());
  }, []);

  useEffect(() => {
    dispatch(getUpcomingMovies());
  }, []);

  // endregion

  const cinema = useSelector((state) => state.cinema);
  const upcomingMovies = useSelector((state) => state.movies);

  const getSortedCinemaList = () => {
    return [...cinema.cinemas].sort((a, b) => a.name.localeCompare(b.name));
  };

  // region List Rendering

  const cinemaList = () => {
    if (cinema.cinemas && Array.isArray(cinema.cinemas)) {
      return getSortedCinemaList().map((cin, index) => (
        <Cinema key={cin.id} cinemaData={cin} isLastItem={index === cinema.cinemas.length - 1} />
      ));
    } else {
      return <Text style={styles.title}>No cinemas</Text>;
    }
  };

  const upcomingMoviesList = () => {
    if (upcomingMovies.upcomingMovies && Array.isArray(upcomingMovies.upcomingMovies)) {
      return upcomingMovies.upcomingMovies.map((movie, index) => (
        <Movie key={movie.id} movieData={movie} isLastItem={index === upcomingMovies.upcomingMovies.length - 1} />
      ));
    } else {
      return <Text style={styles.title}>No upcoming movies</Text>;
    }
  };

  // endregion

  // region Navigation
  const [selectedNavOption, setSelectedNavOption] = useState(0);

  const underlineWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(underlineWidth, {
      toValue: 32,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [selectedNavOption]);

  const navigationOptions = [
    {
      name: 'Cinemas',
      onPress: () => {
        setSelectedNavOption(0);
        underlineWidth.setValue(0);
      }
    },
    {
      name: 'Upcoming Movies',
      onPress: () => {
        setSelectedNavOption(1);
        underlineWidth.setValue(0);
      }
    }
  ];

  const navigationBar = () => {
    return (
      <View style={ styles.navigation }>
        { navigationOptions.map((option, index) => (
          <TouchableOpacity key={ index } style={ styles.navigationOption } onPress={ option.onPress } disabled={ index === selectedNavOption }>
            <Text style={ styles.navigationOptionText }>{ option.name }</Text>
            <Animated.View style={ index === selectedNavOption ? [styles.navigationSelectedIndicator, { width: underlineWidth }] : [styles.navigationSelectedIndicator, styles.navigationSelectedIndicatorHidden] }></Animated.View>
          </TouchableOpacity>
        )) }
      </View>
    );
  };

  // endregion

  // region Tabs
  const tabs = [
    <>
      <ScrollView style={ styles.cinemaListContainer }>
        {cinema.cinemasError
          ? (<Text style={styles.error}>Error occurred: {cinema.cinemasError}</Text>)
          : (
            <>
              { cinemaList() }
            </>
            )
        }
      </ScrollView>
    </>,
    <>
      <ScrollView style={ styles.upcomingMoviesScrollView }>
        {upcomingMovies.upcomingMoviesError
          ? (<Text style={styles.error}>Error occurred: {upcomingMovies.upcomingMoviesError}</Text>)
          : (
            <>
              { upcomingMoviesList() }
            </>
            )
        }
      </ScrollView>
    </>
  ];

  const showTab = () => {
    return tabs[selectedNavOption];
  };

  // endregion

  return (
    <View style={ styles.screenView }>
      <View style={ styles.contentContainer }>
        <View style={ styles.header }>
          <Text style={ styles.titleAbove}>Welcome to</Text>
          <Text style={ styles.title }>Dr. Cinema</Text>
          { navigationBar() }
        </View>
        { showTab(selectedNavOption) }
      </View>
    </View>
  );
};

export default Cinemas;
