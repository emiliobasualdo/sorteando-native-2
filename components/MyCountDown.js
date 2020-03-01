import CountDown from "react-native-countdown-component";
import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from "../constants/Colors";

const DAYS = 24*60*60;
export default function Divider({ until, onFinish }) {
    const now = Date.now() / 1000;
    let timeToShow, timeLabels;
    if ((until - now) > (DAYS)) {
        timeToShow = ['D', 'H', 'm'];
        timeLabels = {d: 'D', h: 'H', m: 'm'};
    } else {
        timeToShow = ['H', 'M', 'S'];
        timeLabels = { h: 'H', m: 'm', s:'s'};
    }
    return (
        <CountDown
            until={until-now}
            digitStyle={styles.CountDownDigits}
            digitTxtStyle={styles.CountDownDigitsTxt}
            timeToShow={timeToShow}
            timeLabels={timeLabels}
            onFinish={onFinish}
        />
    );
}

const styles = StyleSheet.create({
    CountDownDigits: {
        backgroundColor: '#FFF',
    },
    CountDownDigitsTxt:{
        color: Colors.naranja
    },
});