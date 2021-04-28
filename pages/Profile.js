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
import * as Location from 'expo-location';

const Profile = ({route,navigation}) => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const userRef = db.collection("users").doc(firebase.auth().currentUser.uid);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [resLocation,setResLocation] = useState(null);
    const [error, setError] = useState("");
    const [address,setAddress] = useState("");
    const [city, setCity] = useState("");
    const [streetNum, setStreetNum] = useState("");
    const [street, setStreet] = useState();
    const [country, setCountry] = useState();
    const currentPassword = route.params.user.password;
    let referenceName,referenceLastName,referenceAddress = "";
    db.collection("users").doc(user.uid).get().then((doc) => {
        referenceName = doc.data().firstName;
        referenceLastName = doc.data().lastName;
        referenceAddress = doc.data().referenceAddress;

    });

    let Update = async() =>{
    let lat,long;
    var userNameOk = true;
    var passwordOK = true;
    var locationOK = true;  
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
            try{
                if (city.length != 0 && streetNum.length != 0 && street.length != 0 && country.length != 0) {
                    setAddress(`${country},${city},${street} ${streetNum}`);
                Location.requestPermissionsAsync().then(
                    Location.geocodeAsync(address).then(
                        res=>{
                            
                            setResLocation(res);
                            console.log(res);
                            lat = res[0].latitude;
                            long = res[0].longitude;
                            //console.log(`Long ${long} and lat ${lat}`);
                            

                        }
                    ).catch(
                        ()=>{
                            locationOK = false;
                            Alert.alert("Error","Invalid location, please try again");
                        }  
                    )
                    .then(()=>{

                        userRef.update({shippingAddress:address,lat:lat,long:long})
                        locationOK = true;                        
                    }
                    )
                )
                //await userRef.update({shippingAddress:address});
        }
        else{
            Alert.alert("Error","The address fields cannot be left blank");
        }
    }
        catch (err) {
            setError(err);
            var errorFormatted = err.toString().replace("Error: ", "");
            Alert.alert("Error", `${errorFormatted}`);
            console.log(error);
        }
        }
        if(passwordOK && userNameOk && locationOK){
            navigation.navigate("Menu",{password:currentPassword});
        }
    
    }
    return (
        <View style={styles.container}>
            <View style={[styles.input,{marginTop:60}]}>
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
            <View style={{ marginLeft: 20 }}>
                <View style={styles.nameContainer}>
                    <View style={[styles.nameFields, { marginHorizontal: 5, width: 240 }]}>
                        <TextInput placeholder="Street" onChangeText={setStreet} />
                    </View>
                    <View style={[styles.nameFields, { marginHorizontal: 24, width: 60 }]}>
                        <TextInput placeholder="Number" onChangeText={setStreetNum} keyboardType="numeric" />
                    </View>
                </View>
                <View style={styles.nameContainer}>
                    <View style={[styles.nameFields, { marginHorizontal: 5 }]}>
                        <TextInput placeholder="City" onChangeText={setCity} />
                    </View>
                    <View style={[styles.nameFields, { marginHorizontal: 24 }]}>
                        <TextInput placeholder="Country" onChangeText={setCountry} />
                    </View>
                </View>
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
        justifyContent: "flex-start"
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
    nameContainer: {
        flexDirection: "row",
    },
    nameFields: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
        width: 150,
        marginVertical: 5
    }
});
export default Profile;