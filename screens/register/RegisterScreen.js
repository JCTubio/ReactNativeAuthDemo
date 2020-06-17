import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

import styles from './styles';

const RegisterScreen = (props) => {
  const { navigation } = props;

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName,
        });
      })
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>
      <View style={styles.errorMessageContainer}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            onChangeText={(value) => setDisplayName(value)}
            value={displayName}
          />
        </View>
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <View style={styles.redirectTextContainer}>
        <Text>Already registered? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
