import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { max } from 'react-native-reanimated';
import Colors from '../constants/colors'
import Checkbox from '../components/Checkbox'
import ButtonComponent from '../components/ButtonComponent'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import firebase, { auth, firestore } from 'firebase';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';
const Login = ({navigation},props) => {
    const db = firebase.firestore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const signIn = async () => {
        try {
            setError("");
            const response = await firebase.auth().signInWithEmailAndPassword(email, password).then(
                (cred)=>{
                    db.collection("users").doc(cred.user.uid).get().then(
                        (user)=>{
                            navigation.navigate("Menu",{
                            user:{id:cred.user.uid,password:password,name:user.data().name,lastName:user.data().lastName,address:user.data().address,long:user.data().long,lat:user.data().lat,inbox:user.data().inbox}
                        })}
                    )

            }
            );
            //user:{id:userID,email:email,password:password,firstName:name,lastName:lastName,address:shippingAddress,long:long,lat:lat}

        }
        catch (err) {
            setError(err.message);
            console.log(error);
            alert(error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <View style={styles.input}>
                    <TextInput placeholder="Email" onChangeText={setEmail} autoCompleteType="email" autoCapitalize="none"/>
                </View>
                <View style={styles.input}>
                    <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry={true} autoCompleteType="password" />
                </View>
                <View style={styles.registerContainer}>
                    <Text onPress={()=>navigation.navigate("Signup")}>Create an account</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonComponent clickEvent={() => signIn()} background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Submit" />
            </View>
        </View>

    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "flex-start"
    },
    inputs: {
        marginVertical: 125,
        marginHorizontal: 25
    },
    input: {
        padding: 5,
        borderBottomWidth: 2,
        marginVertical: 5,
        marginHorizontal: 5,
        borderBottomColor: Colors.primary,
        width: 330
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        marginHorizontal: 65
    },
    rememberMeContainer: {
        marginTop: 10,
        flexDirection: "row"
    },
    rememberMeText: {
        marginTop: 4,
        marginLeft: 5

    },
    registerContainer: {
        marginTop: 20,
        alignItems: "center"
    }
});
export default Login;