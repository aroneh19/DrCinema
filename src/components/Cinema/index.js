import {Text, TouchableOpacity, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Cinema ({ cinemaData, isLastItem }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cinema = cinemaData; // useSelector(state => state.cinema);

  const handlePress = () => {
    navigation.navigate('CinemaDetail', { cinema });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.5}>
      <View style={ isLastItem ? [styles.cinemaContainer, styles.lastCinemaItem] : styles.cinemaContainer }>
        <Text style={ styles.cinemaTitle }>{cinema.name}</Text>
        <Text style={ styles.cinemaWebsite } >{cinema.website}</Text>
      </View>
    </TouchableOpacity>
  );
};
