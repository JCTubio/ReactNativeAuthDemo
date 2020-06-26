import React from 'react';
import { ErrorMessage } from 'react-hook-form';
import { View, Text, TextInput as ReactNativeTextInput } from 'react-native';

import styles from './styles';

const TextInput = (props) => {
  const {
    id,
    label,
    value,
    onChange,
    errors,
    isSecure,
    autocapitalize,
  } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <ReactNativeTextInput
        style={styles.input}
        secureTextEntry={isSecure}
        autoCapitalize={autocapitalize}
        value={value}
        onChangeText={onChange}
      />
      {Boolean(errors) && (
        <ErrorMessage as={<View />} errors={errors} name={id}>
          {({ message }) => {
            return <Text style={styles.errorMessage}>{message}</Text>;
          }}
        </ErrorMessage>
      )}
    </View>
  );
};

export default TextInput;
