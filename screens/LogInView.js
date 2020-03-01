import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import Colors from "../constants/Colors";
import SmsButton from "../components/SmsButton";

export default function LogInView({navigation}) {
    navigation.setOptions({
        headerShown: false
    });
    return (
        <View style={styles.Background}>
            <View style={styles.MainContainer}>
                <View style={styles.LogoContainer}>
                    <Image resizeMode={'contain'} style={styles.Logo} source={require('./../assets/images/logo1-white.png')}/>
                </View>
                <View style={styles.FormsContainer}>
                    <SmsButton/>
                </View>
            </View>
        </View>
    );
}

const MARGIN = 20;
const styles = StyleSheet.create({
    Background : {
        flex:1,
        backgroundColor: Colors.naranja2,
    },
    MainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    LogoContainer: {
        flex: 1,
        margin: MARGIN,
    },
    Logo: {
        width: "100%",
        height: "100%"
    },
    FormsContainer: {
        flex:3,
    }
});