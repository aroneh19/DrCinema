import React, { useEffect } from "react";
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemas } from "../../redux/actions/cinemaActions";
import Cinema from "../../components/Cinema/CinemaList"; // Reusable Cinema component

const CinemasScreen = () => {
	const dispatch = useDispatch();

	// Access Redux state
	const { cinemas, loading, error } = useSelector((state) => state.cinema);

	// Dispatch fetchCinemas when the component mounts
	useEffect(() => {
		dispatch(fetchCinemas());
	}, [dispatch]);

	// Display a loading spinner while fetching data
	if (loading) {
		return <ActivityIndicator size="large" style={styles.loading} />;
	}

	// Display an error message if fetching fails
	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>{error}</Text>
			</View>
		);
	}

	// Render each cinema using the Cinema component
	const renderCinemaItem = ({ item }) => (
		<Cinema
			cinema={item}
			onPress={() => console.log(`Navigating to details for ${item.name}`)}
		/>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={cinemas} // Data from Redux store
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
		backgroundColor: "#fff",
	},
	loading: {
		flex: 1,
		justifyContent: "center",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "red",
		fontSize: 16,
	},
});

export default CinemasScreen;
