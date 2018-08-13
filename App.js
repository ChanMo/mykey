/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation'

import HomeScreen from './containers/HomeScreen'
import AddScreen from './containers/AddScreen'

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Add: AddScreen
}, {
  initialRouteName: 'Home',
  navigationOptions: {
  }
})

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <AppStack />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1e3'
  }
})
