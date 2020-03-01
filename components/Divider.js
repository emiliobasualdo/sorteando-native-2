import React from 'react';
import { Divider as ReactDivider } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import Colors from "../constants/Colors";
import {MARGIN} from "../constants/Layout";

export default function Divider(props) {
    return (
        <ReactDivider style={styles.Divider} />
    );
}

const styles = StyleSheet.create({
    Divider: {
        backgroundColor: Colors.azul,
        height: 3,
        marginTop: MARGIN,
    }
});