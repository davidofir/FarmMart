import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import * as firebase from 'firebase';
import { LogBox } from 'react-native';
import Menu from './pages/Menu';
LogBox.ignoreLogs(['Setting a timer']);
const firebaseConfig = {
  apiKey: "AIzaSyC5_3euKIb8ScfRbQOM7AUqkBihbl2syf4",
  authDomain: "farmmart-f2a33.firebaseapp.com",
  projectId: "farmmart-f2a33",
  storageBucket: "farmmart-f2a33.appspot.com",
  messagingSenderId: "46976507025",
  appId: "1:46976507025:web:329e6137319c16025e7330",
  measurementId: "G-WFEMP1F5BS"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
import { Button, StyleSheet, Text, View } from 'react-native';
import Login from './pages/Login'
import Colors from './constants/colors';
import Signup from './pages/Signup';
import Inbox from './pages/Inbox';
import HomePage from './pages/HomePage'
import 'react-native-gesture-handler';
import Profile from './pages/Profile';
import AddStore from './pages/AddStore';
import BrowseStores from './pages/BrowseStores';
import Email from './pages/Email';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Menu" component={Menu} options={({ route, navigation }) => ({
          headerRight: () => (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => {

                navigation.navigate("Profile", { password: route.params.password });

              }} style={styles.editButton}>
                <Icon name='edit' type='material' />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                navigation.navigate("Inbox",{
                  user:route.params.user
                })
              }} style={styles.editButton}>
                {
                  (route.params.user.inbox == undefined || route.params.user.inbox.length == 0 ) ? (<Icon name='notifications-none' type='material' />) : <Icon name='notifications-active' type='material' />
                } 
              </TouchableOpacity>
            </View>
          )
        })} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AddStore" component={AddStore} />
        <Stack.Screen name="BrowseStores" component={BrowseStores} />
        <Stack.Screen name="Email" component={Email} />
        <Stack.Screen name="Inbox" component={Inbox}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center",
  },
  editButton: {
    flexDirection: "row",
    marginRight: 20
  },
  buttonsContainer: {
    flexDirection: "row"
  }
});
