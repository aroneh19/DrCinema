import { StyleSheet } from "react-native";

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

export { styles };
