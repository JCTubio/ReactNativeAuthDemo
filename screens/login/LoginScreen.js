import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

import styles from './styles';

const LoginScreen = (props) => {

  const { navigation } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`Hello again!\nWelcome back.`}</Text>
      <View style={styles.errorMessageContainer}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            autoCapitalize='none'
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <View style={styles.redirectTextContainer}>
        <Text>New to this app? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
