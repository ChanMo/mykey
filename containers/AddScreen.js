import React, {Component} from 'react'
import {DeviceEventEmitter, AsyncStorage, View, TextInput, Text, Button, StyleSheet} from 'react-native'

const uuid = require('uuid/v1')

export default class AddScreen extends Component {
  static navigationOptions = {
    title: '添加'
  }

  constructor(props) {
    super(props)
    let key = props.navigation.getParam('key', null)
    this.state = {
      key: key,
      site: null,
      username: null,
      password: null
    }
    if(key) {
      this._get()
    }
  }

  _get = async() => {
    try {
      const data = await AsyncStorage.getItem(this.state.key)
      if(data) {
        let json = JSON.parse(data)
        this.setState({
          site: json.site,
          username: json.username,
          password: json.password
        })
      }
    } catch(error) {
      console.error(error)
    }
  }

  _save = async() => {
    let key = this.state.key
    key = key ? key : uuid()
    let value = JSON.stringify({
      site: this.state.site,
      username: this.state.username,
      password: this.state.password
    })
    try {
      await AsyncStorage.setItem(key, value)
      DeviceEventEmitter.emit('list_changed')
      this.props.navigation.goBack()
    } catch(error) {
      console.error(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>网站</Text>
        <TextInput 
          value={this.state.site} 
          onChangeText={(value)=>this.setState({site:value})} />
        <Text>用户名</Text>
        <TextInput 
          value={this.state.username}
          onChangeText={(value) => this.setState({username:value})} />
        <Text>密码</Text>
        <TextInput
          value={this.state.password}
          onChangeText={(value) => this.setState({password:value})} />
        <Button 
          disabled={!this.state.site}
          color='#218c74'
          onPress={this._save}
          title='添加' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
})
