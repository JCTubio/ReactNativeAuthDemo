import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import colors from '../../styles/colors';

const Divider = (props) => {
  const {
    height = 40,
    fontSize = 16,
    text,
    textColor = colors.silver,
    lineColor = colors.silver,
    textBackgroundColor = colors.white,
    backgroundColor = colors.transparent,
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
          backgroundColor: colors.transparent,
        }}
      >
        <Text
          style={{
            ...styles.dividerText,
            lineHeight: fontSize,
            fontSize,
            color: textColor,
            backgroundColor: textBackgroundColor,
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default Divider;
