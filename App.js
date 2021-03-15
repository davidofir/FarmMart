import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Colors from './constants/colors';
import HomePage from './components/HomePage'
import 'react-native-gesture-handler';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage}/>
      </Stack.Navigator>
    </NavigationContainer>
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
