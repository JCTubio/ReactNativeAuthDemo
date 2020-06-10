import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

import styles from './styles';

const HomeScreen = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const { email } = firebase.auth().currentUser;
    setUserEmail(email);
  }, []);

  const handleSignOut = () => {
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
