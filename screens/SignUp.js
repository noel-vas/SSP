import React from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
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
      const response = await axios.post('http://192.168.1.38:19001/signup', {
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
        <Text style={styles.signUpText}>Sign up</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
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
  },
  signUpText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
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

export default SignupPage;