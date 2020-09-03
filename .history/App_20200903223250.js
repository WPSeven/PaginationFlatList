import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';

LoadRandomData = () => {
  fetch(`https://randomuser.me/api/?results=10&page=${this.state.page}`).
    then(response => response.json())
    .then(responseJson => {
      this.setState({
        randomUserData: this.state.page === 1 ? responseJson.results : [...this.state.randomUserData, ...responseJson.results]
      })
    }).catch(error => {
      console.log('Error selecting random data: ' + error)
    })
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      randomUserData: [],
      loadingExtraData: false,
      page: 1
    }
  }
  render() {
    return (
      <View>
      </View>
    )
  }
}