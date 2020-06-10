import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import * as firebase from 'firebase'

import LoadingScreen from './screens/loading'
import RegisterScreen from './screens/register'
import LoginScreen from './screens/login'
import HomeScreen from './screens/home'

import firebaseConfig from './config/firebase';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: HomeScreen
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
    Loading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
)