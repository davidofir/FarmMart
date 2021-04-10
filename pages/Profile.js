import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import Colors from "../constants/colors"
import 'firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import ButtonComponent from '../components/ButtonComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Profile = ({route,navigation}) => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    let userNameOK = true;
    let passwordOK = true;
    let currentPassword = route.params.password;
    let referenceName,referenceLastName,referenceAddress="";

    db.collection("users").doc(user.uid).get().then((doc) => {
        setFirstName(doc.data().firstName);
        referenceName=doc.data().firstName;
        setLastName(doc.data().lastName);
        referenceLastName = doc.data().lastName;
        setAddress(doc.data().shippingAddress);
        referenceAddress=doc.data().shippingAddress;
    });
    const Update = async() =>{
        try{
           const response = await await firebase.auth().signInWithEmailAndPassword(user.email,currentPassword).then(()=>{
            if(email != user.email){
                user.updateEmail(email).then( user =>{
                },err => {
                    var errorFormatted = err.toString().replace("Error: ", "");
                    Alert.alert("Error", `${errorFormatted}`);
                    userNameOK = false;
                }
                );
                

        }
        if(password.length>0){
            if(password === confirmPassword){
                user.updatePassword(password).then(()=>{
                    currentPassword = password;
                    passwordOK=true;
                    console.log(currentPassword);
                },err =>{
                    var errorFormatted = err.toString().replace("Error: ", "");
                    passwordOK=false;
                    Alert.alert("Error", `${errorFormatted}`);
                }
                );

            }else{
                passwordOK=false;
                Alert.alert("Error","The passwords don't match");
            }
        }
           });

        }catch (err){
            alert(err);
        }

        if(referenceName !== firstName){
            db.collection("users").doc(user.uid).update({firstName: firstName});
        }
        if(referenceLastName !== lastName){
            db.collection("users").doc(user.uid).update({lastName: lastName});
        }        
        if(referenceAddress !== address){
            db.collection("users").doc(user.uid).update({shippingAddress: address});
        }
        if(passwordOK && userNameOK){
            console.log(currentPassword);
            navigation.navigate("Menu",{password:currentPassword});
        }
    
    }
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput onChangeText={setEmail} value={email} placeholder="Email"/>
            </View>
            <View style={styles.input}>
                <TextInput onChangeText={setPassword} secureTextEntry={true} autoCompleteType="password" placeholder="Password"/>
            </View>
            <View style={styles.input}>
                <TextInput onChangeText={setConfirmPassword} secureTextEntry={true} autoCompleteType="password" placeholder="Confirm Password" />
            </View>
            <View style={styles.input}>
            <TextInput onChangeText={setFirstName} value={firstName} placeholder="First Name"/>
            </View>
            <View style={styles.input}>
            <TextInput onChangeText={setLastName} value={lastName} placeholder="Last Name"/>
            </View>
            <View style={styles.input}>
            <TextInput onChangeText={setAddress} value={address} placeholder="Shipping Address"/>
            </View>
            <View style={styles.buttonContainer}>
            <ButtonComponent clickEvent={() => Update()} background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Update" />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "flex-start",
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
});
export default Profile;