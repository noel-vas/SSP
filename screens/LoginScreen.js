import React from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import axios from 'axios';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
    };
  }

  handleLogin = async () => {
    const { email, password } = this.state;

    try {
      console.log('Logging in with:', email, password); // Debug statement
      const response = await axios.post('http://192.168.1.38:19001/login', {
        email: email,
        password: password,
      });

      console.log(response.data);
      const { success, message } = response.data;
      
      if (success) {
        this.setState({ message: 'Login successful ' });
      
      } else {
        this.setState({ message: message });

      }

    } catch (error) {
      console.error(error);
      this.setState({ message: 'Invalid Credentials' });
     
    }
  };

  render() {
    return (
      <View style={styles.container}>
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
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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

export default LoginPage;