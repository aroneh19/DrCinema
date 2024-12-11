import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#f0f4f7", // Light background for modern feel
	},
	header: {
		padding: 40,
		backgroundColor: "#344955", // Darker background for the header
		alignItems: "center",
		borderBottomWidth: 0, // Removed border for a cleaner look
		elevation: 5, // Shadow for Android
		shadowColor: "#000", // Shadow for iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	title: {
		padding: 10,
		fontSize: 24,
		fontWeight: "bold",
		color: "#ffffff", // White text for contrast
	},
	navigationBar: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		paddingVertical: 12,
		backgroundColor: "#f9f9f9", // Light background for the navigation bar
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
	},
	navigationOption: {
		alignItems: "center",
		padding: 10,
	},
	navigationText: {
		fontSize: 16,
		fontWeight: "600", // Slightly bolder text
		color: "#344955", // Matching the header color
	},
	underline: {
		height: 3,
		backgroundColor: "#f9aa33", // Bright accent color
		marginTop: 6,
		borderRadius: 2, // Rounded edges for a smooth look
	},
	content: {
		flex: 1,
		padding: 10,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	errorText: {
		color: "#d32f2f", // Bright red for error emphasis
		fontSize: 18,
		fontWeight: "500",
		textAlign: "center",
	},
	listContainer: {
		paddingVertical: 20,
		paddingHorizontal: 16,
	},
});

export { styles };
