import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import TextForEmptySituations from './../components/TextForEmptySituations';
import BigDrawCard from '../components/BigDrawCard';
import HeaderDivider from './../components/HeaderDivider';
import Colors from "../constants/Colors";
import {getHistory} from "../services/feed";


export default function HistoryScreen({navigation}) {
  const [draws, setDraws] = useState([]);
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    navigation.setOptions({headerTitle: header(), headerLeft: null});
      getHistory(page)
      .then(ds => setDraws(ds))
  }, []);
  
  return (
    <View style={styles.MainContainer}>
      <HeaderDivider style={{marginTop: 8}}/>
      <View style={styles.ScrollContainer}>
        <ScrollView style={styles.Scroll}>
          <View>
            {draws.length ?
              draws.map((draw, index) => <BigDrawCard key={index} draw={draw}/>)
              :
              <TextForEmptySituations>
                Ups... No se pudo cargar los sorteos anteriores.{"\n"}
                Reintentá más tarde.
              </TextForEmptySituations>
            }
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const header = () => <Text style={styles.HeaderText}>Ganadores pasados</Text>;

const MARGIN = 20;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: MARGIN,
    flexDirection: 'column',
  },
  Header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  HeaderText: {
    alignSelf: 'center',
    fontSize: 20,
  },
  ScrollContainer: {
    backgroundColor: Colors.gris,
    justifyContent: 'flex-start',
    flex: 18,
  },
  Scroll: {
    marginTop: MARGIN
  }
});
