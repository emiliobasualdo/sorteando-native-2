import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import Colors from "../constants/Colors";
import { MARGIN } from "../constants/Layout";
import MyCountDown from "../components/MyCountDown";
import { getWinner } from "../services/draw";
import { doAtOrAfter } from "../utils";

// asumo que no terminó

const [ NONE, LOADING] = [ "", "LOADING"];
const OPACITY = .6;

export default function SmallDrawCard(props) {
    const { draw, onPress } = props;
    const [ winner, setWinner ] = useState(draw.winner? draw.winner : NONE);

    const onFinish = () => {
        // si ya habíamos cargado el ganador. no lo busco de nuevo
        if(winner === NONE ) {
            // busca el ganador, espera por lo menos 3 segundos antes de sacar el spinner
            const doAt = Date.now() + (3 * 1000); // dentro de 3 segundos
            getWinner(draw.id)
                .then(r => {
                    draw.winner = r;
                    doAtOrAfter(doAt, () => setWinner(r));
                });
            // cambia de estado para que se muestre la ventana naranja y el spinner
            setWinner(LOADING);
        }
    };

    return(
        <TouchableOpacity style={styles.DrawContainer} activeOpacity={OPACITY} onPress={onPress} disabled={winner === LOADING}>
            <Image source={{uri: draw.images[0]}} style={styles.DrawImage}/>
            <View style={styles.InfoContainer}>
                <View style={styles.TextContainer}>
                    <Text style={styles.BrandText}>{draw.brand}</Text>
                    <Text style={styles.TitleText}>{draw.title}</Text>
                    <MyCountDown until={draw.endDate} onFinish={onFinish}/>
                </View>
            </View>
            {winner !== NONE &&
                <View style={styles.FinishedView}>
                    {winner===LOADING?
                        <View style={styles.LoadingView}>
                            <Text style={{...styles.LoadingText, fontSize: calculateFontSize("Cargando ganador")}}>Cargando ganador</Text>
                            <ActivityIndicator size={"large"} color={"#ffffff"}/>
                        </View>
                        :
                        winner.split(" ").map((word, i) =>
                            <Text
                                key={i}
                                style={{...styles.WinnerText, fontSize: calculateFontSize(word)}}
                            >
                                {word}
                            </Text>
                        )
                    }
                </View>
            }
        </TouchableOpacity>
    );
}

const calculateFontSize = (word) => {
    const fs = WIDTH / (word.length * 0.7);
    return fs > 47 ? 47: fs
};
const RADIUS = 10;
const WIDTH = 158;
const styles = StyleSheet.create({
    DrawContainer: {
        flex: 1,
        flexDirection:"column",
        justifyContent:"space-between",
        marginBottom: MARGIN,
        backgroundColor: "#fbfbfb",
        padding: 7,
        borderRadius: RADIUS,
        width: "100%"
    },
    FinishedView: {
        flex:1,
        justifyContent: "center",
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: Colors.naranja,
        opacity: 0.9,
        borderRadius: RADIUS,
    },
    DrawImage: {
        flex: 1,
        alignSelf: 'stretch',
        height: 100,
        resizeMode: "cover",
        borderRadius: RADIUS - 3
    },
    InfoContainer: {
        flex: 1,
        marginTop: 7,
        flexDirection: "row"
    },
    TextContainer: {
        flex: 1,
        marginTop: 7,
        flexDirection: "column"
    },
    BrandText: {
        textAlign:'left',
        color: Colors.azul,
        fontSize: 14
    },
    TitleText: {
        textAlign:'left',
        color: '#2f2f2f',
        fontSize: 11
    },
    LoadingView: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    LoadingText:{
        textAlign: "center",
        color: '#ffffff',
        marginTop: MARGIN
    },
    WinnerText: {
        textAlign: "center",
        color: '#ffffff',
    }
});