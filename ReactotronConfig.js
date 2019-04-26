import Reactotron from 'reactotron-react-native'

/**
 MODIFIER L'IP PAR LA TIENNE
**/
Reactotron
  .configure({ host: '192.168.0.13' }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!
