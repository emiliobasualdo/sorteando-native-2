import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from "../constants/Colors";
import {MARGIN} from "../constants/Layout";
import {useAuth} from "../services/use-auth";

const [PARTICIPATE, LOADING,PARTICIPATING, ERROR] = [1,2,3,4];
const OPACITY = 0.6;
export default function ParticipateButton({isUserParticipating, draw}) {
    const {user} = useAuth(); // esto viene del estado
    const [buttonState, setButtonState] = useState(isUserParticipating? PARTICIPATING : PARTICIPATE);

    let backgroundColor, borderColor, buttonText, textColor;
    switch (buttonState) {
        case PARTICIPATE:
            backgroundColor = Colors.azul;
            borderColor = Colors.azul;
            buttonText = "Participar";
            textColor = 'white';
            break;
        case LOADING:
            backgroundColor = 'white';
            borderColor = Colors.azul;
            textColor = Colors.naranja;
            buttonText = "Cargando";
            break;
        case PARTICIPATING:
            backgroundColor = Colors.verde;
            borderColor = Colors.verde;
            textColor = 'white';
            buttonText = "Estás participando";
            break;
        case ERROR:
            backgroundColor = Colors.rojo;
            borderColor = Colors.rojo;
            textColor = 'white';
            buttonText = "Error";
            break;
    }

    const error = () => {
        setButtonState(ERROR);
        setTimeout(() => {
            setButtonState(PARTICIPATE);
        }, 2000);
    };
    const onPress = () => {
        switch (buttonState) {
            case PARTICIPATE:
                setButtonState(LOADING);
                user.participate(draw.id)
                  .then(() => setButtonState(PARTICIPATING))
                  .catch(console.error);
                break;
            case LOADING:
                break;
            case PARTICIPATING:
                setButtonState(LOADING);
                user.stopParticipating(draw.id)
                  .then(() => setButtonState(PARTICIPATE))
                  .catch(console.error);
                break;
        }
    };

    return (
        <View style={styles.Container}>
            <TouchableOpacity
                activeOpacity={OPACITY}
                style={{...styles.Button, backgroundColor, borderColor}}
                onPress={onPress}
                disabled={buttonState === LOADING}
            >
                <Text style={{...styles.Text, color: textColor}}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Container:{
        resizeMode: 'contain',
        margin: MARGIN,
        paddingRight: 15,
        paddingLeft: 15,
        height: 70,
        backgroundColor: 'white'
    },
    Button: {
        borderRadius: 40,
        borderWidth: 4,
        height: '100%',
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    Text: {
        fontSize: 33,
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: "600",
    }
});