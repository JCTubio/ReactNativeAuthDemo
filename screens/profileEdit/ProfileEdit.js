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
import { useHeaderHeight } from '@react-navigation/stack';
import { useForm, ErrorMessage } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';

import FirebaseService from '../../services/firebase';
import countryCodes from '../../data/countryCodes.json';
import userModel from '../../models/user';
import { COLLECTIONS } from '../../constants/firebase';
import { ROUTES } from '../../constants/routes';
import {
  validateAlpha,
  validateRequired,
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

const ProfileEdit = (props) => {
  const { navigation, route } = props;

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

  const [email, setEmail] = useState('');

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
    register(
      { name: 'profilePicture' },
      {
        validate: {
          required: () =>
            validateRequired(getValues('profilePicture')) ||
            'Please upload a profile picture',
        },
      }
    );
    const user = FirebaseService.getUser();
    setEmail(user.email);
    if (
      Boolean(route) &&
      Boolean(route.params) &&
      Boolean(route.params.userData)
    ) {
      populateInitialData(route.params.userData);
    }
  }, [register, route.params]);

  const populateInitialData = (data) => {
    Object.keys(data).forEach((key) => {
      setValue(key, data[key]);
    });
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
              setValue('profilePicture', firebaseURL);
            });
          }
        );
      }
    });
  };

  const handleSaveProfile = async (data) => {
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

  const validateForm = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const values = getValues();
    let validationSucceeded = await triggerValidation();
    if (validationSucceeded) {
      handleSubmit(handleSaveProfile({ ...values }));
    } else {
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
            <View style={styles.errorMessageContainer}>
              {Boolean(errorMessage) && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
            </View>

            <View style={styles.form}>
              <View style={styles.profilePicInputField}>
                {getValues('profilePicture') ? (
                  <Image
                    style={styles.profilePic}
                    source={{ uri: getValues('profilePicture') }}
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
                  value={getValues('firstName')}
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
                  value={getValues('lastName')}
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
                <Text style={styles.inputTitle}>Phone number</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  value={getValues('phoneNumber')}
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
                    value={getValues('countryCode')}
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
                <Text style={styles.buttonText}>Sign up </Text>
              </TouchableOpacity>
              <View style={styles.redirectTextContainer}>
                <Text>Already registered? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate(ROUTES.login)}
                >
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

export default ProfileEdit;
