import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import {
    MARGIN,
    ScreeWidth,
    ScreenHeight
} from '../constants/Layout'
import Carousel from "react-native-banner-carousel";
import Colors from "../constants/Colors";
import CountDown from "react-native-countdown-component";
import ParticipateButton from "../components/ParticipateButton";
import HeaderSorteandoLogo from "../components/HeaderSorteandoLogo";
import {useAuth} from "../services/use-auth";

const BannerHeight = ScreenHeight * 0.4;

export default function DrawScreen({navigation, route}) {
    const { draw } = route.params;
    const {user} = useAuth();
    const now = Date.now() / 1000;
    const [finished, setFinished] = useState(draw.endDate <= now);

    const participating = user && user.current_draws.includes(draw.id);

    const onFinish = () => setFinished(true);

    useEffect(() => navigation.setOptions({
          headerTitle: <HeaderSorteandoLogo/>,
          headerBackTitleVisible: false
      }),[]);

    return (
        <View style={styles.MainContainer}>
            <View style={styles.ScrollContainer}>
                <ScrollView>
                    <View style={styles.BannerContainer}>
                        <Carousel
                            autoplay
                            autoplayTimeout={3000}
                            loop
                            index={0}
                            pageSize={ScreeWidth}
                        >
                            {draw.images.map((image, index) =>
                                <View key={index}>
                                    <Image style={styles.BannerImage} source={{uri: image}}/>
                                </View>
                            )}
                        </Carousel>
                    </View>
                    <View style={{marginTop:MARGIN}}>
                        <Text style={styles.DrawBrand}>{draw.brand}</Text>
                        <Text style={styles.DrawBigTitle}>{draw.title}</Text>
                        <Text style={styles.DrawDescription}>{draw.description}</Text>
                        <View>
                            {finished?
                                <View style={styles.ExtraContainer}>
                                    <View>
                                        <Text style={styles.ExpiryDescription}>El sorteo terminó</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.WinnerTitle}>Ganador@: <Text style={styles.WinnerName}>{draw.winner}</Text></Text>
                                    </View>
                                </View>
                            :
                                <View>
                                    <Text style={styles.ExpiryDescription}>El sorteo termina en:</Text>
                                    <View style={styles.CountDownContainer}>
                                    <CountDown
                                        until={draw.endDate - now}
                                        digitStyle={styles.CountDownDigits}
                                        digitTxtStyle={styles.CountDownDigitsTxt}
                                        timeToShow={['D', 'H', 'M', 'S']}
                                        timeLabels={{d: 'D', h: 'H', m: 'M', s: 'S'}}
                                        size={20}
                                        onFinish={onFinish}
                                    />
                                    </View>
                                    <ParticipateButton isUserParticipating={participating} draw={draw}/>
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const SMALL_MARGIN = 3;
const backgroundColor = '#ffffff';
const styles = StyleSheet.create({
    MainContainer: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: backgroundColor,
    },
    BannerContainer: {
        height: BannerHeight,
        width: '100%',
    },
    BannerImage : {
        width: ScreeWidth,
        height: BannerHeight,
        backgroundColor: backgroundColor
    },
    ScrollContainer: {
        justifyContent: 'flex-end',
        flex: 18,
        backgroundColor: backgroundColor
    },
    DrawBrand: {
        marginLeft: MARGIN,
        marginRight: MARGIN,
        textAlign: "right",
        fontSize: 26,
        fontWeight: "500",
        color: Colors.azul,
    },
    DrawBigTitle: {
        marginLeft: MARGIN,
        marginRight: MARGIN,
        marginTop: SMALL_MARGIN,
        textAlign: "left",
        fontSize: 26,
        fontWeight: "500"
    },
    DrawDescription:{
        marginLeft: MARGIN,
        marginRight: MARGIN,
        marginTop: SMALL_MARGIN,
        textAlign: "left",
        fontSize: 15,
    },
    ExtraContainer:{
        marginLeft: MARGIN,
        marginRight: MARGIN,
        marginTop: 14,
    },
    WinnerTitle:{
        color: Colors.naranja,
        fontSize: 21
    },
    WinnerName:{
        color: 'black',
        fontSize: 21
    },
    ExpiryDescription: {
        marginLeft: MARGIN,
        marginRight: MARGIN,
        marginTop: 14,
        textAlign: "center",
        fontSize: 10,
    },
    CountDownContainer: {
        alignItems: 'center',
        marginTop: SMALL_MARGIN,
        marginLeft: MARGIN,
        marginRight: MARGIN,
        resizeMode: 'contain'
    },
    CountDownDigits: {
        backgroundColor: Colors.naranja
    },
    CountDownDigitsTxt:{
        color: '#ffffff'
    },
});
