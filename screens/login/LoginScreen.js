import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

import googleSignInConfiguration from '../../config/googleSignIn';
import { ROUTES } from '../../constants/routes';

import styles from './styles';

const LoginScreen = (props) => {
  const { navigation } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [googleSigninInProgress, setGoogleSigninInProgress] = useState(false);

  useEffect(() => {
    GoogleSignin.configure(googleSignInConfiguration);
  }, []);

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const handleLogin = () => {
    clearErrorMessage();
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setErrorMessage(error.message));
  };

  const handleGoogleSignUp = async () => {
    const syncLogInStatusToFirebase = (googleUser) => {
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      const unsubscribe = auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in in Firebase with the correct user.
        if (
          firebaseUser === null ||
          googleUser.user.email !== firebaseUser.email
        ) {
          // Build Firebase credential with the Google ID token.
          const credential = auth.GoogleAuthProvider.credential(
            googleUser.idToken
          );
          // Sign in with credential from the Google user.
          auth()
            .signInWithCredential(credential)
            .catch(function(error) {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const errorEmail = error.email;
              // The firebase auth.AuthCredential type that was used.
              const errorCredential = error.credential;
              if (
                errorCode === 'auth/account-exists-with-different-credential'
              ) {
                setErrorMessage(
                  'Email already associated with another account.'
                );
                console.log('errorCode: ', errorCode);
                console.log('errorMessage: ', errorMessage);
                console.log('errorEmail: ', errorEmail);
                console.log('errorCredential: ', errorCredential);
              } else {
                console.log(error);
              }
            });
        }
      });
    };
    try {
      setGoogleSigninInProgress(true);
      clearErrorMessage();
      await GoogleSignin.hasPlayServices();
      const googleResponse = await GoogleSignin.signIn();
      syncLogInStatusToFirebase(googleResponse);
      setGoogleSigninInProgress(false);
      console.log(googleResponse);
    } catch (error) {
      setGoogleSigninInProgress(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
        setErrorMessage('Google login cancelled');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
        setErrorMessage('Google Play Services unavailable.');
        // play services not available or outdated
      } else {
        console.log(error);
        setErrorMessage('Error connecting to Google Authentication Services.');
        // some other error happened
      }
    }
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
        <GoogleSigninButton
          style={styles.googleLoginButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignUp}
          disabled={googleSigninInProgress}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.formTitle}>
          Or sign in using email and password
        </Text>
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
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.register)}>
          <Text style={styles.linkText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
