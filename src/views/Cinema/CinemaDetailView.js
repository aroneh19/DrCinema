import React, { useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import MoviesScreen from "../Movie/MovieListView"; // Import the MoviesScreen component

const CinemaDetailView = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { cinema } = route.params;

	return (
		<View style={styles.screenView}>
			<View style={styles.contentContainer}>
				<TouchableOpacity
					style={styles.goBackButton}
					onPress={() => navigation.goBack()}>
					<Text style={styles.goBackText}>{"< Back"}</Text>
				</TouchableOpacity>
				<ScrollView style={styles.cinemaDetail}>
					<Text style={styles.title}>{cinema.name}</Text>
					<Text style={styles.info}>
						Address: {cinema["address\t"]}, {cinema.city}
					</Text>
					<Text style={styles.info}>Phone number: {cinema.phone}</Text>
					<Text style={styles.link}>Website: {cinema.website}</Text>
					<Text style={styles.description}>{cinema.description}</Text>
				</ScrollView>

				{/* Reuse the MoviesScreen component */}
				<View style={styles.moviesContainer}>
					<MoviesScreen route={{ params: { cinema } }} navigation={navigation} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screenView: {
		flex: 1,
		backgroundColor: "#f9f9f9",
	},
	contentContainer: {
		flex: 1,
		padding: 16,
		backgroundColor: "#ffffff",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 5,
	},
	goBackButton: {
		padding: 10,
		backgroundColor: "#007BFF",
		borderRadius: 8,
		alignSelf: "flex-start",
		marginBottom: 16,
	},
	goBackText: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "bold",
	},
	cinemaDetail: {
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 8,
		textAlign: "center",
	},
	info: {
		fontSize: 16,
		color: "#555",
		marginBottom: 6,
	},
	link: {
		fontSize: 16,
		color: "#007BFF",
		marginBottom: 6,
		textDecorationLine: "underline",
	},
	description: {
		fontSize: 14,
		color: "#777",
		marginBottom: 16,
		lineHeight: 20,
	},
	loading: {
		textAlign: "center",
		fontSize: 16,
		color: "#777",
		marginTop: 20,
	},
	noMovies: {
		textAlign: "center",
		fontSize: 16,
		color: "#888",
		marginTop: 20,
	},
	moviesContainer: {
		flex: 1,
		marginTop: 16,
	},
});

export default CinemaDetailView;

