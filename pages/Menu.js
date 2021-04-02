import React, { useState } from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';
import { Icon } from 'react-native-elements'
const Menu = ({ route, navigation }) => {
    const db = firebase.firestore();
    const { userId, email } = route.params;
    const [firstName, setFirstName] = useState("");
    db.collection("users").doc(userId).get().then((doc) => {
        setFirstName(doc.data().firstName);
    });
    return (
        <View>
            <Text>Welcome, {firstName}</Text>
            <TouchableOpacity>
                <Icon name='edit' type='material'/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Menu;