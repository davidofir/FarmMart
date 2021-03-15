import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import Colors from '../constants/colors';
const SubmitButton = props =>{
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
        width:380,
        height:40,
        borderWidth:2,
        marginLeft:7,
        marginBottom:6,
        textAlign:"center",
        alignSelf:"center",
        fontSize:17
    },
});
export default SubmitButton;