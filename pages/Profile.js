import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase, { auth } from 'firebase';
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
    const userRef = db.collection("users").doc(firebase.auth().currentUser.uid);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [address,setAddress] = useState("");
    const currentPassword = route.params.password;
    let referenceName,referenceLastName,referenceAddress = "";
    db.collection("users").doc(user.uid).get().then((doc) => {
        referenceName = doc.data().firstName;
        referenceLastName = doc.data().lastName;
        referenceAddress = doc.data().referenceAddress;

    });

    let Update = async() =>{
    var userNameOk = true;
    var passwordOK = true;  
    setFirstName(referenceName);
    setLastName(referenceLastName);
    setAddress(referenceAddress);

        try{
           const response = await await firebase.auth().signInWithEmailAndPassword(user.email,currentPassword).then(()=>{
            if(email != user.email){
                user.updateEmail(email).then( () =>{
                userNameOk = true;

                }
                ).catch((err)=>{
                    var errorFormatted = err.toString().replace("Error: ", "");
                    Alert.alert("Error", `${errorFormatted}`);
                    userNameOk=false;
                });

        }
        if(password.length>0){
            if(password === confirmPassword){
                user.updatePassword(password).then(()=>{
                    currentPassword = password;
                    passwordOK = true;
                    console.log(currentPassword);
                }
                ).catch((err)=>{
                    passwordOK = false;
                    var errorFormatted = err.toString().replace("Error: ", "");
                    Alert.alert("Error", `${errorFormatted}`);
                });

            }else{
                passwordOK = false;
                Alert.alert("Error","The passwords don't match");
            }
        }
           });

        }catch (err){
            alert(err);
        }
        console.log(referenceLastName);
        if( referenceName !== firstName && firstName.length !== 0){
            db.collection('users').doc(firebase.auth().currentUser.uid).update({firstName: firstName});
            console.log("executed");
        }
        if(referenceLastName !== lastName && lastName.length !== 0){
           await userRef.update({lastName: lastName});
        }        
        if(referenceAddress !== address && address.length !== 0){
           await userRef.update({shippingAddress:address});
        }
        if(passwordOK && userNameOk){
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
            <TextInput onChangeText={setFirstName} value={referenceName} placeholder="First Name"/>
            </View>
            <View style={styles.input}>
            <TextInput onChangeText={setLastName} value={referenceLastName} placeholder="Last Name"/>
            </View>
            <View style={styles.input}>
            <TextInput onChangeText={setAddress} placeholder="Shipping Address"/>
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