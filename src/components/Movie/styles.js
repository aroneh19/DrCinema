import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	movieItem: {
		flexDirection: "row",
		padding: 16, // More spacious padding
		backgroundColor: "#ffffff", // Clean white background
		marginVertical: 8, // Space between items
		marginHorizontal: 12, // Align with padding of Cinema component
		borderRadius: 8, // Rounded corners for modern design
		elevation: 3, // Shadow for Android
		shadowColor: "#000", // Shadow for iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	thumbnail: {
		width: 80,
		height: 120,
		marginRight: 16,
		borderRadius: 8, // Smooth rounded edges for the thumbnail
	},
	details: {
		flex: 1,
		justifyContent: "center",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#344955", // Matches header text color
		marginBottom: 6, // Adds spacing below the title
	},
	year: {
		fontSize: 14,
		color: "#555", // Neutral color for less emphasis
		marginBottom: 6, // Adds spacing below the year
	},
	genres: {
		fontSize: 14,
		color: "#f9aa33", // Accent color for genres
	},
});

export { styles };
