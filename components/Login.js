import React from 'react';
import {Text,View,TextInput,StyleSheet} from 'react-native';
const Login = props =>{return(
    <View style={styles.container}>
        <View style={styles.inputs}>
            <View styles={styles.input}>
                <TextInput placeholder="UserName" autoCompleteType="username"/>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Password" secureTextEntry={true} autoCompleteType="password"/>
            </View>
        </View>
    </View>
)
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent:"center",
    },
    inputs:{
        marginBottom:200,
        
    },
    input:{
        padding:5
    }
  });
export default Login;