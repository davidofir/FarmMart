import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import Colors from '../constants/colors';
const Checkbox = props =>{
    const [buttonContent,setButtonContent] = useState("");
    const [background,setBackground] = useState(Colors.secondary);
    const [isChecked,setIsChecked] = useState(false);
    const  toggle=()=>{
        if(!isChecked){
            setIsChecked(true);
            setButtonContent("✓");
            setBackground(Colors.primary);

        }else{
            setIsChecked(false);
            setButtonContent("");
            setBackground(Colors.secondary);
        }
}
    return(
        
        <View style={styles.checkboxAligner}>
        <TouchableOpacity style={[{backgroundColor:background},styles.checkboxContainer]} onPress={toggle}>
               <Text style={{color:Colors.secondary,textAlign:"center",fontSize:10}}>{buttonContent}</Text> 
        </TouchableOpacity>
        <Text style={styles.label} onPress={toggle}>
            {props.label}
        </Text>
    </View>
    );
}
const styles = StyleSheet.create({
    checkboxContainer:{
        marginTop:5,
        borderWidth:2,
        height:18,
        width:18,
        textAlign:'center',
        color:Colors.secondary,
        borderColor:Colors.primary,
        
        
    },
    checkboxAligner:{
        flexDirection:"row",
        marginTop:10,
    },
    label:{
        marginTop:2,
        marginLeft:5,
        padding:2
    }
});
export default Checkbox;