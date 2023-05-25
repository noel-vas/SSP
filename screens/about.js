import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import symbolImageSource from '../symbol.jpg'; // Adjust the path to symbol.jpg based on its actual location

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salesman Support System</Text>
      <Text style={styles.version}>Version 10.64.34.4</Text>
      <Image source={symbolImageSource} style={styles.logoImage} />
      <Text style={styles.footerText}>© 2023 SSP. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  version: {
    fontSize: 16,
    marginBottom: 20,
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#808080',
  },
});

export default About;
