import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DisplayDetails = () => {
  const navigation = useNavigation();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await fetch('http://192.168.1.42:19001/display');
      const data = await response.json();

      // Generate a unique key for each item
      const detailsWithKeys = data.map((item, index) => ({
        ...item,
        key: index.toString(), // Use index as the key if no unique identifier is available
      }));

      setDetails(detailsWithKeys);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailPress = (_id) => {
    navigation.navigate('EmailPage', { _id });
  };

  return (
    <View style={styles.container}>
      {details.map((detail) => (
        <View key={detail.key} style={styles.detailContainer}>
          <TouchableOpacity onPress={() => handleEmailPress(detail._id)}>
            <Text style={styles.label}>Email:</Text>
            <Text style={[styles.value, styles.email]}>{detail.email}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  detailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'blue',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  email: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});

export default DisplayDetails;