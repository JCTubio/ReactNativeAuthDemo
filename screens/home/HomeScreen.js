import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import * as firebase from 'firebase';

import styles from './styles';

const HomeScreen = () => {
  const [userDisplayName, setUserDisplayName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    const { email, displayName } = currentUser;
    console.log(currentUser);
    setUserEmail(email);
    setUserDisplayName(displayName);
  }, []);

  const handleSignOut = async () => {
    /*
     THIS NEEDS REDUX TO HAVE GLOBAL STATE WITH LOGIN TYPE (GOOGLE, FACEBOOK OR EMAIL)
     
     if(loginType === 'google) {
       */
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    }
    /*
     }
     */
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi {userDisplayName}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
