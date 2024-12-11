import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Cinema Component
const Cinema = ({ cinema, onPress }) => {
    return (
        <TouchableOpacity style={styles.cinemaItem} onPress={onPress}>
            <Text style={styles.cinemaName}>{cinema.name}</Text>
            <Text style={styles.cinemaWebsite}>{cinema.website}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cinemaItem: {
        backgroundColor: "#ffffff", // Clean white background for each item
        padding: 16, // Increased padding for better spacing
        borderRadius: 8, // Rounded corners for a modern look
        marginVertical: 8, // Space between list items
        marginHorizontal: 12, // Align items with some padding on the sides
        elevation: 3, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    cinemaName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#344955", // Matches the header color for consistency
    },
    cinemaWebsite: {
        fontSize: 14,
        color: "#f9aa33", // Accent color for clickable items
        marginTop: 4, // Spacing between name and website
    },
});

export default Cinema;
