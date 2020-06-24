import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from './styles';

const LoadingScreen = (props) => {
  const { navigation } = props;

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? 'App' : 'Auth');
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>LoadingScreen</Text>
      <ActivityIndicator size='large' />
    </View>
  );
};

export default LoadingScreen;
