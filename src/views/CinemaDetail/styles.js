import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screenView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(20, 20, 20)'
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    marginTop: 32
  },
  cinemaDetail: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    padding: 16
  },
  description: {
    fontSize: 16,
    color: 'white',
    padding: 16,
    lineHeight: 25
  },
  info: {
    fontSize: 14,
    color: 'white',
    padding: 16
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
    padding: 16
  },
  goBackButton: {
    padding: 16
  },
  goBackText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
    padding: 50,
    color: 'lightgray'
  },
  noMovies: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    margin: 30,
    color: 'red'
  }
});

export default styles;
