import React from 'react';
import 'react-native-gesture-handler';
import firebase from 'firebase';
import 'firebase/firestore';
import Colors from '../constants/colors';
import { Platform,Button, Dimensions, StyleSheet, Text, View,Alert,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import ButtonComponent from '../components/ButtonComponent';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';

const Reply = ({route,navigation})=>{
    const db = firebase.firestore();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    return(
        <View style={styles.container}>
            <Text style={{marginVertical:20}}>
                Reply
            </Text>
            <View style={styles.input}>
                <TextInput onChangeText={setTitle} placeholder="Title"/>
            </View >
            <View style={styles.textAreaContainer}>
            <TextInput style={styles.textArea} onChangeText={setDescription} multiline={true} numberOfLines={10} placeholder="Description"/>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonComponent clickEvent={async()=>{
                    
                    if(title.length !== 0 && description !== 0 ){
                    db.collection("users").doc(route.params.user.id).get().then(user=>{
                        if(user.data().inbox === undefined){
                            const inbox = [{senderID:firebase.auth().currentUser.uid,title:title,description:description}];
                            db.collection('users').doc(route.params.user.id).update({inbox: inbox});
                        }else if(user.data().inbox.length>0){
                            const tmpEmail = user.data().inbox;
                            tmpEmail.push({senderID:firebase.auth().currentUser.uid,title:title,description:description})
                            db.collection('users').doc(route.params.user.id).update({inbox:tmpEmail});
                        }
                    }                   
                    ).then(
                        ()=>{
                            navigation.goBack();
                        }
                    )
                }else{
                        Alert.alert("Error","Both Fields must contain input");
                    }

                }} background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Send"/>
            </View>
        </View>
    )
}

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
    textAreaContainer: {
        padding: 5,
        borderWidth: 2,
        marginVertical: 70,
        marginHorizontal: 5,
        borderColor: Colors.primary,
        width: 330,
        borderRadius:10
        
    },
    textArea:{
        height:170,
        width: 330,
        justifyContent:"flex-start",
        textAlignVertical:"top"
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        marginHorizontal: 65
    },
});

export default Reply