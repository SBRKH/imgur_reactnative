import { createStackNavigator, createAppContainer} from 'react-navigation'
import Login from '../component/Login'
import Index from '../component/Index'
import  WebViewImgur from "../component/fragment/WebViewImgur"
import { Icon } from 'react-native-elements'

const LoginStackNavigator = createStackNavigator({
    LoginPage: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    WebViewImgurPage: {
      screen: WebViewImgur,
      navigationOptions: {
        title: 'Imgur'
      }
    },
    Index: {
      screen: Index,
      navigationOptions: {
        header: null
      }
    }
});

export const LoginNavigator = createAppContainer(LoginStackNavigator);
