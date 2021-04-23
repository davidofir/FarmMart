import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Colors from "../constants/colors";
import AddStore from './AddStore';
import BrowseStores from './BrowseStores';
import 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'
import ButtonComponent from '../components/ButtonComponent';
const Menu = ({ route, navigation }) => {
    const db = firebase.firestore();
    const password = route.params.password;
    const [firstName, setFirstName] = useState("");
    db.collection("users").doc(firebase.auth().currentUser.uid).get().then((doc) => {
        setFirstName(doc.data().firstName);
    });
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                    <Text style={{fontSize:20}}>Welcome, {firstName}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonComponent clickEvent={async()=>{
                    const stores = [];
                    db.collection("stores").get().then(
                        (snapshot)=>{
                            snapshot.docs.forEach(doc=>{
                                stores.push(doc.data());
                            })
                        }
                    ).then(
                        ()=>navigation.navigate("BrowseStores",{
                            stores:stores
                        })
                    )

            }} background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Browse Stores" />
                <ButtonComponent clickEvent={()=>navigation.navigate("AddStore")} background={Colors.secondary} textColor={Colors.primary} borderColorStyle={Colors.primary} buttonTitle="Add a Store" />
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

    editButtonContainer: {
        position: "absolute",
        right: 0,
        
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "space-evenly",
        marginHorizontal: 5,
    },
    textContainer:{
        margin: 8,
    }
});

export default Menu;