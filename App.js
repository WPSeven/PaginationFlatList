import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
  Text,
  Dimensions,
  FlatList,
  Image
} from "react-native";



const App = () => {


  const [loading, setLoading] = useState(true);
  const [randomUserData, setRandomUserData] = useState([]);
  const [loadingExtraData, setLoadingExtraData] = useState(false);
  const [page, setPage] = useState(0);



  const LoadRandomData = () => {
    fetch(`https://randomuser.me/api/?results=10&page=${page}`).
      then(response => response.json())
      .then(responseJson => {
        setRandomUserData(page === 1 ? responseJson.results : [...randomUserData, ...responseJson.results])
      }).catch(error => {
        console.log('Error selecting random data: ' + error)
      })
  }


  const LoadMoreRandomData = () => {
    setPage(page + 1)
  }



  const renderCustomItem = ({ item, index }) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>{item.gender}</Text>
        <Text>{item.name["first"]} {item.name["last"]}</Text>
        <Image source={{ uri: item.picture["medium"] }} style={{ width: 200, height: 200 }} />
      </View>
    )
  }

  useEffect(() => {
    LoadRandomData()
  }, []);

  useEffect(() => {
    LoadRandomData()
  }, [page]);


  const keyExtractor = (item, index) => item.email;

  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={randomUserData}
        renderItem={renderCustomItem}
        style={{ width: 350, height: 800 }}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={1}
        onEndReached={LoadMoreRandomData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef",
    flexDirection: "column",
  },

});


export default App;
