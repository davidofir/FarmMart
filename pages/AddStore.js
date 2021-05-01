import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Colors from '../constants/colors';
import Login from './Login';
import * as Location from 'expo-location';
import 'react-native-gesture-handler';
import ButtonComponent from '../components/ButtonComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Icon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';
import firebase, { auth } from 'firebase';
const AddStore = ({ navigation }) => {
    const db = firebase.firestore();
    const [storeName, setStoreName] = useState("");
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(2);
    const [itemsList, setItemsList] = useState([]);
    const [itemID, setItemID] = useState(0);
    const [error, setError] = useState("");
    const [city, setCity] = useState("");
    const [streetNum, setStreetNum] = useState("");
    const [street, setStreet] = useState();
    const [country, setCountry] = useState();
    const [long, setLong] = useState(0);
    const [lat, setLat] = useState(0);
    const [selectedUnitName, setSelectedUnitName] = useState("Liters");
    const RenderedItem = ({ name, price, qty, unit }) => (
        <View style={styles.itemsComponent}>
            <View>
                <Text>
                    {name}
                </Text>
            </View>
            <View style={{ marginHorizontal: 2 }}>
                <Text>
                    ${price} per {qty} {unit}
                </Text>
            </View>
        </View>
    );
    const createStore = async () => {
        let lat,long;
        let address = `${country},${city},${street} ${streetNum}`;
        let { status } = await Location.requestPermissionsAsync();     
        try {
            
                console.log(address);
                let result = Location.geocodeAsync(address).then(
                    (res) => {
                        console.log(res);
                        lat = res[0].latitude;
                        long = res[0].longitude;
                        console.log(`Long ${long} and lat ${lat}`);
                    }

                ).then(() => {
                    return db.collection('stores').doc(auth().currentUser.uid).set({
                        name: storeName,
                        products: itemsList,
                        address: address,
                        long: long,
                        lat: lat

                    }).then(() => {
                        navigation.navigate("Menu");
                    })
                })
                    .catch(
                        () => {
                            Alert.alert("Error", "Invalid location, please try again");
                        }
                    )

        }
        catch (err) {
            setError(err);
            var errorFormatted = err.toString().replace("Error: ", "");
            Alert.alert("Error", `${errorFormatted}`);
            console.log(error);
        }
    }
    return (

        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput placeholder="Store Name" onChangeText={setStoreName} />
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
            <View style={{ marginVertical: 10 }}>
                <Text>Store Products</Text>
            </View>
            <FlatList data={itemsList} renderItem={({ item }) => <RenderedItem name={item.name} price={item.price} qty={item.qty} unit={item.unit} />} keyExtractor={item => item.id.toString()} />
            <View>
                <View style={styles.addItems}>
                    <View style={[styles.itemsInput, { width: 150 }]}>
                        <TextInput placeholder="Item Name" onChangeText={setItemName} />
                    </View>
                    <View style={styles.itemsInput}>
                        <TextInput placeholder="Price" onChangeText={setPrice} keyboardType="numeric" />
                    </View>
                    <View style={styles.itemsInput}>
                        <TextInput placeholder="Quantity" onChangeText={setQty} keyboardType="numeric" />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => {
                            if (itemName.length > 0 && price.toString().length > 0 && qty.toString().length > 0) {
                                setItemID(itemID + 1);
                                let item = {
                                    id: itemID,
                                    name: itemName,
                                    price: price,
                                    qty: qty,
                                    unit: selectedUnitName
                                }
                                setItemsList([...itemsList, item]);
                            }
                        }}>
                            <Icon name='add' type='material' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.qtyContainer}>
                    <View style={{ marginVertical: 10, alignItems: "center" }}>
                        <Text>Per Unit</Text>
                    </View>
                    <SegmentedControl tintColor={Colors.primary} onChange={(event) => { setSelectedIndex(event.nativeEvent.selectedSegmentIndex); setSelectedUnitName(event.nativeEvent.value); }} backgroundColor={Colors.secondary} fontStyle={{ color: "black" }} values={['Kilos', 'LB', 'Liters', 'Gallons']} selectedIndex={selectedIndex} />
                </View>

            </View>
            <View style={styles.saveButton}>
                <ButtonComponent clickEvent={createStore} background={Colors.primary} textColor={Colors.secondary} borderColorStyle={Colors.primary} buttonTitle="Save" />
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
    input: {
        padding: 5,
        borderBottomWidth: 2,
        marginVertical: 5,
        marginHorizontal: 5,
        borderBottomColor: Colors.primary,
        width: 330
    },
    itemsInput: {
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
        marginHorizontal: 11

    },
    addItems: {
        flexDirection: "row",
        alignItems: "center",

    },
    qtyContainer: {
        margin: 20
    },
    saveButton: {
        margin: 12
    },
    itemsComponent: {
        flexDirection: "row",
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
export default AddStore;