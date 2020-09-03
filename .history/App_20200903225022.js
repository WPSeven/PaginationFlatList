import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image
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

  renderCustomItem = ({ item, index }) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>{item.gender}</Text>
        <Text>{item.name["first"]} {item.name["last"]}</Text>
        <Image source={{ uri: item.picture["medium"] }} style={{ width: 200, height: 200 }} />
      </View>
    )
  }

  componentDidMount() {
    this.LoadRandomData()
  }

  keyExtractor = (item, index) => item.email;

  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <FlatList
          data={this.state.randomUserData}
          renderItem={this.renderCustomItem}
          style={{ width: 350, height: 800 }}
          keyExtractor={this.keyExtractor}

        />
      </View>
    )
  }
}