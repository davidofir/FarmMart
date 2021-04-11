import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import Login from './Login';
import 'react-native-gesture-handler';
import ButtonComponent from '../components/ButtonComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Icon } from 'react-native-elements'
const AddStore = () => {
    const [storeName, setStoreName] = useState("");
    const [item, setItem] = useState("");
    const [price, setPrice] = useState(0);
    const [qty,setQty] = useState(0);
    const [selectedIndex,setSelectedIndex] = useState(2);
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput placeholder="Store Name" onChangeText={setStoreName} />
            </View>
            <View>
                <View style={styles.addItems}>                
                <View style={[styles.itemsInput,{width:150}]}>
                    <TextInput placeholder="Item Name" onChangeText={setItem} />
                </View>
                <View style={styles.itemsInput}>
                    <TextInput placeholder="Price" onChangeText={setPrice} keyboardType="numeric"/>
                </View>
                <View style={[styles.itemsInput,{width:70}]}>
                    <TextInput placeholder="Quantity" onChangeText={setQty}/>
                </View>
                <View>
                    <TouchableOpacity>
                    <Icon name='add' type='material' />
                    </TouchableOpacity>
                </View>
                </View>
                <View style={styles.qtyContainer}>
                    <Text>Per Unit</Text>
                    <SegmentedControl tintColor={Colors.primary} onChange={(event)=>{setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}} backgroundColor={Colors.secondary} fontStyle={{color:"black"}} values={['Kilos','Pounds','Liters','Gallons']} selectedIndex={selectedIndex}/>
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
    itemsInput:{
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
        marginHorizontal:11

    },
    addItems:{
        flexDirection:"row",
        alignItems:"center",

    },
    qtyContainer:{
        margin:20
    }
});
export default AddStore;