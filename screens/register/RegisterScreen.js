import React, { useState } from 'react';
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
import { REGISTER_FORM } from '../../constants/forms';

import { formatObjectWithModel } from '../../utils/helpers';

import styles from './styles';

const RegisterScreen = (props) => {
  const { navigation } = props;

  const headerHeight = useHeaderHeight();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = async (data) => {
    const { email, password } = data;
    const formattedData = formatObjectWithModel(data, userModel);
    // TODO make rollback in case one of these Promises fails
    const response = await FirebaseService.createDocument(
      COLLECTIONS.users,
      formattedData,
      email
    );
    if (response.error) {
      setErrorMessage(response.error);
    }
    FirebaseService.createUserWithEmailAndPassword(email, password);
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
            <Text
              style={styles.greeting}
            >{`Hello!\nSign up to get started.`}</Text>
            <View style={styles.errorMessageContainer}>
              {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
            </View>
            <Form formData={REGISTER_FORM} onSubmit={handleSignUp} />
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

export default RegisterScreen;
