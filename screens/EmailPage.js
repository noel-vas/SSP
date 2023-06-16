import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const EmailPage = ({ route }) => {
  const { _id } = route.params;
  const [coordinates, setCoordinates] = useState([]);

  const handleMapPress = (event) => {
    const newCoordinate = [event.nativeEvent.coordinate.longitude, event.nativeEvent.coordinate.latitude];

    setCoordinates([...coordinates, newCoordinate]);
  };


  const handleSendToBackend = () => {
    const formattedCoordinates = coordinates.map(coordinate => [
      Number(coordinate[0]), // longitude
      Number(coordinate[1])  // latitude
    ]).flat();
    
    const payload = {
      objectId: _id,
      coordinates: formattedCoordinates
    };
  
    fetch('http://192.168.1.42:19001/assignment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response from backend:', data);
      })
      .catch((error) => {
        console.error('Error sending data to backend:', error);
      });
  };
  
  
  

  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.objectId}>objectId: {_id}</Text>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: coordinate[1], longitude: coordinate[0] }}
            title={`Pin ${index + 1}`}
            description={`Coordinates: ${coordinate[1]}, ${coordinate[0]}`}
          />
        ))}
      </MapView>
      <Button title="Send to Backend" onPress={handleSendToBackend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default EmailPage;