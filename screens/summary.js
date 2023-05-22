import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const Summary = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://192.168.1.43:19001/orders');
        setUsers(response.data); // Store all items in the array
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, []);

  if (users.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {users.map((user, index) => (
        <View key={index} style={styles.tableContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Store:</Text>
            <Text style={styles.value}>{user.store}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Arrival Time:</Text>
            <Text style={styles.value}>{user.arrtime}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Order:</Text>
            <Text style={styles.value}>{user.order}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Delivery Date:</Text>
            <Text style={styles.value}>{user.DOD}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Present Day:</Text>
            <Text style={styles.value}>{user.presentDay}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{user.description}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{user.price}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.label}>Quantity:</Text>
            <Text style={styles.value}>{user.quantity}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#1b1b1b',
    flexGrow: 1,
    padding: 16,
  },
  tableContainer: {
    borderWidth: 1,
    backgroundColor: '#808080',
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
    borderColor:'white',
  },
  rowContainer: {
    
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    textDecorationColor:'black',
    fontWeight: 'bold',
    marginRight: 8,
    flexBasis: 100,
    color: 'orange',
  },
  value: {
    color:'black',
    flex: 1,
  },
});

export default Summary;
