import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import LoadingPlaceholder from '../../components/loadingPlaceholder';
import FirebaseService from '../../services/firebase';
import { COLLECTIONS } from '../../constants/firebase';
import { ROUTES } from '../../constants/routes';
import userModel from '../../models/user';
import { validateObjectWithModel } from '../../utils/helpers';

import styles from './styles';

const HomeScreen = (props) => {
  const { navigation, route } = props;
  const [userEmail, setUserEmail] = useState(null);
  const [userProfileData, setUserProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentUser = FirebaseService.getUser();
    const { email } = currentUser;
    if (
      Boolean(route) &&
      Boolean(route.params) &&
      Boolean(route.params.userData)
    ) {
      setUserProfileData(route.params.userData);
      setIsLoading(false);
    } else {
      getUserData(email);
    }
    setUserEmail(email);
  }, [route.params]);

  const getUserData = async (email) => {
    setIsLoading(true);
    const userData = await FirebaseService.getDocument(
      COLLECTIONS.users,
      email
    );
    if (validateObjectWithModel(userData, userModel)) {
      setUserProfileData(userData);
    } else {
      navigation.navigate(ROUTES.profileEdit, { userData });
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    FirebaseService.signOut();
  };

  const renderUserData = (data) => {
    if (Boolean(data)) {
      return Object.keys(data).map((key) => {
        if (key === 'profilePicture') {
          // a little hard coding here...
          return (
            <View style={styles.fieldContainer} key={key}>
              <Text style={styles.fieldName}>{key}: </Text>
              <Image style={styles.imageField} source={{ uri: data[key] }} />
            </View>
          );
        }
        return (
          <View style={styles.fieldContainer} key={key}>
            <Text style={styles.fieldName}>{key}: </Text>
            <Text style={styles.fieldValue}>{data[key]}</Text>
          </View>
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingPlaceholder message='Loading user data...' />
      ) : (
        <View>
          <Text style={styles.greeting}>Hi {userEmail}</Text>
          <View style={styles.userDataContainer}>
            {renderUserData(userProfileData)}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
