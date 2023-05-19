import React, { useState } from 'react';
import {  Text, TextInput, StyleSheet, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function NewForm({ addOrder }) {
 
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [order, setOrder] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  

  const handleSubmit = () => {
    fetch('http://192.168.1.38:19001/dataEntry',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            store,
            order,
            quantity,
            description,
            price
          })
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            // Do something with the response data
          })
          .catch(error => {
            console.error('Error:', error);
          });
    // addOrder(name, store,order, quantity, description, price);
    setName('');
    setStore('');
    setOrder('');
    setQuantity('');
    setDescription('');
    setPrice('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Store:</Text>
      <TextInput style={styles.input} value={store} onChangeText={setStore} />
      <Text style={styles.label}>Order:</Text>
      <TextInput style={styles.input} value={order} onChangeText={setOrder} />
      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      <Text style={styles.label}>Price:</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    fontSize: 18,
    borderRadius: 5,
   },
});
