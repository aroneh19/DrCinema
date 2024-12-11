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

	// Helper function to clean HTML tags
	const cleanText = (text) => {
		if (!text) return "";
		return text.replace(/<[^>]+>/g, ""); // Regex to remove HTML tags
	};

	// Array of static content to render above the movies list
	const details = [
		{ key: "name", label: cinema.name },
		{
			key: "address",
			label: `Address: ${cinema["address\t"]}, ${cinema.city}`,
		},
		{ key: "phone", label: `Phone number: ${cinema.phone}` },
		{ key: "website", label: `Website: ${cinema.website}`, link: true },
		{ key: "description", label: cleanText(cinema.description) },
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
		backgroundColor: "#f0f4f7", // Light background color for the screen
	},
	contentContainer: {
		flex: 1,
		padding: 20,
		paddingVertical: 40,
		backgroundColor: "#ffffff", // Clean white background for content
		borderTopLeftRadius: 20, // Rounded corners for a modern look
		borderTopRightRadius: 20,
		shadowColor: "#000", // Shadow for depth
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 5, // Shadow for Android
	},
	goBackButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "#344955", // Darker consistent accent color
		borderRadius: 8,
		alignSelf: "flex-start",
		marginBottom: 20,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	goBackText: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "bold",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#344955", // Dark color for consistency with headings
		marginBottom: 16,
		textAlign: "center",
	},
	info: {
		fontSize: 16,
		color: "#555", // Neutral text color for readability
		marginBottom: 10, // Increased spacing for better layout
		lineHeight: 22, // Improved readability with line height
	},
	link: {
		fontSize: 16,
		color: "#f9aa33", // Accent color for links
		marginBottom: 10,
		textDecorationLine: "underline",
	},
	moviesContainer: {
		flex: 1,
		marginTop: 20,
		paddingTop: 20,
		borderTopWidth: 1,
		borderTopColor: "#ddd", // Subtle divider for separation
	},
});


export default CinemaDetailView;
