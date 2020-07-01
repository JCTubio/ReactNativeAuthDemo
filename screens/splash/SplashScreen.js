import React from 'react';
import { View, Image } from 'react-native';

import logo from '../../assets/images/jct_logo.jpg';
import LoadingPlaceholder from '../../components/loadingPlaceholder';

import styles from './styles';

const loaderColor = '#c9b936';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <LoadingPlaceholder color={loaderColor} />
    </View>
  );
};

export default SplashScreen;
