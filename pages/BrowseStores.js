import React, { useCallback, useEffect } from 'react';
import { Platform,Button, Dimensions, StyleSheet, Text, View,Alert } from 'react-native';
import Colors from '../constants/colors';
import MapView,{Marker} from 'react-native-maps';
import Login from './Login';
import 'react-native-gesture-handler';
import ButtonComponent from '../components/ButtonComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import firebase from 'firebase';
import 'firebase/firestore';
import * as Location from 'expo-location';
import { useState } from 'react/cjs/react.development';
const BrowseStores = ({Navigation})=>{
    const [mapRegion,setMapRegion] = useState({longitude:0,latitude:0,longitudeDelta: 0.0922,latitudeDelta: 0.0421});
    const db = firebase.firestore();
    const [stores,setStores] = useState([]);
    const [location, setLocation] = useState({longitude:-79.7019476,latitude:43.4701695,longitudeDelta: 0.0922,latitudeDelta: 0.0421});
    const [errorMsg, setErrorMsg] = useState({longitude:0,latitude:0,longitudeDelta: 0.0922,latitudeDelta: 0.0421});
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
               ).then(
                   ()=>{
                        db.collection("stores").get().then(
                            (snapshot)=>{
                                snapshot.docs.forEach(doc=>{
                                    setStores([...stores,doc.data()]);
                                })
                            }
                        ).then(
                            ()=>{
                               setMarkers( [...markers,stores.map(store=><Marker coordinate={{latitude:store.lat,longitude:store.long}}></Marker>)])
                            }
                        )
                   }
               );
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
    }, []);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }


    // db.collection("stores").get().then(
    //     (snapshot)=>{
    //         snapshot.docs.forEach(doc=>{
    //             setStores([...stores,doc.data()]);
    //         })
    //     }
    // )
    // console.log(stores);
    return (
        <View>
            <MapView initialRegion={location} style={styles.map}>
                <Marker coordinate={location}></Marker>
                    {markers}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    map:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default BrowseStores;