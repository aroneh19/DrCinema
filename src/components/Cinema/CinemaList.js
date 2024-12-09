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
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cinemaName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cinemaWebsite: {
        fontSize: 14,
        color: 'blue',
    },
});

export default Cinema;
