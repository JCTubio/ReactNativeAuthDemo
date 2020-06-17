import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import * as firebase from 'firebase';

import styles from './styles';

const HomeScreen = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    const { email } = currentUser;
    console.log(currentUser);
    setUserEmail(email);
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
      <Text style={styles.greeting}>Hi {userEmail}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
