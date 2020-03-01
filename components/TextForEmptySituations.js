import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function Divider({style, children}) {
    return (
        <View style={style}>
            <Text style={styles.Text} >{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Text : {
        color:'#b1b1b1',
        textAlign:'center',
        textAlignVertical: 'center'
    },
});