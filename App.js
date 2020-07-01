import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import FirebaseService from './services/firebase';
import RegisterScreen from './screens/register';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import ProfileEditScreen from './screens/profileEdit';
import SplashScreen from './screens/splash';
import { ROUTES } from './constants/routes';

//Using react-native-firebase there is no need to initialize firebase, it is done automatically

const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      FirebaseService.setUser(user);
      setCurrentUser(user);
    });
    return () => subscriber();
  });

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  });

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {currentUser ? (
        <AppStack.Navigator
          initialRouteName={ROUTES.home}
          screenOptions={{ gestureEnabled: false }}
        >
          <AppStack.Screen name={ROUTES.home} component={HomeScreen} />
          <AppStack.Screen
            name={ROUTES.profileEdit}
            options={{ headerShown: false }}
            component={ProfileEditScreen}
          />
        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName={ROUTES.login}>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name={ROUTES.login}
            component={LoginScreen}
          />
          <AuthStack.Screen name={ROUTES.register} component={RegisterScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
