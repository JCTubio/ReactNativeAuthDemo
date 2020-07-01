import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

import styles from './styles';

const FacebookLoginButton = (props) => {
  const { handleErrors, text = 'Facebook Sign-In' } = props;

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      handleErrors('User cancelled the login process');
      return;
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      handleErrors('Something went wrong obtaining access token');
      return;
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(facebookCredential)
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const errorEmail = error.email;
        // The firebase auth.AuthCredential type that was used.
        const errorCredential = error.credential;
        console.log('errorCode: ', errorCode);
        console.log('errorMessage: ', errorMessage);
        console.log('errorEmail: ', errorEmail);
        console.log('errorCredential: ', errorCredential);
        if (error.code === 'auth/account-exists-with-different-credential') {
          handleErrors(
            'Account already exists with a different sign-in method'
          );
          Alert.alert(
            'An account already exists with the same email address',
            'Try logging in with a different sign-in method.'
          );
        }
      });
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        onFacebookButtonPress().then(() =>
          console.log('Signed in with Facebook!')
        )
      }
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FacebookLoginButton;
