import React, {Component} from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import {TabNavigator} from 'react-navigation';
import Recipes from './components/Recipes';
import Favorites from './components/Favorites';
import Home from './components/Home';

const App = TabNavigator({
    Home: {screen: Home},
    Recipes: {screen: Recipes},
    Favorites: {screen: Favorites}
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      activeBackgroundColor: '#6365A0',
      showIcon: true,
      style: {
        height: 60,
        backgroundColor: '#777DB2',
      },
      labelStyle: {
        fontSize: 14,
      }
    }
  }
)

App.navigationOptions = {
  title: 'Recipe app'
}

export default App
