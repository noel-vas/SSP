import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapScreen = () => {
  const [startCoordinates, setStartCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [isGeneratingRoute, setIsGeneratingRoute] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coordinateData, setCoordinateData] = useState([]);

  const generateRoute = async () => {
    try {
      const response = await fetch('http://192.168.1.42:19001/coordinates');
      const data = await response.json();

      if (data.length >= 2) {
        setIsGeneratingRoute(true);
        setCoordinateData(data);
        setCurrentIndex(0);
      } else {
        console.error('Insufficient coordinates in the fetched data.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateNextRoute = async () => {
    const i = currentIndex;
    if (i < coordinateData.length - 1) {
      const startCoordinates = coordinateData[i].coordinates;
      const destinationCoordinates = coordinateData[i + 1].coordinates;

      console.log('Start Location:', startCoordinates.Location);
      console.log('Start Latitude:', startCoordinates.latitude);
      console.log('Start Longitude:', startCoordinates.longitude);

      console.log('Destination Location:', destinationCoordinates.Location);
      console.log('Destination Latitude:', destinationCoordinates.latitude);
      console.log('Destination Longitude:', destinationCoordinates.longitude);
      console.log(i);

      setStartCoordinates({ latitude: startCoordinates.latitude, longitude: startCoordinates.longitude });
      setDestinationCoordinates({ latitude: destinationCoordinates.latitude, longitude: destinationCoordinates.longitude });
      setPolylineCoordinates([]);

      await calculateRoute(startCoordinates.latitude, startCoordinates.longitude, destinationCoordinates.latitude, destinationCoordinates.longitude);

      setCurrentIndex(i + 1);
    } else {
      setIsGeneratingRoute(false);
    }
  };

  
  const calculateRoute = async (startLat, startLng, destLat, destLng) => {
    try {
      const apiKey = 'fc23a3a6-e17c-4e56-a487-879ec9c73fac';

      const url = `https://graphhopper.com/api/1/route?point=${startLat},${startLng}&point=${destLat},${destLng}&vehicle=car&locale=en&calc_points=true&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log('GraphHopper API response:', data);

      if (data.paths && data.paths.length > 0) {
        const path = data.paths[0];
        if (path.points) {
          const polyline = decodePolyline(path.points);
          setPolylineCoordinates(prevCoordinates => [...prevCoordinates, ...polyline]);
        } else {
          console.error('No points found in the route data.');
        }
      } else {
        console.error('No route data found.');
      }
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  const decodePolyline = (encoded) => {
    let polyline = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      polyline.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return polyline;
  };

  const initialRegion = {
    latitude: 12.2958,
    longitude: 76.6394,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {startCoordinates && <Marker coordinate={startCoordinates} title="Start" />}
        {destinationCoordinates && <Marker coordinate={destinationCoordinates} title="Destination" />}
        {polylineCoordinates.length > 0 && (
          <Polyline coordinates={polylineCoordinates} strokeWidth={4} strokeColor="red" />
        )}
      </MapView>
      <View style={styles.searchButtons}>
        <Button title="Start from Beginning" onPress={generateRoute} />
      </View>
      {isGeneratingRoute && (
        <View style={styles.searchButtons}>
          <Button title="Calculate Next Route" onPress={calculateNextRoute} />
        </View>
      )}
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
  searchButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
});

export default MapScreen;
