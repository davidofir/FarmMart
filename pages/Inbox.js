import React from 'react';
import 'react-native-gesture-handler';
import firebase from 'firebase';
import 'firebase/firestore';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const Inbox = ({ route }) => {
    const RenderedItem = ({ title, description }) => (
        <View style={styles.itemsComponent}>
            <View>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.description}>
                    {description}
                </Text>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.notificationsContainer}>
                    <Text style={{fontSize:15}}>You Have {route.params.user.inbox !== undefined ? route.params.user.inbox.length : 0} New Emails</Text>
                </View>
                <View>
                    {
                        route.params.user.inbox !== undefined && route.params.user.inbox.length !== 0 ?
                            (<FlatList data={route.params.user.inbox}
                                renderItem={({ item }) => <RenderedItem title={item.title}
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
    description:{

    }
})

export default Inbox;