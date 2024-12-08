import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screenView: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(20, 20, 20)'
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    marginTop: 64
  },
  header: {
    width: '100%',
    height: 185,
    justifyContent: 'flex-end'
  },
  titleAbove: {
    marginLeft: 16,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  title: {
    marginLeft: 16,
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold'
  },
  navigation: {
    marginHorizontal: 16,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  navigationOption: {
    flexDirection: 'column'
  },
  navigationOptionSelected: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  navigationOptionText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  navigationSelectedIndicator: {
    height: 4,
    borderRadius: 4,
    backgroundColor: 'red'
  },
  navigationSelectedIndicatorHidden: {
    backgroundColor: 'transparent'
  },
  cinemaListContainer: {
    width: '100%',
    height: '100%'
  },
  upcomingMoviesScrollView: {
    width: '100%',
    height: '100%'
  },
  upcomingMoviesContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 20,
    textAlign: 'center',
    padding: 50,
    color: 'lightgray'
  }
});

export default styles;
