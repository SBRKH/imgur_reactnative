import React, { Component, Fragment } from 'react'
import {View, StyleSheet,  ActivityIndicator, PermissionsAndroid, Alert} from 'react-native'
import { Icon, Overlay, Text} from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'
import {uploadMyPicture} from '../api/UploadPhoto'

const options = {
    title: 'Select a photo',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality: 1

};

export default class UploadImage extends Component
{
  state = {
    imageSource: null,
    data: null,
    isLoading: false,
    isSuccess: false
  }

  componentDidMount() {
    this.getPermissions();
  }

  async getPermissions() {
    if (PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA) !==
        PermissionsAndroid.RESULTS.GRANTED) {
      const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
      );
    }
  }

  async uploadPhoto() {
    const {data} = this.state;
    const {navigation} = this.props;

    this.setState( {isLoading: true} );
    const resp = await uploadMyPicture(data);
    if (resp !== null) {
      this.setState({imageSource: null, isLoading: false, isSuccess: true});
      Alert.alert("Your picture has been upload.");
    }
  }

  pickPhoto() {
    const {navigation} = this.props;

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        this.setState({imageSource: null, isLoading: false});
      } else if (!response.error) {
        const source = { uri: response.uri };
        this.setState( {imageSource: source, data: response.data} );
        this.uploadPhoto();
      }
    });
  }

  render() {
    const {isLoading} = this.state;

    return (
      <View style={styles.container}>
        {isLoading === true ?
          (<ActivityIndicator size={'large'} />) :
          (
            <Fragment>
              <Icon name='cloud-upload' type='font-awesome' color='black'
                  size={50} onPress={() => this.pickPhoto()}/>
            </Fragment>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignContent: 'center'
  }
});
