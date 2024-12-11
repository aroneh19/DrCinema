import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	screenView: {
		paddingVertical: 20,
		flex: 1,
		backgroundColor: "#f0f4f7", // Light background for a modern look
	},
	contentContainer: {
		padding: 20,
	},
	goBackButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "#344955", // Consistent dark accent
		borderRadius: 8,
		marginBottom: 20,
		alignSelf: "flex-start",
		elevation: 3, // Shadow for Android
		shadowColor: "#000", // Shadow for iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	goBackText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	movieTitle: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#344955", // Matches other headings
		textAlign: "center",
	},
	movieImage: {
		width: "100%",
		height: 300,
		borderRadius: 100, // Smooth rounded corners
		marginBottom: 20,
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 10,
		shadowRadius: 10,
	},
	moviePlot: {
		fontSize: 16,
		color: "#555",
		marginBottom: 8,
		lineHeight: 24,
		marginTop: 8,
	},
	movieInfo: {
		fontSize: 16,
		color: "#555", // Neutral color for info text
		marginBottom: 8,
	},
	showtimeList: {
		marginTop: 20,
	},
	showtimeItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
		backgroundColor: "#ffffff", // White background for showtime cards
		borderRadius: 8,
		marginBottom: 12,
		elevation: 2, // Light shadow
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	showtimeText: {
		fontSize: 14,
		color: "#344955",
		fontWeight: "600",
	},
	purchaseButton: {
		backgroundColor: "#f9aa33", // Accent color
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 6,
	},
	purchaseButtonText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "bold",
	},
	noShowtimes: {
		fontSize: 16,
		color: "#888",
		textAlign: "center",
		marginTop: 20,
		fontStyle: "italic",
	},
	videoPlayer: {
		height: 220,
		borderRadius: 12,
		marginTop: 20,
		marginBottom: 20,
		overflow: "hidden",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
});

export { styles };
