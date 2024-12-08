import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    screenView: {
        flex: 1,
        backgroundColor: 'rgb(20,20,20)',
        padding: 20,
        paddingTop: 80
    },
    movieTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        textAlign: 'center'
    },
    movieImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 20
    },
    moviePlot: {
        fontSize: 16,
        color: 'white',
        lineHeight: 24,
        marginBottom: 20
    },
    movieInfo: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 10
    },
    goBackButton: {
        position: 'absolute',
        top: -40,
        left: -10,
        padding: 10,
        zIndex: 10
    },
    goBackText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    showtimeList: {
        marginTop: 20
    },
    showtimeItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
    },
    showtimeText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5
    },
    purchaseButton: {
        backgroundColor: '#1c7ed6',
        padding: 10,
        borderRadius: 5
    },
    purchaseButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    videoPlayer: {
        height: 300, // Set a fixed height for the video player
        width: '100%',
        marginBottom: 20
    }
});

export default styles;
