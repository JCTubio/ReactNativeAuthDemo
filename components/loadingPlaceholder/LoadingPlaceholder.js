import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './styles';

const LoadingPlaceholder = (props) => {
  const { message, size } = props;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size ? size : 'large'} />
      <Text style={styles.message}>{message || ''}</Text>
    </View>
  );
};

export default LoadingPlaceholder;
