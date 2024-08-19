import { INVALID_EMAIL_FORMAT } from "./staticConstants";

export const isNil = (value) => value === null || value === undefined;

export const isEmtpyString = (value) => value?.trim() === "";

export const areObjectsEqual = (obj1, obj2) => {
  // Check if both are the same type
  if (typeof obj1 !== typeof obj2) return false;

  // Check if obj1 is not an object or array (primitive values)
  if (typeof obj1 !== "object" || obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  // Check if obj1 is an array (obj2 must be an array as well)
  if (Array.isArray(obj1)) {
    if (!Array.isArray(obj2) || obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!areObjectsEqual(obj1[i], obj2[i])) return false;
    }
    return true;
  }

  // For each key in obj1, check if it exists and matches in obj2
  for (let key in obj1) {
    if (!obj2.hasOwnProperty(key)) return false;
    if (!areObjectsEqual(obj1[key], obj2[key])) return false;
  }

  // obj2 can have extra properties not in obj1, which we ignore
  return true;
};

export const validateField = (value, regexPattern) => {
  let isError = false;
  let helperText = "";
  if (isNil(value) || isEmtpyString(value)) {
    isError = false;
  } else if (regexPattern && !new RegExp(regexPattern).test(value)) {
    isError = true;
    helperText = INVALID_EMAIL_FORMAT;
  } else {
    isError = false;
  }
  return {
    isError,
    helperText,
  };
};