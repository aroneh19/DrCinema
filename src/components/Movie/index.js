import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Movie ({ movieData, isLastItem }) {
  const navigation = useNavigation();
  const movie = movieData;

  const handlePress = () => {
    navigation.navigate('Movie', { movie });
  };

  return (
    <TouchableOpacity style={ isLastItem ? [styles.movieContainer, { marginBottom: 64 }] : styles.movieContainer} onPress={handlePress}>
      <Image
        source={{ uri: movie.poster }}
        style={styles.movieImage}
      />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.movieTitle}>
          {movie.title}
        </Text>
        <Text style={styles.movieMetadata}>
          Released: {movie.year} | Genre: {movie.genres[0].Name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
