import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import axios from 'axios';

const MapScreen = () => {
  const [path, setPath] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    // Fetch the data from the backend API
    axios.get('http://192.168.1.43:19001/coordinates')
      .then(response => {
        const data = response.data;
        console.log('Received data:', data);

        if (Array.isArray(data) && data.length > 0) {
          const mapData = data[0];
          if (mapData && mapData.coordinates) {
            const { longitude, latitude } = mapData.coordinates;
            console.log('Longitude:', longitude);
            console.log('Latitude:', latitude);

            setLongitude(longitude);
            setLatitude(latitude);

            const promises = [];
            for (let i = 0; i < mapData.coordinates.length - 1; i++) {
              const source = {
                latitude: mapData.coordinates[i].latitude,
                longitude: mapData.coordinates[i].longitude,
              };
              const destination = {
                latitude: mapData.coordinates[i + 1].latitude,
                longitude: mapData.coordinates[i + 1].longitude,
              };
              promises.push(calculateShortestPath(source, destination));
            }

            Promise.all(promises)
              .then((results) => {
                const combinedPoints = results.reduce(
                  (combined, result) => [...combined, ...result.points],
                  []
                );
                setPath(combinedPoints);
              })
              .catch((error) => {
                console.error('Error calculating shortest path:', error);
              });
            } else {
                console.error('Invalid data structure:', mapData);
              }
            } else {
              console.error('Invalid data:', data);
            }
          })
          .catch((error) => {
            console.error('Error retrieving coordinates:', error);
          });
      }, []);

      const calculateShortestPath = (source, destination) => {
        const apiKey = 'fc23a3a6-e17c-4e56-a487-879ec9c73fac';
        const url = `https://graphhopper.com/api/1/route?point=${source.latitude},${source.longitude}&point=${destination.latitude},${destination.longitude}&vehicle=car&key=${apiKey}`;
    
        return axios.get(url)
          .then((response) => {
            const data = response.data;
            console.log( data.paths[0].distance);
            const distance = data.paths[0].distance;
            const duration = data.paths[0].time;
            const points = data.paths[0].points.coordinates;
    
            return { distance, duration, points };
          })
          .catch((error) => {
            console.error('Error calculating shortest path:', error);
          });
      };
    
      return (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: coordinates[0]?.latitude,
              longitude: coordinates[0]?.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {path.length > 0 && (
              <Polyline coordinates={path} strokeColor="blue" strokeWidth={3} />
            )}
    
            {coordinates.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                }}
                title={`Coordinate ${index}`}
                description={`Latitude: ${coordinate.latitude}, Longitude: ${coordinate.longitude}`}
              />
            ))}
          </MapView>
        </View>
      );
    };
    
    export default MapScreen;
    