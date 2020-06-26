import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

import googleSignInConfiguration from '../../config/googleSignIn';

const GoogleLoginButton = (props) => {
  const { handleErrors } = props;

  const [googleSigninInProgress, setGoogleSigninInProgress] = useState(false);

  useEffect(() => {
    GoogleSignin.configure(googleSignInConfiguration);
  }, []);

  const onGoogleButtonPress = async () => {
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
                handleErrors('Email already associated with another account.');
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
      handleErrors(null);
      setGoogleSigninInProgress(true);
      await GoogleSignin.hasPlayServices();
      const googleResponse = await GoogleSignin.signIn();
      setGoogleSigninInProgress(false);
      syncLogInStatusToFirebase(googleResponse);
      console.log(googleResponse);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
        handleErrors('Google login cancelled');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
        handleErrors('Google Play Services unavailable.');
        // play services not available or outdated
      } else {
        console.log(error);
        handleErrors('Error connecting to Google Authentication Services.');
        // some other error happened
      }
    }
  };

  return (
    <View>
      <Button
        title='Google Sign-In'
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!')
          )
        }
      />
    </View>
  );
};

export default GoogleLoginButton;
