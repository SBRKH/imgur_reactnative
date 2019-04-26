import React from "react";
import { createAppContainer} from "react-navigation";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements'
import Feed from "../component/Feed";
import Home from "../component/Home";
import Images from "../component/Images";
import Favorites from "../component/Favorites";
import Upload from "../component/Upload";

const BottomStackNavigator = createMaterialBottomTabNavigator({
  FeedHome: {
    screen: Feed,
    navigationOptions: {
      tabBarIcon: () => {
        return <Icon name='home' type='font-awesome' color='black' />
      },
      tabBarLabel: "Feed"
    }
  },
  MyImages: {
    screen: Images,
    navigationOptions: {
      tabBarIcon: () => {
        return <Icon name='picture-o' type='font-awesome' color='black' />
      },
      tabBarLabel: "Images"
    }
  },
  MyFavorites: {
    screen: Favorites,
    navigationOptions: {
      tabBarIcon: () => {
        return <Icon name='heart' type='font-awesome' color='black' />
      },
      tabBarLabel: "Favorites"
    }
  },
  UploadImage: {
    screen: Upload,
    navigationOptions: {
      tabBarIcon: () => {
        return <Icon name='cloud-upload' type='font-awesome'/>
      },
      tabBarLabel: "Upload"
    }
  },
  HomePage: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: () => {
        return <Icon name='user-circle-o' type='font-awesome'/>
      },
      tabBarLabel: "Profile"
    }
  }
}, {
  initialRouteName: 'FeedHome',
  activeColor: '#333333',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#f2f2f2' },
});

export const BottomNavigator = createAppContainer(BottomStackNavigator);
