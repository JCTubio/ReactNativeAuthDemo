import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import colors from '../../styles/colors';

import styles from './styles';

const LoadingPlaceholder = (props) => {
  const { message, size, color } = props;

  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={color ? color : colors.black}
        size={size ? size : 'large'}
      />
      {Boolean(message) && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default LoadingPlaceholder;
