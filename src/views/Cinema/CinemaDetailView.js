import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	Linking,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import MoviesScreen from "../Movie/MovieListView"; // Import the MoviesScreen component

const CinemaDetailView = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { cinema } = route.params;

	// Array of static content to render above the movies list
	const details = [
		{ key: "name", label: cinema.name },
		{
			key: "address",
			label: `Address: ${cinema["address\t"]}, ${cinema.city}`,
		},
		{ key: "phone", label: `Phone number: ${cinema.phone}` },
		{ key: "website", label: `Website: ${cinema.website}`, link: true },
		{ key: "description", label: cinema.description },
	];

	return (
		<View style={styles.screenView}>
			<View style={styles.contentContainer}>
				<TouchableOpacity
					style={styles.goBackButton}
					onPress={() => navigation.goBack()}>
					<Text style={styles.goBackText}>{"< Back"}</Text>
				</TouchableOpacity>

				{/* Use FlatList to avoid nesting */}
				<FlatList
					data={details}
					keyExtractor={(item) => item.key}
					ListHeaderComponent={() => (
						<Text style={styles.title}>{cinema.name}</Text>
					)}
					renderItem={({ item }) => {
						if (item.link) {
							return (
								<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
									<Text style={styles.info}>{item.label.split(":")[0]}: </Text>
									<Text
										style={styles.link}
										onPress={() =>
											Linking.openURL("https://" + cinema.website)
										}>
										{cinema.website}
									</Text>
								</View>
							);
						}
						return <Text style={styles.info}>{item.label}</Text>;
					}}
					ListFooterComponent={() => (
						<View style={styles.moviesContainer}>
							{/* Render MoviesScreen */}
							<MoviesScreen
								route={{ params: { cinema } }}
								navigation={navigation}
							/>
						</View>
					)}
				/>
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
	moviesContainer: {
		flex: 1,
		marginTop: 16,
	},
});

export default CinemaDetailView;
