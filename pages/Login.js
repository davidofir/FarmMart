import React,{useState} from 'react';
import {Text,View,TextInput,StyleSheet,Button} from 'react-native';
import { max } from 'react-native-reanimated';
import Colors from '../constants/colors'
import Checkbox from '../components/Checkbox'
import ButtonComponent from '../components/ButtonComponent'
import firebase from 'firebase';
const Login = props =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const signIn = async () =>{
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email,password);
            // navigation.navigate("signin");
            alert("authentication performed successfully");
        }
        catch(err){
            setError(err.message);
            console.log(error);
        }
    }
    return(
    <View style={styles.container}>
        <View style={styles.inputs}>
            <View style={styles.input}>
                <TextInput placeholder="Email" onChangeText={setEmail} autoCompleteType="email"/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry={true} autoCompleteType="password"/>
            </View>
            <View style={styles.registerContainer}>
                <Text>Create an account</Text>
            </View>
        </View>
<View style={styles.buttonContainer}>
        <ButtonComponent clickEvent={()=>signIn()} background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Submit"/>
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
        marginVertical:5,
        marginHorizontal:5,
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