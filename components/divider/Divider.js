import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const Divider = (props) => {
  const {
    height = 40,
    fontSize = 16,
    text,
    textColor = 'grey',
    lineColor = 'grey',
    backgroundColor = 'rgba(0,0,0,0)',
  } = props;

  return (
    <View style={styles.divider}>
      <View
        style={{
          ...styles.dividerFirstBlock,
          height: height / 2,
          borderBottomColor: lineColor,
          backgroundColor,
        }}
      />
      <View
        style={{
          ...styles.dividerSecondBlock,
          height: height / 2,
          backgroundColor,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: height / 2 - fontSize / 2,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0)',
        }}
      >
        <Text
          style={{
            ...styles.dividerText,
            lineHeight: fontSize,
            fontSize,
            color: textColor,
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default Divider;
