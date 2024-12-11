import React from "react";
import { View, Text, TouchableOpacity, FlatList, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import MoviesScreen from "../Movie/MovieListView"; // Import the MoviesScreen component
import { styles } from "./stylesDetail";

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
		{
			key: "address",
			label: `Address: ${cinema["address\t"]}, ${cinema.city}`,
		},
		{ key: "phone", label: `Phone number: ${cinema.phone}`, phone: true },
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
						if (item.phone) {
							// Handle clickable phone number
							return (
								<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
									<Text style={styles.info}>{item.label.split(":")[0]}: </Text>
									<Text
										style={styles.link}
										onPress={() => Linking.openURL(`tel:${cinema.phone}`)}>
										{cinema.phone}
									</Text>
								</View>
							);
						}
						if (item.key === "address") {
							// Handle clickable address
							const address = `${cinema["address\t"]}, ${cinema.city}`;
							const encodedAddress = encodeURIComponent(address);
							return (
								<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
									<Text style={styles.info}>{item.label.split(":")[0]}: </Text>
									<Text
										style={styles.link}
										onPress={() =>
											Linking.openURL(
												`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
											)
										}>
										{address}
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

export default CinemaDetailView;
