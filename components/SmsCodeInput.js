import React, {useState} from "react";
import {TextInput, Text, View, StyleSheet} from 'react-native';
import { MARGIN } from "../constants/Layout";

const CODE_LENGTH = 6;
export default function PhoneInput({style, onValidCode, initialCode, onInvalidCode}) {
    const [value, setValue] = useState(initialCode);
    const onChangeText = (value) => {
        setValue(value);
        if(value.length === CODE_LENGTH) {
            onValidCode(value);
        } else {
            onInvalidCode(value);
        }
    };

    return (
        <View style={{...styles.MainContainer,...style}}>
            <TextInput
                style={styles.Input}
                onChangeText={value => onChangeText(value)}
                value={value}
                placeholder={"AA1122"}
                placeholderTextColor={"#8d8d8d"}
                autoCompleteType={"tel"}
                keyboardType={"phone-pad"}
            />
        </View>
    )
}
const FONTSIZE = 18;
const styles = StyleSheet.create({
    MainContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: "flex-start",
        borderColor: 'white',
        borderRadius: 5,
        opacity: 0.95,
        borderWidth: 1,
        marginTop: MARGIN,
    },
    Row: {
        flex:1,
        flexDirection: 'row',
    },
    Input:{
        flex: 7,
        fontSize: FONTSIZE,
    },
    Fixed: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignSelf: 'flex-start',
        height: "100%",
    },
    Text: {
        fontSize: FONTSIZE,
        alignSelf: "center",
    }
});