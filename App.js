import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Details from './screens/Details';
import Home from './screens/Home';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default function App() {
  return (
    <AppContainer/>
  );
}

const AppStacknavigator = createStackNavigator({
  Home : {Screen: Home},
  Details: {Screen: Details}
},
{
  initialRouteName: 'Home'
}
)

const AppContainer = createAppContainer(AppStacknavigator)