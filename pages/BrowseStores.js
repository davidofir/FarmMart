import React, { useCallback, useEffect } from 'react';
import { Platform,Button, Dimensions, StyleSheet, Text, View,Alert } from 'react-native';
import Colors from '../constants/colors';
import MapView,{Marker,Circle} from 'react-native-maps';
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
const BrowseStores = ({Navigation,route})=>{
    const [mapRegion,setMapRegion] = useState({longitude:0,latitude:0,longitudeDelta: 0.0922,latitudeDelta: 0.0421});
    const db = firebase.firestore();
    // const [stores,setStores] = useState([]);
    const [location, setLocation] = useState({longitude:-79.7019476,latitude:43.4701695,longitudeDelta: 0.0922,latitudeDelta: 0.0421});
    const [errorMsg, setErrorMsg] = useState({longitude:0,latitude:0,longitudeDelta: 0.0922,latitudeDelta: 0.0421});
    const stores = route.params.stores;
    const [markers,setMarkers] = useState([]);
    useEffect(() => {
      (async () => {
          try{
        let { status } = Location.requestPermissionsAsync().then(
           ()=>{
               let currentLocation = Location.getCurrentPositionAsync({}).then(
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
        console.log(error);
    }


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
            <MapView initialRegion={location} style={styles.map}>
                <Marker title="Me" coordinate={location}>
                <View style={styles.circle}>
              <View style={styles.core} />
              <View style={styles.stroke} />
            </View>
                </Marker>
                {stores.map((store,index)=>(
                <Marker key={index} coordinate={{latitude:store.lat,longitude:store.long}} title={store.name} description={store.address}>
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