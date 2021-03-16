import React from 'react';
import {Text,View,TextInput,StyleSheet,Button} from 'react-native';
import { max } from 'react-native-reanimated';
import Colors from '../constants/colors'
import ButtonComponent from './ButtonComponent'
const Login = props =>{return(

    <View style={styles.container}>
        <View style={styles.inputs}>
            <View style={styles.input}>
                <TextInput placeholder="UserName" autoCompleteType="username"/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Password" secureTextEntry={true} autoCompleteType="password"/>
            </View>
        </View>
<View style={styles.buttonContainer}>
        <ButtonComponent background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Submit"/>
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
        marginVertical:120,
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
        justifyContent:"flex-end",
        marginBottom:125,
        marginLeft:70
    },
  });
export default Login;