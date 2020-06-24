import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
  Button,
} from 'react-native';
import { useHeaderHeight } from 'react-navigation-stack';
import { useForm, ErrorMessage } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';

import FirebaseService from '../../services/firebase';
import countryCodes from '../../data/countryCodes.json';
import userModel from '../../models/user';

import {
  validateAlpha,
  validateRequired,
  validateEmail,
  validateNumeric,
  formatObjectWithModel,
} from '../../utils/helpers';

import styles from './styles';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 40,
    color: '#161F3D',
  },
});

const RegisterScreen = (props) => {
  const { navigation } = props;

  const {
    register,
    handleSubmit,
    errors,
    clearError,
    getValues,
    setValue,
    triggerValidation,
  } = useForm({
    validateCriteriaMode: 'all',
  });

  const headerHeight = useHeaderHeight();

  useEffect(() => {
    register(
      { name: 'firstName' },
      {
        validate: {
          required: () =>
            validateRequired(getValues('firstName')) ||
            'First name is required',
          alpha: () =>
            validateAlpha(getValues('firstName')) ||
            'First name should have letters only',
        },
      }
    );
    register(
      { name: 'lastName' },
      {
        validate: {
          required: () =>
            validateRequired(getValues('lastName')) || 'Last name is required',
          alpha: () =>
            validateAlpha(getValues('lastName')) ||
            'Last name should have letters only',
        },
      }
    );
    register(
      { name: 'email' },
      {
        validate: {
          required: () =>
            validateRequired(getValues('email')) || 'Email is required',
          emailFormat: () =>
            validateEmail(getValues('email')) ||
            'The email is incorrectly formatted',
        },
      }
    );
    register(
      { name: 'password' },
      {
        validate: {
          required: () =>
            validateRequired(getValues('password')) || 'Password is required',
        },
      }
    );
    register(
      { name: 'repeatedPassword' },
      {
        validate: {
          required: () =>
            validateRequired(getValues('repeatedPassword')) ||
            'This field is required',
          passwordsMatch: () =>
            getValues('repeatedPassword') === getValues('password') ||
            "The passwords don't match",
        },
      }
    );
    register(
      { name: 'phoneNumber' },
      {
        validate: {
          required: () =>
            validateRequired(getValues('phoneNumber')) ||
            'A phone number is required',
          numeric: () =>
            validateNumeric(getValues('phoneNumber')) ||
            'Phone number must only contain numbers',
        },
      }
    );
    register(
      { name: 'countryCode' },
      {
        validate: {
          required: () =>
            validateRequired(getValues('countryCode')) ||
            "The phone number's country code is required",
        },
      }
    );
  }, [register]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');

  const handleInputValueChange = (inputName, inputValue) => {
    clearError(inputName);
    setValue(inputName, inputValue);
  };

  const handleImageUpload = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('response:', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const { uri, path, fileName } = response;
        const firebaseImage = {
          source: Platform.OS == 'ios' ? uri : path,
          ref: storage().ref(fileName),
        };
        Promise.resolve(firebaseImage.ref.putFile(firebaseImage.source)).then(
          () => {
            firebaseImage.ref.getDownloadURL().then((firebaseURL) => {
              console.log(firebaseURL);
              setProfilePicture(firebaseURL);
            });
          }
        );
      }
    });
  };

  const handleSignUp = async (data) => {
    const { email, password } = data;
    const formattedData = formatObjectWithModel(data, userModel);
    // TODO make rollback in case one of these Promises fails
    await FirebaseService.createDocument('users', formattedData, email);
    FirebaseService.createUserWithEmailAndPassword(email, password);
  };

  const validateForm = async () => {
    const values = getValues();
    let validationSucceeded = await triggerValidation();
    if (validationSucceeded && profilePicture) {
      handleSubmit(handleSignUp({ ...values, profilePicture }));
    }
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

            <View style={styles.form}>
              <View style={styles.profilePicInputField}>
                {profilePicture ? (
                  <Image
                    style={styles.profilePic}
                    source={{ uri: profilePicture }}
                  />
                ) : null}
                <Button
                  onPress={handleImageUpload}
                  title='Add an image'
                  style={styles.profilePicUploadButton}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>First Name</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='words'
                  onChangeText={(value) =>
                    handleInputValueChange('firstName', value)
                  }
                />
                <ErrorMessage as={<View />} errors={errors} name='firstName'>
                  {({ message }) => {
                    return (
                      <Text style={styles.inputErrorMessage}>{message}</Text>
                    );
                  }}
                </ErrorMessage>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='words'
                  onChangeText={(value) =>
                    handleInputValueChange('lastName', value)
                  }
                />
                <ErrorMessage as={<View />} errors={errors} name='lastName'>
                  {({ message }) => (
                    <Text style={styles.inputErrorMessage}>{message}</Text>
                  )}
                </ErrorMessage>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  onChangeText={(value) =>
                    handleInputValueChange('email', value)
                  }
                />
                <ErrorMessage as={<View />} errors={errors} name='email'>
                  {({ message }) => (
                    <Text style={styles.inputErrorMessage}>{message}</Text>
                  )}
                </ErrorMessage>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize='none'
                  onChangeText={(value) =>
                    handleInputValueChange('password', value)
                  }
                />
                <ErrorMessage as={<View />} errors={errors} name='password'>
                  {({ message }) => (
                    <Text style={styles.inputErrorMessage}>{message}</Text>
                  )}
                </ErrorMessage>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Repeat Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize='none'
                  onChangeText={(value) =>
                    handleInputValueChange('repeatedPassword', value)
                  }
                />
                <ErrorMessage
                  as={<View />}
                  errors={errors}
                  name='repeatedPassword'
                >
                  {({ message }) => (
                    <Text style={styles.inputErrorMessage}>{message}</Text>
                  )}
                </ErrorMessage>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Phone number</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  onChangeText={(value) =>
                    handleInputValueChange('phoneNumber', value)
                  }
                />
                <ErrorMessage as={<View />} errors={errors} name='phoneNumber'>
                  {({ message }) => (
                    <Text style={styles.inputErrorMessage}>{message}</Text>
                  )}
                </ErrorMessage>
              </View>
              <View style={styles.selectorContainer}>
                <View style={styles.selectorInner}>
                  <Text style={styles.inputTitle}>Country code</Text>
                  <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) =>
                      handleInputValueChange('countryCode', value)
                    }
                    style={pickerSelectStyles}
                    items={countryCodes}
                  />
                </View>
                <ErrorMessage as={<View />} errors={errors} name='countryCode'>
                  {({ message }) => (
                    <Text style={styles.inputErrorMessage}>{message}</Text>
                  )}
                </ErrorMessage>
              </View>
              <TouchableOpacity style={styles.button} onPress={validateForm}>
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>
              <View style={styles.redirectTextContainer}>
                <Text>Already registered? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkText}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
