import React, {Component} from 'react'
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native'
import { Icon } from 'react-native-elements'
import { getAccountImages } from "../api/AccountImages";
import HandleImage from "./fragment/HandleImage";

export default class Images extends Component
{
  state = {
    images: [],
    isLoading: false
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  async fetchUserProfile() {
    this.setState({ isLoading: true });
    const { data } = await getAccountImages();
    this.setState({
      images: data,
      isLoading: false
    });
  }

  refresh() {
    this.fetchUserProfile();
  }

  render() {
    const {images, isLoading} = this.state;

    return (
      <View style={styles.container}>
          <FlatList
            data={images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <HandleImage image={item} isFav={false}/>}
            refreshControl={
              <RefreshControl
                colors={["#9Bd35A", "#689F38"]}
                refreshing={isLoading}
                onRefresh={() => this.fetchUserProfile()}
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
