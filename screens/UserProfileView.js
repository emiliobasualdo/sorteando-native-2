import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import TextForEmptySituations from './../components/TextForEmptySituations';
import {HEAD_ICON_SIDE_MARGIN, HEAD_ICON_SIZE, MARGIN} from "../constants/Layout";
import BigDrawCard from "../components/BigDrawCard";
import Colors from "../constants/Colors";
import {useAuth} from "../services/use-auth";
import {getDraw} from "../services/draw";
import {Ionicons} from "@expo/vector-icons";

export default function UserProfileView({navigation}) {
    const {user, signout} = useAuth();
    const [draws, setDraws] = useState([]);

    const onSignOut = () => {
        Alert.alert(
          'Cerrar sesión',
          'Estás por cerrar sesión',
          [
              {text: 'Cerrar sesion', onPress: signout},
              {text: 'Cancelar', style: 'cancel'},
          ],
          {cancelable: true},
        );
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: <Text style={styles.HeaderText}>Tus participaciones</Text>,
            headerRight: () =>
              <TouchableOpacity onPress={onSignOut}>
                  <View style={styles.RightIconContainer}>
                      <Ionicons name={Platform.OS !== 'android' ? 'ios-log-out' : "log-out"} size={HEAD_ICON_SIZE}/>
                  </View>
              </TouchableOpacity>
        });
    }, []);
    useEffect(() => {
        // cargamos lo draws
        const proms = user.current_draws.map(drawId => getDraw(drawId));
        Promise.all(proms).then(draws => setDraws(draws));
    }, [user.current_draws]);

    const onDrawPress = (draw) => navigation.navigate("ProfileDraws", {draw});
    return (
        <View style={styles.MainContainer}>
            <View style={styles.PastDrawsContainer}>
                {user.current_draws.length?
                  <View style={{flex:1}}>
                      {draws.length?
                        <ScrollView style={{flex:1}}>
                            {draws.sort((a,b) => a.endDate-b.endDate).map((draw, index) => <BigDrawCard onPress={() => onDrawPress(draw)} key={index} draw={draw}/>)}
                        </ScrollView>
                        :
                        <Text>Loading...</Text>
                      }
                  </View>
                    :
                    <View style={styles.NoDrawsContainer}>
                        <TextForEmptySituations>
                            Todavía no participaste de sorteos?{"\n"}
                            Dirigite al menú principal para participar y ganar!
                        </TextForEmptySituations>
                    </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        marginTop: MARGIN/2,
        flex:1,
        flexDirection: 'column',
    },
    NoDrawsContainer: {
        flex:1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: Colors.gris,
    },
    PastDrawsContainer: {
        flex: 6,
        justifyContent: 'flex-end',
    },
    HeaderText: {
        alignSelf:'center',
        fontSize: 20,
    },
    RightIconContainer: {
        marginRight: HEAD_ICON_SIDE_MARGIN,
        alignSelf:'center',
    },
});