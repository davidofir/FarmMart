import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import Colors from '../constants/colors';
import ButtonComponent from '../components/ButtonComponent';

const signup = props => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    return (
        <View style={styles.container}>
            <View style={styles.inputs}>
                <View style={styles.input}>
                    <TextInput placeholder="Email" onChangeText={setEmail} autoCompleteType={"email"}/>
                </View>
                <View style={styles.input}>
                    <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry={true} autoCompleteType="password" />
                </View>
                <View style={styles.input}>
                    <TextInput placeholder="Confirm Password" onChangeText={setConfirmPassword} secureTextEntry={true} autoCompleteType="password" />
                </View>
                <View style={styles.input}>
                    <TextInput placeholder="Address" onChangeText={setAddress} autoCompleteType={"street-address"}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonComponent background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Submit" />
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
});
export default signup;