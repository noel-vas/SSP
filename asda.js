import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startCoordinates: null,
      destinationCoordinates: null,
      polylineCoordinates: [],
    };
  }

 

  generateRandomCoordinates = async () => {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
      generateRandomCoordinates();
    }, []);
   
      try {
        const response = await fetch('http://192.168.1.35:19001/coordinates');
        const data = await response.json();
        setCoordinates(data);
        console.log(data);
    
        // Iterate through the coordinates
        data.forEach((location) => {
          const {  coordinates } = location;
          console.log('Location:', coordinates.Location);
          console.log('Latitude:', coordinates.latitude);
          console.log('Longitude:', coordinates.longitude);
        });
      } catch (error) {
        console.error(error);
      }


    const startLatitude = 12.286470131084524;
    const startLongitude = 76.65425118514035;
    const destinationLatitude = coordinates.latitude;
    const destinationLongitude = coordinates.longitude;

    this.setState(
      {
        startCoordinates: { latitude: startLatitude, longitude: startLongitude },
        destinationCoordinates: { latitude: destinationLatitude, longitude: destinationLongitude },
        polylineCoordinates: [],
      },
      this.calculateRoute
    );
  };

  calculateRoute = async () => {
    const { startCoordinates, destinationCoordinates } = this.state;
    if (startCoordinates && destinationCoordinates) {
      try {
        const apiKey =  'fc23a3a6-e17c-4e56-a487-879ec9c73fac';

        const url = `https://graphhopper.com/api/1/route?point=${startCoordinates.latitude},${startCoordinates.longitude}&point=${destinationCoordinates.latitude},${destinationCoordinates.longitude}&vehicle=car&locale=en&calc_points=true&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log('GraphHopper API response:', data);

        if (data.paths && data.paths.length > 0) {
          const path = data.paths[0];
          if (path.points) {
            const polyline = this.decodePolyline(path.points);
            this.setState({ polylineCoordinates: polyline });
          } else {
            console.error('No points found in the route data.');
          }
        } else {
          console.error('No route data found.');
        }
      } catch (error) {
        console.error('Error calculating route:', error);
      }
    }
  };

  decodePolyline = (encoded) => {
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

      const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += deltaLng;

      polyline.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return polyline;
  };

  render() {
    const { startCoordinates, destinationCoordinates, polylineCoordinates } = this.state;

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
            <Polyline
              coordinates={polylineCoordinates}
              strokeWidth={4}
              strokeColor="red"
            />
          )}
        </MapView>
        <View style={styles.searchButtons}>
          <Button title="Generate Random Route" onPress={this.generateRandomCoordinates} />
        </View>
      </View>
    );
  }
}

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

