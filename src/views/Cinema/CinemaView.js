import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Cinema from '../../components/CinemaList/CinemaItem'; // Import the Cinema component
import { cinemas } from '../../Dummy/CinemasDummys'; // Import your dummy data

const CinemasScreen = () => {
	const navigation = useNavigation();

	// Sort cinemas alphabetically by name
	const sortedCinemas = cinemas.sort((a, b) => a.name.localeCompare(b.name));

	// Render each cinema using the Cinema component
	const renderCinemaItem = ({ item }) => (
		<Cinema
			cinema={item}
			onPress={() => navigation.navigate('CinemaDetails', { cinema: item })}
		/>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={sortedCinemas}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderCinemaItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
	},
});

export default CinemasScreen;
