import countryCodes from '../data/countryCodes.json';

export const PROFILE_EDIT_FORM = [
  {
    name: 'profilePicture',
    label: 'Profile Picture',
    type: 'image',
    validation: {
      required: 'Please upload a profile picture',
    },
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    validation: {
      required: 'First name is required',
      alpha: 'First name should have letters only',
    },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    validation: {
      required: 'Last name is required',
      alpha: 'Last name should have letters only',
    },
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'text',
    validation: {
      required: 'A phone number is required',
      numeric: 'Phone number must only contain numbers',
    },
  },
  {
    name: 'countryCode',
    label: 'Country Code',
    type: 'select',
    items: countryCodes,
    validation: {
      required: "The phone number's country code is required",
    },
  },
];

export const REGISTER_FORM = [
  {
    name: 'profilePicture',
    label: 'Profile Picture',
    type: 'image',
    validation: {
      required: 'Please upload a profile picture',
    },
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    validation: {
      required: 'First name is required',
      alpha: 'First name should have letters only',
    },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    validation: {
      required: 'Last name is required',
      alpha: 'Last name should have letters only',
    },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    validation: {
      required: 'Email is required',
      emailFormat: 'The email is incorrectly formatted',
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'secureText',
    validation: {
      required: 'A password is required',
    },
  },
  {
    name: 'repeatedPassword',
    label: 'Repeat password',
    type: 'secureText',
    validation: {
      required: 'This field is required',
      passwordsMatch: "The passwords don't match",
    },
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'text',
    validation: {
      required: 'A phone number is required',
      numeric: 'Phone number must only contain numbers',
    },
  },
  {
    name: 'countryCode',
    label: 'Country Code',
    type: 'select',
    items: countryCodes,
    validation: {
      required: "The phone number's country code is required",
    },
  },
];

export const LOGIN_FORM = [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    validation: {
      required: 'Email is required',
      emailFormat: 'The email is incorrectly formatted',
    },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'secureText',
    validation: {
      required: 'A password is required',
    },
  },
];
