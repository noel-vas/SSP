import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, Button, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function NewForm({ addOrder }) {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [order, setOrder] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const handleSubmit = () => {
    let calculatedPrice = '';

    if (selectedTag === '20' || selectedTag === '30') {
      const tagPrice = selectedTag === '20' ? 20 : 30;
      const totalPrice = tagPrice * parseInt(quantity);
      calculatedPrice = totalPrice.toString();
    } else if (selectedTag === '12' || selectedTag === '15' || selectedTag === '50') {
      const tagPrice = selectedTag === '12' ? 12 : selectedTag === '15' ? 15 : 50;
      const totalPrice = tagPrice * parseInt(quantity);
      calculatedPrice = totalPrice.toString();
    }

    fetch('http://192.168.0.100:19001/dataEntry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        store,
        order,
        quantity,
        description,
        price: calculatedPrice,
        tag: selectedTag
      })
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            // Redirect to the login screen
            navigation.navigate('Login');
            return;
          }
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

    setName('');
    setStore('');
    setOrder('');
    setQuantity('');
    setDescription('');
    setSelectedTag('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Form</Text>
      <View style={styles.inputContainer}>
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
        <Text style={styles.label}>Tag:</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedTag}
          onValueChange={(itemValue) => setSelectedTag(itemValue)}
        >
          <Picker.Item label="Select a tag" value="" />
          <Picker.Item label="Rice" value="20" />
          <Picker.Item label="Flour" value="30" />
          <Picker.Item label="Salt" value="12" />
          <Picker.Item label="Sugar" value="50" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  inputContainer: {
    backgroundColor: '#808080',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#BDBDBD', // Input Border Color
    backgroundColor: '#FFFFFF', // Input Background Color
    color: '#000000', // Input Text Color
  },
  button: {
    backgroundColor: '#ffa31a',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});