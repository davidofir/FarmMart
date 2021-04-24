import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import Colors from '../constants/colors';
import ButtonComponent from '../components/ButtonComponent';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as Location from 'expo-location';
import 'react-native-gesture-handler';

const signup = ({navigation},props) => {
    const db = firebase.firestore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [name,setName] = useState("");
    const [resLocation,setResLocation] = useState(null);
    const [lastName, setLastName] = useState("");
    var userID = "";
    const SignupAction = async () => {
        let long,lat;
        try {
            setError("");
            Location.requestPermissionsAsync().then(
                Location.geocodeAsync(address).then(
                    res=>{
                        console.log(res);
                        setResLocation(res);
                        lat = resLocation[0].latitude;
                        long = resLocation[0].longitude;
                        console.log(`Long ${long} and lat ${lat}`);
                    }
                ).then( ()=>
                    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
                            userID = cred.user.uid;
                            console.log(cred.user.uid);
                            return db.collection('users').doc(cred.user.uid).set({
                                firstName: name,
                                lastName: lastName,
                                shippingAddress: address,
                                long:long,
                                lat:lat
                            })
                        }).then(()=>{
                            navigation.navigate("Menu",{
                                user:{id:userID,email:email,password:password,firstName:name,lastName:lastName,shippingAddress:address,long:long,lat:lat,inbox:undefined}
                            });
                        }) 
                    
                ).catch(
                    (e)=>{
                        console.log(e);
                        Alert.alert("Error","Invalid location, please try again");
                    }
                )
            );

        }
        catch (err) {
            setError(err);
            Alert.alert("Error", `${err}`);
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <View style={styles.input}>
                    <TextInput placeholder="Email" onChangeText={setEmail} autoCompleteType={"email"} autoCapitalize="none" />
                </View>
                <View style={styles.input}>
                    <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry={true} autoCompleteType="password" />
                </View>
                <View style={styles.input}>
                    <TextInput placeholder="Confirm Password" onChangeText={setConfirmPassword} secureTextEntry={true} autoCompleteType="password" />
                </View>
                <View style={styles.nameContainer}>
                    <View style={[styles.nameFields,{marginHorizontal:5}]}>
                    <TextInput placeholder="First Name" onChangeText={setName} autoCompleteType={"name"}/>
                    </View>
                    <View style={[styles.nameFields,{marginHorizontal:24}]}>
                    <TextInput placeholder="Last Name" onChangeText={setLastName}/>
                    </View>
                </View>
                <View style={styles.input}>
                    <TextInput placeholder="Shipping Address" onChangeText={setAddress} autoCompleteType={"street-address"} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonComponent clickEvent={() => {
                    password === confirmPassword ? SignupAction() : Alert.alert("error", "The passwords don't match");
                }} background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Submit" />
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: "flex-start",
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
        marginHorizontal: 65
    },
    nameContainer:{
        flexDirection:"row",
    },
    nameFields:{
        borderBottomWidth:2,
        borderBottomColor:Colors.primary,
        width:150
    }
});
export default signup;