import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

import Form from '../../components/form';

import FirebaseService from '../../services/firebase';
import userModel from '../../models/user';

import { COLLECTIONS } from '../../constants/firebase';
import { ROUTES } from '../../constants/routes';
import { PROFILE_EDIT_FORM } from '../../constants/forms';

import { formatObjectWithModel } from '../../utils/helpers';

import styles from './styles';

const ProfileEdit = (props) => {
  const { navigation, route } = props;

  const [initialUserData, setInitialUserData] = useState(null);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    const user = FirebaseService.getUser();
    setEmail(user.email);
    if (
      Boolean(route) &&
      Boolean(route.params) &&
      Boolean(route.params.userData)
    ) {
      setInitialUserData(route.params.userData);
    }
  }, [route.params]);

  const handleSaveProfile = async (data) => {
    setIsLoading(true);
    const formattedData = formatObjectWithModel({ ...data, email }, userModel);
    // TODO make rollback in case one of these Promises fails
    const response = await FirebaseService.createDocument(
      COLLECTIONS.users,
      formattedData,
      email
    );
    if (!Boolean(response.error)) {
      navigation.navigate(ROUTES.home, { userData: formattedData });
    } else {
      setErrorMessage(response.error.message);
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    FirebaseService.signOut();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={headerHeight + 20}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.container}>
          <View style={styles.inner}>
            <View style={styles.logoutContainer}>
              <TouchableOpacity
                style={styles.textButton}
                onPress={handleSignOut}
              >
                <Text style={styles.textButtonText}>Log out</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={styles.greeting}
            >{`Hey there!\n\nWe would like to get\nto know you better\nbefore getting started.`}</Text>
            {Boolean(errorMessage) && (
              <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </View>
            )}
            <Form
              formData={PROFILE_EDIT_FORM}
              initialData={initialUserData}
              onSubmit={handleSaveProfile}
            />
            <View style={styles.redirectTextContainer}>
              <Text>Already registered? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.login)}
              >
                <Text style={styles.linkText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ProfileEdit;
