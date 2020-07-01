import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import styles from './styles';

const LoadingPlaceholder = (props) => {
  const { message, size, color } = props;

  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={color ? color : '#000'}
        size={size ? size : 'large'}
      />
      {Boolean(message) && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default LoadingPlaceholder;
