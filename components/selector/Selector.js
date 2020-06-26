import React from 'react';
import { ErrorMessage } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, StyleSheet } from 'react-native';

import styles from './styles';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 40,
    color: '#161F3D',
  },
});

const Selector = (props) => {
  const { id, label, value, items, onChange, errors } = props;

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>{label}</Text>
        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          value={value}
          onValueChange={onChange}
          style={pickerSelectStyles}
          items={items}
        />
      </View>
      <ErrorMessage as={<View />} errors={errors} name={id}>
        {({ message }) => <Text style={styles.errorMessage}>{message}</Text>}
      </ErrorMessage>
    </View>
  );
};

export default Selector;
