import React from 'react';
import 'react-native-gesture-handler';
import firebase from 'firebase';
import { Icon } from 'react-native-elements'
import 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const Inbox = ({ route,navigation }) => {
    const db = firebase.firestore();
    const RenderedItem = ({senderId, title, description }) => (
        <View style={styles.itemsComponent}>
            <View style={styles.aligner}>
            <View>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text>
                    {description}
                </Text>
            </View>
            <View style={styles.replyAligner}>
                <TouchableOpacity onPress={
                    ()=>{
                        db.collection("users").doc(senderId).get().then(
                            (user)=>{
                                const tempUser = {id:senderId,user:user.data()}
                                navigation.navigate("Reply",{
                                    user:tempUser
                                })
                            }
                        )
                    }
                }>
                    <Icon name='reply' type='material' />
                </TouchableOpacity>
            </View>
        </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.notificationsContainer}>
                    <Text style={{fontSize:15}}>You Have {route.params.user.inbox !== undefined ? route.params.user.inbox.length : 0} New Messages</Text>
                </View>
                <View>
                {
                        route.params.user.inbox !== undefined && route.params.user.inbox.length !== 0 ?
                            (<FlatList data={route.params.user.inbox}
                                renderItem={({ item }) => <RenderedItem senderId={item.senderID} title={item.title}
                                    description={item.description} />}
                                keyExtractor={(item, index) => index.toString()} />) : null
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "flex-start"
    },
    notificationsContainer:{
        marginVertical:20
    },
    title:{
        fontSize:20,
        marginVertical:10
    },
    aligner:{
    },
    replyAligner:{
        justifyContent:"flex-end",
        marginTop:20,
    }
})

export default Inbox;