import React, {Component} from 'react'
import { View, ActivityIndicator, StyleSheet, Button, FlatList,  RefreshControl} from 'react-native'
import { getImageFromString, getFeed } from "../api/Feed";
import HandleImage from "./fragment/HandleImage";
import { SearchBar, ButtonGroup } from 'react-native-elements';

export default class Feed extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 0,
    btnFilter: 1,
    period: "week",
    searchedText: ""
  }

  componentDidMount() {
    this.fetchImages();
  }

  async fetchImages() {
    const {isLoading, searchedText, page, period, images} = this.state;

    this.setState({ isLoading: true });
    if (searchedText !== "") {
      const {data} = await getImageFromString(searchedText, page + 1, period);
      this.setState({ images: [ ...images, ...data ] });
    } else {
      const {data} = await getFeed(period, page + 1);
      this.setState({ images: [ ...images, ...data ] });
    }
    this.setState({ page: page + 1, isLoading: false });
  }

  handleInput(text) {
    this.setState({searchedText: text});
  }

  searchImages() {
    this.setState({page: 0, images: []}, () => {this.fetchImages();});
  }

  onClear() {
    this.setState({searchedText: ""}, () => {this.fetchImages();})
  }

  filter = (index) => {
    const filterArray = [
      {"id": 0, "value": "day"},
      {"id": 1, "value": "week"},
      {"id": 2, "value": "month"},
      {"id": 3, "value": "year"},
      {"id": 4, "value": "all"}
    ];

    filterArray.map(elem => {
      if (index === elem.id) {
        this.setState({period: elem.value, btnFilter: elem.id});
        this.searchImages();
        return index;
      }
    });
  }

  render() {
    const {images, isLoading, searchedText, btnFilter} = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Cat, Dog, Pizza, ..."
          onChangeText={(text) => this.handleInput(text)}
          onSubmitEditing={() => this.searchImages()}
          onClear={() => this.onClear()}
          value={searchedText}
        />
        <ButtonGroup
          onPress={this.filter}
          selectedIndex={btnFilter}
          buttons={['Day', 'Week', 'Month', 'Year', 'All']}
        />
        <FlatList
          data={images}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <HandleImage image={item} isFav={false}/>}
          refreshControl={
            <RefreshControl
              colors={["#9Bd35A", "#689F38"]}
              refreshing={isLoading}
              onRefresh={() => this.fetchImages()}
            />
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => { images.length > 0 && this.fetchImages(); }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginTop: 20
  }
});
