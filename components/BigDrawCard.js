import React, {useState} from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Colors from "../constants/Colors";
import { MARGIN } from "../constants/Layout";
import MyCountDown from "../components/MyCountDown";
import {getDraw} from "../services/draw";

const OPACITY = 0.6;
export default function BigDrawCard({ draw, onPress }) {
    const now = Date.now() / 1000;
    const [finished, setFinished] = useState(draw.endDate <= now);
    const [_draw, setDraw] = useState(draw);
    const onFinish = () => {
        setFinished(true);
        getDraw(_draw.id).then(draw => setDraw(draw))
    };
    return(
        <TouchableOpacity activeOpacity={OPACITY} disabled={finished} onPress={onPress} style={styles.DrawContainer} >
            <Image source={{uri: _draw.images[0]}} style={styles.DrawImage}/>
            <View style={styles.InfoContainer}>
                <View style={styles.TextContainer}>
                    <Text style={styles.BrandText}>{_draw.brand}</Text>
                    <Text style={styles.TitleText}>{_draw.title}</Text>
                </View>
                <View style={styles.CountDownContainer}>
                    {finished?
                        <View style={styles.WinnerContainer}>
                            <Text style={styles.WinnerName}>{_draw.winner}</Text>
                        </View>
                        :
                        <MyCountDown until={_draw.endDate} onFinish={onFinish}/>
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
}

const RADIUS = 2;
const BIGGERFONT = 16;
const styles = StyleSheet.create({
    DrawContainer: {
        flex: 1,
        flexDirection:"column",
        justifyContent:"space-between",
        backgroundColor: "#ffffff",
        padding: 7,
        marginRight: MARGIN,
        marginLeft: MARGIN,
        marginBottom: MARGIN,
        borderRadius: RADIUS,
    },
    WinnerContainer: {
        flex: 1,
        alignSelf: "flex-end",
        position: 'absolute',
        right: 0,
        marginTop: 7,
        flexDirection: "row"
    },
    WinnerName:{
        textAlign: 'right',
        color: Colors.naranja,

        fontSize: BIGGERFONT
    },
    DrawImage: {
        flex: 1,
        alignSelf: 'stretch',
        height: 170,
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
        fontSize: BIGGERFONT
    },
    TitleText: {
        textAlign:'left',
        color: '#2f2f2f',
        fontSize: 12
    }
});