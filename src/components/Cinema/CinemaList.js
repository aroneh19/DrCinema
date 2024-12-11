import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

// Cinema Component
const Cinema = ({ cinema, onPress }) => {
	return (
		<TouchableOpacity style={styles.cinemaItem} onPress={onPress}>
			<Text style={styles.cinemaName}>{cinema.name}</Text>
			<Text style={styles.cinemaWebsite}>{cinema.website}</Text>
		</TouchableOpacity>
	);
};

export default Cinema;
