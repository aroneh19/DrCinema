import { StyleSheet } from "react-native";

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
	emptyText: {
		textAlign: "center",
		fontSize: 16,
		color: "#555",
		marginTop: 20,
	},
});

export { styles };
