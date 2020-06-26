import React, { useEffect } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';

import LoadingAnimation from '../../components/loadingAnimation';
import FirebaseService from '../../services/firebase';
import { ROUTES } from '.././../constants/routes';

import styles from './styles';

const LoadingScreen = (props) => {
  const { navigation } = props;

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      FirebaseService.setUser(user);
      navigation.navigate(user ? ROUTES.app : ROUTES.auth);
    });
  });

  return (
    <View style={styles.container}>
      <LoadingAnimation />
    </View>
  );
};

export default LoadingScreen;
