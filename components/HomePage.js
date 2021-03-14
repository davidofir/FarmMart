import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Colors from '../constants/colors';
import ButtonComponent from './ButtonComponent';
const HomePage = props =>{
    return(
    <View style={styles.container}>
        <Text>Welcome</Text>
        <View style={styles.buttons}>
            <View style={styles.buttonContainer}>
                <ButtonComponent textColor={Colors.secondary} background={Colors.primary} borderColorStyle={Colors.primary} buttonTitle="Sign In"/>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonComponent textColor={Colors.primary} background={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Sign Up"/>
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
        flexDirection:"row",
        justifyContent:'space-between',
        margin:10,
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