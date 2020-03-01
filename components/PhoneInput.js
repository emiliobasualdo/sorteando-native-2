import React, {useState} from "react";
import {TextInput, Text, View, StyleSheet} from 'react-native';
import { MARGIN } from "../constants/Layout";
import { AsYouType } from 'libphonenumber-js';

export default function PhoneInput({style, onValidNumber, initialNumber, onInvalidNumber}) {
    const [value, setValue] = useState(initialNumber);
    const onChangeText = (value) => {
        if(value.length > 10 + 4) { //10 + "() -"
            setValue(value.substring(0, 14));
        } else {
            // sacamos los caractener que no son numéricos
            const input = value.replace(/[^0-9]/g, '');
            // lo mandamos a parsear.
            let formatted = new AsYouType('AR').input(input);
            //Si reconoce la extensión la va a separar con " ".
            const space = formatted.indexOf(" ");
            if (space > 0) {
                formatted = "(" + formatted.substring(0, space) + ") " + formatted.substring(space+1, formatted.length);
            }
            const filtered = formatted.replace(/[^0-9]/g, '');
            setValue(formatted);
            if(filtered.length === 10) {
                onValidNumber(formatted);
            } else {
                onInvalidNumber(formatted);
            }
        }
    };

    return (
        <View style={{...styles.MainContainer,...style}}>
            <View style={{...styles.Fixed, marginLeft: 10}}>
                <Text style={styles.Text}>+54</Text>
            </View>
            <View style={{...styles.Fixed, marginLeft: 5, marginRight: 4}}>
                <Text style={styles.Text}>9</Text>
            </View>
            <TextInput
                style={styles.Input}
                onChangeText={value => onChangeText(value)}
                value={value}
                placeholder={"(11) 3344-5566"}
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
        borderColor: 'white',
        borderRadius: 5,
        opacity: 0.95,
        borderWidth: 1,
        marginTop: MARGIN,
    },
    Input:{
        flex: 7,
        fontSize: FONTSIZE,
    },
    Fixed: {
        justifyContent: "center",
        height: "100%",
    },
    Text: {
        fontSize: FONTSIZE,
        alignSelf: "center",
    }
});