import React, { useCallback, useEffect } from 'react';
import { Platform,Button, Dimensions, StyleSheet, Text, View,Alert } from 'react-native';
import Colors from '../constants/colors';
import MapView,{Marker,Circle, Callout} from 'react-native-maps';
import Login from './Login';
import 'react-native-gesture-handler';
import ButtonComponent from '../components/ButtonComponent';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import firebase from 'firebase';
import 'firebase/firestore';
import * as Location from 'expo-location';
import { useState } from 'react/cjs/react.development';
import { FlatList } from 'react-native-gesture-handler';
const BrowseStores = ({Navigation,route})=>{
    const [mapRegion,setMapRegion] = useState({longitude:0,latitude:0,longitudeDelta: 0.0922,latitudeDelta: 0.0421});
    const db = firebase.firestore();
    // const [stores,setStores] = useState([]);
    const location=route.params.currentLocation;
    const [errorMsg, setErrorMsg] = useState({longitude:0,latitude:0,longitudeDelta: 0.0922,latitudeDelta: 0.0421});
    const stores = route.params.stores;
    const [markers,setMarkers] = useState([]);
    let currentLocation;
    const RenderedItem = ({name,price,qty,unit}) =>(
        <View style={styles.itemsComponent}>
            <View>
                <Text>
                    {name} ${price} per {qty} {unit}
                </Text>
            </View>
    </View>
);
    useEffect(() => {
      (async () => {
          console.log(location);

      })();
    },[]);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

    return (
        <View>
            <MapView initialRegion={route.params.currentLocation} style={styles.map}>
                <Marker title="Me" coordinate={route.params.currentLocation}>
                <View style={styles.circle}>
              <View style={styles.core} />
              <View style={styles.stroke} />
            </View>
                </Marker>
                {stores.map((store,index)=>(
                <Marker key={index} coordinate={{latitude:store.lat,longitude:store.long}} title={store.name} description={store.address}>
                    <Callout>
                        <View>
                            <Text>{store.name}</Text>
                            <View>
                            <FlatList data={store.products} renderItem={({item})=><RenderedItem name={item.name} price={item.price} qty={item.qty} unit={item.unit}/> } keyExtractor={item=>item.id.toString()}/>
                            </View>
                            <Text>{store.address}</Text>
                        </View>
                    </Callout>
                </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    map:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    circle: {
        width: 26,
        height: 26,
        borderRadius: 50
      },
      core: {
        backgroundColor: "red",
        width: 24,
        position: "absolute",
        top: 1,
        left: 1,
        right: 1,
        bottom: 1,
        height: 24,
        borderRadius: 50,
        zIndex: 2
      },
      stroke: {
        backgroundColor: "#ffffff",
        borderRadius: 50,
        width: "100%",
        height: "100%",
        zIndex: 1
      }
});

export default BrowseStores;