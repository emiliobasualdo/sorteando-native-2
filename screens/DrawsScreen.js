import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
  Image,
  TouchableOpacity,
  Button, Alert
} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import TextForEmptySituations from './../components/TextForEmptySituations';
import SmallDrawCard from '../components/SmallDrawCard';
import {
  ScreenHeight,
  ScreeWidth,
  MARGIN, HEAD_ICON_SIZE, HEAD_ICON_SIDE_MARGIN, HEAD_ICON_TOP_MARGIN
} from "../constants/Layout";
import { getFeed, getBanners} from './../services/feed'
import Colors from "../constants/Colors";
import { doAtOrAfter } from "../utils";
import {MaterialIcons} from "@expo/vector-icons";
import HeaderSorteandoLogo from "../components/HeaderSorteandoLogo";
import {useAuth} from "../services/use-auth";
import {getWinner as _getWinner} from "../services/draw";

const BannerHeight = ScreenHeight * 0.3;

const separateDraws = (drawArr) => {
  // separamos los draws en dos columnas
  const left = [], right = [];
  let count = 0;
  // no está tan bueno porque pierde le orden con el que vienen
  drawArr.forEach(d =>
    count++ % 2 ? left.push(d) : right.push(d)
  );
  return [left, right];
};
let onResetPress = () => {};
let onResetDelete = () => {};
export default function DrawsScreen({navigation}) {
  const [ banners, setBanners ] = useState([]);
  const [ feed, setFeed ] = useState([]);
  const [ refreshing, setRefreshing ] = useState(false);
  const {user} = useAuth();
  const {verifyCode, signout} = useAuth();
  onResetDelete = () => {
    signout();
  };
  onResetPress = () => {
    signout();
    verifyCode("+5491111111111", "11");
  };

  useEffect(() => {
    const {left, center} = drawsHeader(navigation);
    navigation.setOptions({
      headerLeft: left,
      headerTitle: center,
    });
    getFeed().then(r => setFeed(r));
    getBanners().then(r => setBanners(r) );
  }, []);

  const onDrawPress = (draw) => {
    if(draw.end_date >= Date.now()) {
      const {navigate} = navigation;
      navigate("Draw", {draw});
    } else {
      setFeed(feed.filter(d => d._id !== draw._id));
    }
  };

  useEffect(() => {
    if (refreshing) {
      const doAT = Date.now() + 1500;
      getFeed().then(r => {
        doAtOrAfter(doAT, () => {
          setFeed(r);
          setRefreshing(false);
        });
      });
    }
  }, [refreshing]);
  
  const getWinner = (drawId) =>
    _getWinner(drawId)
      .then(w => {
        if (user && w._id === user._id) {
          Alert.alert(
            'Ganaste',
            '¡¡Felicitaciones ganaste el sorteo!!\n Nos pondremos en contacto con vos para organizar la entrega.\nTe dijimos que ganar nunca fue ta fácil! ',
            [
              {text: 'Ver sorteo', onPress: () => navigation.navigate("Draw", {drawId}) , style: 'cancel'},
            ],
            {cancelable: true},
          );
        }
        return w;
      });
  
  const [ leftDraws, rightDraws ] = separateDraws(feed);
  return (
    <View style={styles.MainContainer}>
      <View style={styles.ScrollContainer}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />}>
          {__DEV__ && <View style={{flexDirection:"row"}}>
            <Button title={"JWT Reset"} onPress={onResetPress}/>
            <Button title={"JWT Delete"} onPress={onResetDelete}/>
          </View>}
          <View style={styles.BannerContainer}>
            <Carousel
              autoplay
              autoplayTimeout={3000}
              loop
              index={0}
              pageSize={ScreeWidth}
            >
              {banners.map((banner) =>
                <View key={banner._id}>
                  <Image style={styles.BannerImage} source={{uri: banner.image}}/>
                </View>
              )}
            </Carousel>
          </View>
          <View>
            {feed.length?
              (
                <View style={{flex:1, flexDirection: "row"}}>
                  <View style={styles.CardsColumnsLeft}>
                    {rightDraws.map(draw => <SmallDrawCard getWinner={getWinner} onPress={() => onDrawPress(draw)} key={draw._id} draw={draw}/>)}
                  </View>
                  <View style={{marginHorizontal: MARGIN/2}}/>
                  <View style={styles.CardsColumnsRight}>
                    {leftDraws.map(draw => <SmallDrawCard getWinner={getWinner} onPress={() => onDrawPress(draw)} key={draw._id} draw={draw}/>)}
                  </View>
                </View>
              )
              :
              <TextForEmptySituations style={styles.TextForEmptySituations}>
                Ups... No hay sorteos el día de hoy.{"\n"}
                Volvé más tarde para participar.
              </TextForEmptySituations>
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const drawsHeader = (navigation) => ({
  center: <HeaderSorteandoLogo/>,
  left: () =>
    <View style={styles.LeftIconContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('History')}>
        <MaterialIcons name={'history'} size={HEAD_ICON_SIZE}/>
      </TouchableOpacity>
    </View>,
});


const styles = StyleSheet.create({
  MainContainer: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
  },
  Header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  BannerContainer: {
    height: BannerHeight,
    width: '100%',
  },
  BannerImage : {
    width: ScreeWidth,
    height: BannerHeight,
    backgroundColor: Colors.backgroundColor
  },
  ScrollContainer: {
    justifyContent: 'flex-end',
    flex: 18,
    marginLeft: MARGIN,
    marginRight: MARGIN
  },
  CardsColumnsLeft: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  CardsColumnsRight: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  TextForEmptySituations: {
    marginTop: 100,
  },
  SorteandoLogo:{
    height: 40,
    resizeMode: 'contain'
  },
  LeftIconContainer: {
    marginLeft: HEAD_ICON_SIDE_MARGIN,
    alignSelf:'center',
  },
});
