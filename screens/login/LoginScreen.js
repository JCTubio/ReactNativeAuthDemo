import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

import Form from '../../components/form';
import FacebookLoginButton from '../../components/facebookLoginButton';
import GoogleLoginButton from '../../components/googleLoginButton';
import { ROUTES } from '../../constants/routes';
import { LOGIN_FORM } from '../../constants/forms';

import styles from './styles';

const LoginScreen = (props) => {
  const { navigation } = props;

  const [errorMessage, setErrorMessage] = useState(null);

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const handleLogin = (data) => {
    console.log(data);
    const { email, password } = data;
    clearErrorMessage();
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setErrorMessage(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`Hello again!\nWelcome back.`}</Text>
      <View
        style={
          errorMessage === null
            ? styles.errorMessageHidden
            : styles.errorMessageContainer
        }
      >
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
      <View style={styles.socialLoginButtons}>
        <FacebookLoginButton />
        <GoogleLoginButton handleErrors={(error) => setErrorMessage(error)} />
      </View>
      <Form
        title='Or sign in using email and password'
        formData={LOGIN_FORM}
        onSubmit={handleLogin}
      />
      <View style={styles.redirectTextContainer}>
        <Text>New to this app? </Text>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.register)}>
          <Text style={styles.linkText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
