import * as React from 'react';
import DrawScreen from "../screens/DrawScreen";
import {createStackNavigator} from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";

const Profile = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Profile';

export default function DrawsStackNavigator({ navigation, route }) {
  return (
    <Profile.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Profile.Screen name="Profile" component={ProfileScreen} />
      <Profile.Screen name="ProfileDraws" component={DrawScreen}/>
    </Profile.Navigator>
  );
}
