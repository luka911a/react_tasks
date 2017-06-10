'use strict';

import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainView from './MainView';
import FlightView from './FlightView';

export default class Screen extends Component {
  render() {
    return (
      <AppNav/>
    )
  }
}

const AppNav = StackNavigator({
  Main: { screen: MainView },
  Discription: { screen: FlightView }
});
