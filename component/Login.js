import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text, Button, Card } from 'react-native-elements'

export default class Login extends Component {

    displayWebView() {
      const {navigation} = this.props;
      navigation.navigate("WebViewImgurPage");
    }

    render() {
        return (
            <View style={styles.container}>
              <Card title='Welcome to Epicture'>
                <Text>
                  By pressing the "Join" button, you will need to log in with your Imgur account
                  in order to access our services!
                </Text>
                <Text>Thank you for your support !</Text>
                <Button title="Join" onPress={() => this.displayWebView()}/>
              </Card>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: "#f1c40f",
    justifyContent: 'center',
    alignItems: 'center'
  }
});
