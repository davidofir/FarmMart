import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Colors from "../constants/colors"
import 'firebase/firestore';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import ButtonComponent from '../components/ButtonComponent';



const Profile = () => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    db.collection("users").doc(user.uid).get().then((doc) => {
        setFirstName(doc.data().firstName);
        setLastName(doc.data().lastName);
        setAddress(doc.data().shippingAddress);
    });
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
            <ButtonComponent clickEvent={() => console.log("blahbalh")} background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Update" />
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