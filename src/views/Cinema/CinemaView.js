import React, { useEffect } from "react";
import {
	View,
	FlatList,
	Text,
	ActivityIndicator,
	StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCinemas } from "../../redux/actions/cinemaActions";
import Cinema from "../../components/Cinema/CinemaList";
import {useNavigation} from "@react-navigation/native"; // Reusable Cinema component

const CinemaView = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	
	// Access Redux state
	const { cinemas, error } = useSelector((state) => state.cinema);

	// Dispatch getCinemas when the component mounts
	useEffect(() => {
		dispatch(getCinemas());
	}, [dispatch]);

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
			onPress={() => navigation.navigate("MovieList", { cinema: item })}
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

export default CinemaView;
