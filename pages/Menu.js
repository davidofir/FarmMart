import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Menu = ({route,navigation}) => {
    const {userId,email} = route.params;
    return (
        <View>
            <Text>Hello {email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default Menu;