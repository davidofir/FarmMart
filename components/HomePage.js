import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/colors';
import Login from './Login';
import 'react-native-gesture-handler';
import ButtonComponent from './ButtonComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const HomePage = ({navigation}) =>{
    return(
    <View style={styles.container}>
        <Text>Welcome</Text>
        <View style={styles.buttons}>
            <View style={styles.buttonContainer}>
                <ButtonComponent textColor={Colors.primary} background={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Sign Up"/>
            </View>            
            <View style={styles.buttonContainer}>
                <ButtonComponent clickEvent={()=>navigation.navigate("Login")} textColor={Colors.secondary} background={Colors.primary} borderColorStyle={Colors.primary} buttonTitle="Sign In"/>
            </View>

      </View>

    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent:"center",
      },
    buttons:{
        margin:10,
        justifyContent:'space-between',
        marginTop:100
      },
      buttonContainer:{
        margin:10,
        marginHorizontal:40
      },
      button:{
          backgroundColor:Colors.primary
      }
});
export default HomePage;