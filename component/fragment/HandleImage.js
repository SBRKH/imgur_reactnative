import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {View, Image, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import { Rating } from 'react-native-elements'
import { setFavorite } from "../../api/Favorites"

export default class HandleImage extends Component {
  state = {
    lastTap: null
  }

  static propTypes = {
    isFav: PropTypes.bool.isRequired
  }

  static defaultProps = {
    isFav: false,
  }

  async toggleLike() {
    const {image} = this.props;
    const title = image.title === null ? image.name : image.title;

    await setFavorite(image.id);
    Alert.alert(title + " has added to your favorites!");
  }

  handleDoubleTap = () => {
    const {isFav} = this.props;
    const {lastTap} = this.state;

    if (isFav === false) {
      const now = Date.now();
      if (lastTap && (now - lastTap) < 300) {
        this.toggleLike();
      } else {
        this.setState({lastTap: now});
      }
    }
  };

  render() {
    const {image} = this.props;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.handleDoubleTap()}>
          <Image style={styles.image}
                source={{uri: image.link}} />
        </TouchableWithoutFeedback>
        <View style={styles.content}>
          <View style={styles.rating}>
            <Rating type="heart"
                    imageSize={20}
                    readonly
                    startingValue={(image.ups * 5) / (image.ups + image.downs)} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#0000',
  },
  image: {
    height: 320,
    width: 320,
    flex: 1,
    margin: 5,
    backgroundColor: '#d3d3d3'
  },
  content: {
    flexDirection: 'row',
    margin: 5
  },
  rating: {
    alignItems: 'center',
    flex: 1
  },
});
