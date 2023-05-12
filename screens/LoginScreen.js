import React from 'react';
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleLogin = () => {
    const { username, password } = this.state;
  
    // Perform authentication check here
    if (username === 'user' && password === 'password') {
      // If authentication succeeds, navigate to the main app screen
      // You can do this using navigation props or any other navigation library of your choice
      console.log('Login successful');
    } else {
      // If authentication fails, display an error message to the user
      console.log('Login failed');
    }
  };

  render() {
    return (
      <View style={styles.container}>
           
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
     
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
});

export default LoginPage;
