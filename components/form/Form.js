import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';

import TextInput from '../../components/textInput';
import ImageUpload from '../../components/imageUpload';
import Selector from '../../components/selector';

import {
  validateRequired,
  validateAlpha,
  validateNumeric,
  validateEmail,
} from '../../utils/helpers';

import styles from './styles';

export const Form = (props) => {
  const {
    formData,
    initialData,
    onSubmit,
    title,
    submitButtonText = 'Submit',
  } = props;

  const {
    register,
    handleSubmit,
    errors,
    watch,
    clearError,
    getValues,
    setValue,
    triggerValidation,
  } = useForm({
    validateCriteriaMode: 'all',
  });

  useEffect(() => {
    watch();
    formData.forEach((field) => {
      const { name, validation } = field;
      const validate = Object.keys(validation).reduce(
        (validationObject, key) => {
          switch (key) {
            case 'required':
              validationObject[key] = () =>
                validateRequired(getValues(name)) || validation[key];
              break;
            case 'alpha':
              validationObject[key] = () =>
                validateAlpha(getValues(name)) || validation[key];
              break;
            case 'numeric':
              validationObject[key] = () =>
                validateNumeric(getValues(name)) || validation[key];
              break;
            case 'emailFormat':
              validationObject[key] = () =>
                validateEmail(getValues(name)) || validation[key];
              break;
            case 'passwordsMatch':
              validationObject[key] = () =>
                getValues(name) === getValues('password') || validation[key];
              break;
            default:
              break;
          }
          return validationObject;
        },
        {}
      );
      register({ name }, { validate });
    });
  }, [register]);

  useEffect(() => {
    if (initialData) {
      populateInitialData(initialData);
    }
  }, [initialData]);

  const populateInitialData = (data) => {
    Object.keys(data).forEach((key) => {
      setValue(key, data[key]);
    });
  };

  const handleInputValueChange = (inputName, inputValue) => {
    clearError(inputName);
    setValue(inputName, inputValue);
  };

  const validateForm = async () => {
    const values = getValues();
    let validationSucceeded = await triggerValidation();
    if (validationSucceeded) {
      handleSubmit(onSubmit({ ...values }));
    }
  };

  const renderFormFields = () => {
    return formData.map((field) => {
      const { name, label, type, items } = field;
      switch (type) {
        case 'text':
          return (
            <TextInput
              key={name}
              id={name}
              label={label}
              autocapitalize='words'
              value={getValues(name)}
              onChange={(value) => handleInputValueChange(name, value)}
              errors={errors}
            />
          );
        case 'select':
          return (
            <Selector
              key={name}
              id={name}
              label={label}
              value={getValues(name)}
              items={items}
              onChange={(value) => handleInputValueChange(name, value)}
              errors={errors}
            />
          );
        case 'image':
          return (
            <ImageUpload
              key={name}
              value={getValues(name)}
              buttonTitle={label}
              onChange={(value) => setValue(name, value)}
              errors={errors}
            />
          );
        case 'secureText':
          return (
            <TextInput
              key={name}
              id={name}
              label={label}
              value={getValues(name)}
              onChange={(value) => handleInputValueChange(name, value)}
              errors={errors}
              isSecure
              autoCapitalize={false}
            />
          );
        default:
          break;
      }
    });
  };
  return (
    <View style={styles.form}>
      {Boolean(title) && (
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      {renderFormFields()}
      <TouchableOpacity style={styles.button} onPress={validateForm}>
        <Text style={styles.buttonText}>{submitButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;
