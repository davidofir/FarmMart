import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Colors from "../constants/colors";
import AddStore from './AddStore';
import BrowseStores from './BrowseStores';
import 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';

import { Icon } from 'react-native-elements'
import ButtonComponent from '../components/ButtonComponent';
import { useEffect } from 'react/cjs/react.development';
const Menu = ({ route, navigation }) => {
    const db = firebase.firestore();
    const password = route.params.password;
    const [firstName, setFirstName] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState({longitude:-79.7019476,latitude:43.4701695,longitudeDelta: 0.0922,latitudeDelta: 0.0421});
    let currentLocation;
    db.collection("users").doc(firebase.auth().currentUser.uid).get().then((doc) => {
        setFirstName(doc.data().firstName);
    });

    useEffect(() => {
        (async () => {
            try{
                let { status } = Location.requestPermissionsAsync().then(
                   ()=>{
                        currentLocation = Location.getCurrentPositionAsync({}).then(
                            (cur)=>{setLocation(
                                {
                                    longitude:cur.coords.longitude,
                                    latitude:cur.coords.latitude,
                                    latitudeDelta:0.0922,
                                    longitudeDelta:0.0421
                                }
                            )}
                        )
                   }
                        
                ).catch(
                    ()=>setErrorMsg('Permission to access location was denied')
                );
                
            }
            catch (err) {
                setErrorMsg(err);
                var errorFormatted = err;
                Alert.alert("Error", `${errorFormatted}`);
            }
  
        })();
      },[]);


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
                                let newData = {id:doc.id,storeData:doc.data()}
                                stores.push(newData);
                            })
                        }
                    )
                    
                    
                    .then(
                        ()=>navigation.navigate("BrowseStores",{
                            stores:stores,
                            currentLocation:location
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