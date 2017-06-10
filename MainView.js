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
  ActivityIndicator, 
} from 'react-native';

let flightData = require('./flights.json');
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


var timeOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'GMT+0300',
  hour: 'numeric',
  minute: 'numeric'
};

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1,
  },
  price: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  cityText: {
    fontSize: 14,
    lineHeight: 18
  },
  dateText: {
    fontSize: 14,
    lineHeight: 18
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 46,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    marginBottom: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,

    }
  }

  static navigationOptions = {
    title: 'Main',
  };

  componentDidMount() {
      this.setState({
        isLoading: false,
        sortedData: flightData.trips,
        dataSource: ds.cloneWithRows(flightData.trips)
      })
  }

  sortArrayAsc(array, key) {
    return array.sort(function (a,b) {
      return b[key] > a[key] ? -1
           : b[key] < a[key] ? 1
           : 0
    })
  }

   onPressSort(key) {
    let sortedData = this.state.sortedData;
    sortedData = this.sortArrayAsc(sortedData, key)

    this.setState({
      dataSource: ds.cloneWithRows(sortedData)
    });
  }

  rowPressed(rowData) {
    const { navigate } = this.props.navigation;
    navigate('Discription', {
      rowData: rowData
    })
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={require('./images/bus.png')} />
            <View  style={styles.textContainer}>
              <Text style={styles.cityText}>Город отбытия: {rowData.cityFrom}</Text>
              <Text style={styles.cityText}>Город Прибытия: {rowData.cityTo}</Text>
              <Text style={styles.dateText}>Дата и время отбытия: {new Date(rowData.dateTimeFrom*1000).toLocaleString("ru", timeOptions)}</Text>
              <Text style={styles.dateText}>Дата и время прибытия: {new Date(rowData.dateTimeTo*1000).toLocaleString("ru", timeOptions)}</Text>
              <Text style={styles.price}>Цена билета: {rowData.price} ₽</Text>     
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 50}}>
         <TouchableHighlight 
          style={styles.button} 
          onPress={() => this.onPressSort('price')} 
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Сортировать по цене</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.button} 
          onPress={() => this.onPressSort('dateTimeFrom')}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Сортировать по времени</Text>
        </TouchableHighlight>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

module.exports = MainView;
