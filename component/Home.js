import React, { Component, Fragment } from 'react'
import { View, StyleSheet } from 'react-native'
import { Icon, Text, Card, Avatar, AirbnbRating } from 'react-native-elements'
import {getAccount} from '../api/Account';
import {get} from "../manager/StorageManager";
import {StorageManagerConstant} from '../constant/StorageManagerConstant'

export default class Home extends Component {
  state = {
    account: null
  };

  async componentDidMount() {
    const {data} = await getAccount(await get(StorageManagerConstant.USERNAME));

    this.setState({account: data});
  }

  render() {
    const {account} = this.state;
    return (
      <Fragment>
      { account !== null &&
        <View style={styles.container}>
          <Card>
            <View style={styles.header}>
              <Avatar
                rounded
                size="large"
                title={account.url}
                source={{
                  uri:
                    account.avatar,
                }}
              />
              <Text style={{fontSize: 20}}>  {account.url}</Text>
            </View>
            <Text>{account.bio}</Text>
            <AirbnbRating
              defaultRating={account.reputation}
              count={5}
              isDisabled={true}
            />
          </Card>
        </View>
      }
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    backgroundColor: "#f1c40f",
    alignItems: 'center'
  },
  header: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
