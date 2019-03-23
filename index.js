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
* Define the supported validation types
*/
export const ValidationTypes = {
  REQUIRED: "required",
  EMAIL: "email",
  NUMERIC: "numeric",
  MAXVALUE: "max number",
  MINVALUE: "min numbers",
  ALPHA_NUMERIC: "alpha numeric",
  ALPHA: "alpha",
  MAXLENGTH: "maxlength",
  MINLENGTH: "minlength",
};

/* 
* Main Validator function to validate any object
*/
export const Validator = (data, validation = {}, messages = {}) => {
  let errors = {};
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
  // set default form valid to true
  let isValid = true;
  // loop through the data object
  for (const key in data) {
    // check data has key and also validation key exists
    if (data.hasOwnProperty(key) && validation.hasOwnProperty(key)) {
      // set the current value
      const value = data[key];
      // check if the value is object type
      if (typeof value === "object") {
        throw new Error("Value of data object should be string or number.");
      }
      // store validation's current value in a variable
      const validations = validation[key];
      // store message's current value in a variable
      const message = messages[key] || {};
      // store validation types in variables
      const required = ValidationTypes.REQUIRED;
      const email = ValidationTypes.EMAIL;
      const numeric = ValidationTypes.NUMERIC;
      const maxValue = ValidationTypes.MAXVALUE;
      const minValue = ValidationTypes.MIN_MINVALUE;
      const alphaNumeric = ValidationTypes.ALPHA_NUMERIC;
      const alpha = ValidationTypes.ALPHA;
      const maxlength = ValidationTypes.MAXLENGTH;
      const minlength = ValidationTypes.MINLENGTH;
      /* validation checks start */
      if ((validations[required] && value === "") || !value) {
        // check for undefined or required
        errors[key] = message[required] || `${key} field is required.`;
        isValid = false;
      } else if (validations[email] && !isValidEmail(value)) {
        // check for valid email
        errors[key] = message[email] || `${key} field must be a valid email.`;
        isValid = false;
      } else if (validations[numeric] && !isNumeric(value)) {
        // check for valid number
        errors[key] = message[numeric] || `${key} field can only have numbers.`;
        isValid = false;
      } else if (validations[alphaNumeric] && !isAlphaNumeric(value)) {
        // check for alphanumeric value
        errors[key] =
          message[alphaNumeric] ||
          `${key} field can only have aplhabates and numbers.`;
        isValid = false;
      } else if (validations[alpha] && !isAlpha(value)) {
        // check for alphabates
        errors[key] =
          message[alpha] || `${key} field can only have aplhabates.`;
        isValid = false;
      } else if (
        validations[maxlength] &&
        value.length > validations[maxlength]
      ) {
        // check for maxlength
        errors[key] =
          message[maxlength] ||
          `${key} field can only have ${validations[maxlength]} charaters.`;
        isValid = false;
      } else if (
        validations[minlength] &&
        value.length < validations[minlength]
      ) {
        // check for minlength
        errors[key] =
          message[minlength] ||
          `${key} field should have atleast ${validations[
            minlength
          ]} charaters.`;
        isValid = false;
      } else if (
        validations[minValue] &&
        parseFloat(value) < parseFloat(validations[minValue])
      ) {
        // check for min value
        errors[key] =
          message[minlength] ||
          `${key} field should be greater than ${validations[
            minValue
          ]} charaters.`;
        isValid = false;
      } else if (
        validations[maxValue] &&
        parseFloat(value) > parseFloat(validations[maxValue])
      ) {
        // check for max value
        errors[key] =
          message[maxValue] ||
          `${key} field should be less than ${validations[
            maxValue
          ]} charaters.`;
        isValid = false;
      }
      /* Validation check ends */
    }
  }
  /* returns the object */
  return {
    isValid,
    errors,
  };
};

export default Validator;
