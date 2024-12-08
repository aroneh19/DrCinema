import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  movieContainer: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'rgb(20, 20, 20)',
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flexDirection: 'row'
  },
  movieTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    flex: 1
  },
  movieMetadata: {
    fontSize: 14,
    color: 'grey',
    marginTop: 5
  },
  movieImage: {
    width: 80,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 5,
    marginRight: 10
  }
});

export default styles;
