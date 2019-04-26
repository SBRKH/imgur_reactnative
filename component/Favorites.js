import React, { Component } from 'react'
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native'
import HandleImage from "./fragment/HandleImage";
import {getFavorites} from "../api/Favorites";

export default class Favorites extends Component
{
  state = {
    images: [],
    isLoading: false
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  async fetchFavorites() {
    this.setState({ isLoading: true });
    const { data } = await getFavorites();
    this.setState({
      images: data,
      isLoading: false
    });
  }

  render() {
    const {images, isLoading} = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <HandleImage image={item} isFav={true}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => this.fetchFavorites()}
          refreshControl={
            <RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={isLoading}
              onRefresh={() => this.fetchFavorites()}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});
