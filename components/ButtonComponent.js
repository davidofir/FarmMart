import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import Colors from '../constants/colors';
const buttonComponent = props =>{
    return(
    <TouchableOpacity style={[styles.button,{backgroundColor:props.background,borderColor:props.borderColorStyle}]}>
        <Text onPress={props.clickEvent} style={{color:props.textColor}}>{props.buttonTitle}</Text>
    </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button:{
        paddingHorizontal:105,
        paddingVertical:10,
        borderRadius:10,
        borderWidth:2,
    }
});
export default buttonComponent;