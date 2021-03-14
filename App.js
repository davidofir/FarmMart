import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Colors from './constants/colors';
import HomePage from './components/HomePage'
export default function App() {
  return (
    <View  style={styles.container}>
      <HomePage/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:"center",
  },
});
