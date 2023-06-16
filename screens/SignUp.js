import React from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet, View,Image } from 'react-native';
import axios from 'axios';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
    };
  }

  handleSignup = async () => {
    const { email, password } = this.state;

    try {
      console.log('Signing up with:', email, password); // Debug statement
      const response = await axios.post('http://192.168.1.42:19001/signup', {
        email: email,
        password: password,
      });

      console.log(response.data);
      const { success, message } = response.data;
      
      if (success) {
        this.setState({ message: 'Signup successful' });
        // ... perform any additional actions on successful signup
      } else {
        this.setState({ message: message });
        // ... handle the error or display an appropriate message
      }

    } catch (error) {
      console.error(error);
      this.setState({ message: 'An error occurred' });
      // ... handle the error or display an appropriate message
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../symbol.jpg')} style={styles.logoImage} />
      <Text style={styles.logoText}>Salesman support system</Text>
        <Text style={styles.signUpText}>Sign up</Text>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>© 2023 SSP. All rights reserved.</Text>
        <Text style={styles.messageText}>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1b1b', // Primary Color
  },
  signUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Secondary Color
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
    borderColor: '#BDBDBD',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
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
  footerText: {
    marginTop: 20,
    fontSize: 12,
    color: '#808080',
  },
  messageText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
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
});

export default SignupPage;