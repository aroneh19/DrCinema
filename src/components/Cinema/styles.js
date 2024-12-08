import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cinemaContainer: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'rgb(20, 20, 20)',
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  lastCinemaItem: {
    marginBottom: 64
  },
  cinemaTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  cinemaWebsite: {
    color: 'white',
    fontSize: 16
  }
});

export default styles;
