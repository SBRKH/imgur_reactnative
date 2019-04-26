import React,  { Component } from 'react'
import {StyleSheet} from 'react-native'
import { WebView } from 'react-native-webview';
import { StackActions, NavigationActions } from 'react-navigation';
import {deleteItem, store} from '../../manager/StorageManager';
import {StorageManagerConstant} from '../../constant/StorageManagerConstant'
import {ImgurConstant} from '../../constant/ImgurConstant'

const webviewRef = 'webview';

export default class WebViewImgur extends Component {

  async componentWillMount() {
    await deleteItem(StorageManagerConstant.ACCESS_TOKEN);
    await deleteItem(StorageManagerConstant.REFRESH_TOKEN);
    await deleteItem(StorageManagerConstant.EXPIRES_IN);
    await deleteItem(StorageManagerConstant.USERNAME);
  }

  resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Index' })],
  });

  changeNavigationState = async (webView) => {
    const {navigation} = this.props;
    const {url} = webView;

    if (url.search("access_token=") > 0) {
      const array = url.split("=");

      await store(StorageManagerConstant.ACCESS_TOKEN, array[2].split('&')[0]);
      await store(StorageManagerConstant.REFRESH_TOKEN, array[3].split('&')[0]);
      await store(StorageManagerConstant.EXPIRES_IN, array[5].split('&')[0]);
      await store(StorageManagerConstant.USERNAME, array[6].split('&')[0]);

      navigation.dispatch(this.resetAction);
    }
  };

  webviewProps = {
    javaScriptEnabled: true,
    onNavigationStateChange: this.changeNavigationState.bind(this),
    source: {
      uri: 'https://api.imgur.com/oauth2/authorize?client_id=' + ImgurConstant.CLIENT_ID + '&response_type=' + ImgurConstant.RESPONSE_TYPE + '&state=' + ImgurConstant.APPLICATION_STATE,
      headers: {
        "Content-Type": "text",
        "Authorization": ImgurConstant.CLIENT_ID
      }
    }
  };

  render() {
    return (
      <WebView  {...this.webviewProps}/>
    );
  };
}
