import React,{useState} from 'react';
import {Text,View,TextInput,StyleSheet,Button} from 'react-native';
import { max } from 'react-native-reanimated';
import Colors from '../constants/colors'
import Checkbox from '../components/Checkbox'
import ButtonComponent from '../components/ButtonComponent'
const Login = props =>{
    return(
    <View style={styles.container}>
        <View style={styles.inputs}>
            <View style={styles.input}>
                <TextInput placeholder="Email" autoCompleteType="email"/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Password" secureTextEntry={true} autoCompleteType="password"/>
            </View>
            <View style={styles.registerContainer}>
                <Text>Create an account</Text>
            </View>
        </View>
<View style={styles.buttonContainer}>
        <ButtonComponent background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Submit"/>
            <Checkbox label="Keep me logged in"/>
</View>
    </View>

)
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent:"flex-start",
    },
    inputs:{
        marginVertical:125,
        marginHorizontal:25
    },
    input:{
        padding:5,
        borderBottomWidth:2,
        margin:5,
        borderBottomColor:Colors.primary,
        width:330
    },
    buttonContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent:"center",
        marginHorizontal:65
    },
    rememberMeContainer:{
        marginTop:10,
        flexDirection:"row"
    },
    rememberMeText:{
        marginTop:4,
        marginLeft:5

    },
    registerContainer:{
        marginTop:20,
        alignItems:"center"
    }
  });
export default Login;