import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Logging in with:', email, password);
      const response = await axios.post('http://192.168.1.35:19001/login', {
        email: email,
        password: password,
      });

      console.log(response.data);
      const { success, message } = response.data;

      if (success) {
        setMessage('Login successful');
        navigation.navigate('Main'); // Replace 'MainScreen' with the name of the screen you want to navigate to
      } else {
        setMessage(message);
      }
    } catch (error) {
      console.error(error);
      setMessage('Invalid Credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../symbol.jpg')} style={styles.logoImage} />
      <Text style={styles.logoText}>Salesman support system</Text>
      <Text style={styles.signUpText}>Login Page</Text>

      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.messageText}>{message}</Text>
    </View>
    <Text style={styles.footerText}>© 2023 SSP. All rights reserved.</Text>
    </View>
    
  );
};


const styles = StyleSheet.create({
  footerText: {
    marginTop: 20,
    fontSize: 12,
    color: '#808080',
  },
  signUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Secondary Color
  },
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b', // Primary Color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 150, // Adjust the width as per your preference
    height: 150, // Adjust the height as per your preference
    marginBottom: 10,
    borderRadius:1200,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Secondary Color
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#808080',
    borderRadius: 10,
    padding: 20,
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
    backgroundColor: '#ffa31a', // Accent Color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});



export default LoginPage;
