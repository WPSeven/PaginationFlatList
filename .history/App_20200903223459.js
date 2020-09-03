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


  componentDidMount() {
    this.LoadRandomData()
  }


  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <FlatList
          data={this.state.randomUserData}
          style={{ width: 350, height: 800 }}
        />
      </View>
    )
  }
}