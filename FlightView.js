'use strict';

import React, { Component } from 'react';
import {
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ListView, 
  TouchableHighlight, 
  ActivityIndicator 
} from 'react-native'
import MapView from 'react-native-maps';

var timeOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'GMT+0300',
  hour: 'numeric',
  minute: 'numeric'
};

var styles = StyleSheet.create({
  cityContainer: {
    marginTop: 40
  },
  dateContainer: {
    marginTop: 40
  },
  cityText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10
  },
  dateText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    marginTop: 10
  },
  map: {
    marginTop: 10,
    width: '100%',
    height: 250,
  },
  price: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  adress: {
    marginTop: 50,
    paddingLeft: 10,
  }
});

export default class FlightView extends Component {
  static navigationOptions = {
    title: 'Discription'
  };

  render() {
    let data = this.props.navigation.state.params.rowData;
 
    return (
      <View>
        <View style={styles.cityContainer}>
          <Text style={styles.cityText}>{data.cityFrom} - {data.cityTo}</Text>
        </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Дата и время отбытия: {new Date(data.dateTimeFrom*1000).toLocaleString("ru", timeOptions)}</Text>
        <Text style={styles.dateText}>Дата и время прибытия: {new Date(data.dateTimeTo*1000).toLocaleString("ru", timeOptions)}</Text>
      </View> 
        <Text style={styles.price}>Цена билета: {data.price} ₽</Text> 
        <Text style={styles.adress}>Автовокзал находится по адресу:</Text>
        <MapView style={styles.map}
          initialRegion={{
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: data.latitude,
              longitude: data.longitude
            }}
          />  
        </MapView>
      </View>
    );
  }
}

module.exports = FlightView;