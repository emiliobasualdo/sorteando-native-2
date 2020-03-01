import * as React from 'react';
import {Platform} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import DrawsStackNavigator from "./DrawsStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation }) {
  navigation.setOptions({
    headerShown: false
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        <BottomTab.Screen
          name="Home"
          component={DrawsStackNavigator}
          options={{
            title: '',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          }}
        />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS !== 'android' ? 'ios-contact' : 'contact'} />,
        }}
      />
    </BottomTab.Navigator>
  );
}