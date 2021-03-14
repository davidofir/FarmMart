import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import Colors from '../constants/colors';
const buttonComponent = props =>{
    return(
    <TouchableOpacity>
        <Text style={styles.button}>{props.buttonTitle}</Text>
    </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:Colors.primary,
        paddingHorizontal:30,
        paddingVertical:10,
        color:Colors.secondary,
        borderRadius:50
    },
});
export default buttonComponent;