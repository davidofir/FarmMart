import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC5_3euKIb8ScfRbQOM7AUqkBihbl2syf4",
  authDomain: "farmmart-f2a33.firebaseapp.com",
  projectId: "farmmart-f2a33",
  storageBucket: "farmmart-f2a33.appspot.com",
  messagingSenderId: "46976507025",
  appId: "1:46976507025:web:329e6137319c16025e7330",
  measurementId: "G-WFEMP1F5BS"
};
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}
import { Button, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Login from './pages/Login'
import Colors from './constants/colors';
import HomePage from './pages/HomePage'
import 'react-native-gesture-handler';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage}/>
        <Stack.Screen name="Login" component={Login}/>
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
