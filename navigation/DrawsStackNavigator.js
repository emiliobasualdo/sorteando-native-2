import * as React from 'react';
import DrawsScreen from '../screens/DrawsScreen';
import HistoryScreen from "../screens/HistoryScreen";
import DrawScreen from "../screens/DrawScreen";
import {createStackNavigator} from "@react-navigation/stack";

const Home = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Draws';

export default function DrawsStackNavigator({ navigation, route }) {
  return (
    <Home.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Home.Screen name="Draws" component={DrawsScreen} />
      <Home.Screen name="Draw" component={DrawScreen}/>
      <Home.Screen name="History" component={HistoryScreen} options={{gestureDirection: "horizontal-inverted"}}/>
    </Home.Navigator>
  );
}
