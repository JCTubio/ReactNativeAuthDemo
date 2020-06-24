import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isAlpha from 'validator/lib/isAlpha';
import isInt from 'validator/lib/isInt';

export const validateEmail = (input) => {
  return Boolean(input) && isEmail(String(input));
};

export const validateRequired = (input) => {
  return Boolean(input) && !isEmpty(String(input));
};

export const validateAlpha = (input) => {
  return Boolean(input) && isAlpha(String(input));
};

export const validateZipCode = (input) => {
  return Boolean(input) && isInt(String(input), { min: 1000, max: 9999 });
};

export const validateNumeric = (input) => {
  return Boolean(input) && isInt(String(input));
};

export const formatObjectWithModel = (object, model) => {
  const keys = Object.keys(model);
  return Object.keys(object)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
      return { ...obj, [key]: object[key] };
    }, {});
};
