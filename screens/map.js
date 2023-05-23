import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const CoordinatesScreen = () => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    fetchCoordinates();
  }, []);

  const fetchCoordinates = async () => {
    try {
      const response = await fetch('http://192.168.0.100:19001/coordinates');
      const data = await response.json();
      setCoordinates(data[0].coordinates);
  
      // Log the coordinates
      // console.log(data[0].coordinates);
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const renderRedirectButton = (longitude, latitude) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    return (
      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(googleMapsUrl)}>
        <Text style={styles.buttonText}>Go to Google Maps</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {coordinates.map((coordinate, index) => (
        <View key={index} style={styles.coordinateContainer}>
          <Text style={styles.coordinateText}>Longitude: {coordinate.longitude}</Text>
          <Text style={styles.coordinateText}>Latitude: {coordinate.latitude}</Text>
          {renderRedirectButton(coordinate.longitude, coordinate.latitude)}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'black',
    color:'white',
  },
  coordinateContainer: {
    marginTop: 50,
    marginBottom: 16,
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 16,
  },
  coordinateText: {
    color:'white',
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CoordinatesScreen;
