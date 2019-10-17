/*
 * Checks whether string is valid email or not
 */
const isValidEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
/*
 * Checks whether string is valid numeric or not
 */
const isNumeric = num => {
  return !isNaN(num);
};

/*
 * Checks whether string is valid alpha numeric or not
 */
const isAlphaNumeric = str => {
  var regExp = /^[A-Za-z0-9]+$/;
  return regExp.test(String(str).toLowerCase());
};
/*
 * Checks whether string is valid alphabatic string or not
 */
const isAlpha = str => {
  return /^[a-zA-Z ]+$/.test(str);
};
/*
 * Checks whether string is valid username string or not
 */
const isValidUsername = str => {
  return new RegExp("^[a-zA-Z0-9_.]+$").test(str);
};
/*
 * Checks whether string is valid password string or not
 */
const isValidPassword = str => {
  return new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  ).test(str);
};

/*
 * Main Validator function to validate any object
 */
let errors = {};
// set default form valid to true
let isValid = true;
export const Validator = (
  data,
  validation = {},
  messages = {},
  reCalled = false
) => {
  if (!reCalled) {
    errors = {};
    isValid = true;
  }
  /* Cheks if data is valid object or not */
  if (typeof data !== "object") {
    throw new Error("Data should be an object.");
  }
  /* Cheks if validation is valid object or not */
  if (typeof validation !== "object") {
    throw new Error("Validation should be an object.");
  }
  /* Cheks if messages is valid object or not */
  if (typeof messages !== "object") {
    throw new Error("Messages should be an object.");
  }
  // loop through the data object
  for (const key in data) {
    // check data has key and also validation key exists
    if (data.hasOwnProperty(key) && validation.hasOwnProperty(key)) {
      // set the current value
      const value = data[key];
      // check if the value is object type
      if (typeof value === "object") {
        const { isValid: newIsValid, errors: newErrors } = Validator(
          value,
          validation[key] || {},
          messages[key] || {},
          true
        );
        if (isValid) {
          isValid = newIsValid;
        }
        errors[key] = newErrors;
      } else {
        // store validation's current value in a variable
        const validations = validation[key];
        // store message's current value in a variable
        const message = messages[key] || {};
        // store validation types in variables
        const required = "required";
        const email = "email";
        const username = "username";
        const password = "password";
        const numeric = "numeric";
        const maxValue = "maxnumber";
        const minValue = "minnumbers";
        const alphaNumeric = "alphanumeric";
        const alpha = "alpha";
        const maxlength = "maxlength";
        const minlength = "minlength";
        const equal = "equal";
        /* validation checks start */
        if (validations[required] && (value === "" || !value)) {
          // check for undefined or required
          errors[key] = message[required] || `${key} field is required.`;
          isValid = false;
        } else if (validations[email] && value && !isValidEmail(value)) {
          // check for valid email
          errors[key] = message[email] || `${key} field must be a valid email.`;
          isValid = false;
        } else if (validations[numeric] && value && !isNumeric(value)) {
          // check for valid number
          errors[key] =
            message[numeric] || `${key} field can only have numbers.`;
          isValid = false;
        } else if (
          validations[alphaNumeric] &&
          value &&
          !isAlphaNumeric(value)
        ) {
          // check for alphanumeric value
          errors[key] =
            message[alphaNumeric] ||
            `${key} field can only have aplhabates and numbers.`;
          isValid = false;
        } else if (validations[alpha] && value && !isAlpha(value)) {
          // check for alphabates
          errors[key] =
            message[alpha] || `${key} field can only have aplhabates.`;
          isValid = false;
        } else if (
          validations[maxlength] &&
          value &&
          value.length > validations[maxlength]
        ) {
          // check for maxlength
          errors[key] =
            message[maxlength] ||
            `${key} field can only have ${validations[maxlength]} charaters.`;
          isValid = false;
        } else if (
          validations[minlength] &&
          value &&
          value.length < validations[minlength]
        ) {
          // check for minlength
          errors[key] =
            message[minlength] ||
            `${key} field should have atleast ${validations[minlength]} charaters.`;
          isValid = false;
        } else if (
          validations[minValue] &&
          value &&
          parseFloat(value) < parseFloat(validations[minValue])
        ) {
          // check for min value
          errors[key] =
            message[minlength] ||
            `${key} field should be greater than ${validations[minValue]} charaters.`;
          isValid = false;
        } else if (
          validations[maxValue] &&
          value &&
          parseFloat(value) > parseFloat(validations[maxValue])
        ) {
          // check for max value
          errors[key] =
            message[maxValue] ||
            `${key} field should be less than ${validations[maxValue]} charaters.`;
          isValid = false;
        } else if (
          validations[equal] &&
          value &&
          value !== data[validations[equal]]
        ) {
          // check for equal values
          errors[key] =
            message[equal] ||
            `${key} and ${validations[equal]} field did not matched.`;
          isValid = false;
        } else if (validations[password] && value && !isValidPassword(value)) {
          errors[key] =
            message[password] ||
            `${key} must contain one uppercase, one lowercase, one number and one special character and should be 8 charater long.`;
          isValid = false;
        } else if (validations[username] && value && !isValidUsername(value)) {
          errors[key] =
            message[username] ||
            `${key} can only have alphanumeric, _ and . values.`;
          isValid = false;
        }
        /* Validation check ends */
      }
    }
  }
  /* returns the object */
  return {
    isValid,
    errors
  };
};

export default Validator;
