import {Image, StyleSheet} from "react-native";
import React from "react";

export default () => <Image source={require('../assets/images/logo1-orange.png')} style={styles.SorteandoLogo}/>

const styles = StyleSheet.create({
  SorteandoLogo:{
    height: 40,
    resizeMode: 'contain'
  }
});