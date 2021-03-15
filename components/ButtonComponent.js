import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import Colors from '../constants/colors';
const buttonComponent = props =>{
    return(
    <TouchableOpacity>
        <Text onPress={props.clickEvent} style={[styles.button,{backgroundColor:props.background,color:props.textColor,borderColor:props.borderColorStyle}]}>{props.buttonTitle}</Text>
    </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button:{
        paddingHorizontal:30,
        paddingVertical:10,
        borderRadius:50,
        borderWidth:2
    },
});
export default buttonComponent;