import React, {Component} from 'react'
import {DeviceEventEmitter, ActivityIndicator, TouchableOpacity, Button, View, AsyncStorage, Text, FlatList, StyleSheet} from 'react-native'

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'MyKey',
    headerRight: (
      <TouchableOpacity 
        style={{marginRight:15}}
        onPress={()=>navigation.navigate('Add')}>
        <Text style={{color:'#40407a'}}>添加</Text>
      </TouchableOpacity>
    )
  })

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      keys: []
    }
    this._getData()
  }

  componentDidMount() {
    DeviceEventEmitter.addListener('list_changed', (e) => {
      this._getData()
    })
  }

  _getData = async() => {
    try {
      AsyncStorage.getAllKeys((error, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
          let keylist = []
          stores.map((result, i, store) => {
            let key = store[i][0]
            console.log(key)
            let value = JSON.parse(store[i][1])
            value["key"] = key
            keylist.push(value)
          })
          console.log(keylist)
          this.setState({
            loading: false,
            keys: keylist
          })
        })
      })
    } catch(error) {
      this.setState({loading:false})
      console.error(error)
    }
  }

  _clear = async() => {
    await AsyncStorage.clear()
  }

  _renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={{fontSize:24,color:'#2c2c54'}}>EMPTY</Text>
      <View style={{width:120}}>
        <Button title='添加' 
          color='#218c74'
          onPress={()=>this.props.navigation.navigate('Add')} />
      </View>
    </View>
  )

  render() {
    if(this.state.loading) {
      return <View style={styles.loadingContainer}><ActivityIndicator /></View>
    }
    return (
      <View style={{flex:1,backgroundColor: '#f7f1e3'}}>
        <FlatList
          data={this.state.keys}
          keyExtractor={(item)=>item.key}
          renderItem={({item}) => (
            <TouchableOpacity 
              onPress={()=>this.props.navigation.navigate('Add',{key:item.key})}
              style={styles.item}>
              <Text style={styles.site}>{item.site}</Text>
              <Text style={styles.username}>{item.username}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={this._renderEmpty}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 2
  },
  site: {
    fontSize: 18,
    color: '#2c2c54'
  },
  username: {
    color: '#84817a'
  }
});
