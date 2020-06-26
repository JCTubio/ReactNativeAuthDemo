import React from 'react';
import { View, Button, Alert } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';

const FacebookLoginButton = () => {
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
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
          Alert.alert(
            'An account already exists with the same email address',
            'Try logging in with a different sign-in method.'
          );
        }
      });
  }

  return (
    <View>
      <Button
        title='Facebook Sign-In'
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!')
          )
        }
      />
    </View>
  );
};

export default FacebookLoginButton;
