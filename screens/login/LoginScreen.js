import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

import Form from '../../components/form';
import Divider from '../../components/divider';
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
    <ScrollView contentContainerStyle={{ flex: 1, flexGrow: 1 }}>
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
          <View style={styles.socialButtonWrapper}>
            <FacebookLoginButton
              text='Log in with Facebook'
              handleErrors={(error) => setErrorMessage(error)}
            />
          </View>
          <View style={styles.socialButtonWrapper}>
            <GoogleLoginButton
              text='Log in with Google'
              handleErrors={(error) => setErrorMessage(error)}
            />
          </View>
        </View>
        <View style={styles.dividerWrapper}>
          <Divider text='or' fontSize={18} />
        </View>
        <Form
          formData={LOGIN_FORM}
          onSubmit={handleLogin}
          submitButtonText='Log In'
        />
        <View style={styles.redirectTextContainer}>
          <Text>New to this app? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.register)}
          >
            <Text style={styles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
