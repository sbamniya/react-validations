"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol
          ? "symbol"
          : typeof obj;
      };

/*
 * Checks whether string is valid email or not
 */
var isValidEmail = function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
/*
 * Checks whether string is valid numeric or not
 */
var isNumeric = function isNumeric(num) {
  return !isNaN(num);
};

/*
 * Checks whether string is valid alpha numeric or not
 */
var isAlphaNumeric = function isAlphaNumeric(str) {
  var regExp = /^[A-Za-z0-9]+$/;
  return regExp.test(String(str).toLowerCase());
};
/*
 * Checks whether string is valid alphabatic string or not
 */
var isAlpha = function isAlpha(str) {
  return /^[a-zA-Z ]+$/.test(str);
};
/*
 * Checks whether string is valid username string or not
 */
var isValidUsername = function isValidUsername(str) {
  return new RegExp("^[a-zA-Z0-9_.]+$").test(str);
};
/*
 * Checks whether string is valid password string or not
 */
var isValidPassword = function isValidPassword(str) {
  return new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  ).test(str);
};
/**
 *
 */
var isValidURL = (exports.isValidURL = function isValidURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
  return regex.test(str);
});
/*
 * Main Validator function to validate any object
 */
var errors = {};
// set default form valid to true
var isValid = true;
var Validator = (exports.Validator = function Validator(data) {
  var validation =
    arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var messages =
    arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var reCalled =
    arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

  if (!reCalled) {
    errors = {};
    isValid = true;
  }
  /* Cheks if data is valid object or not */
  if (
    (typeof data === "undefined" ? "undefined" : _typeof(data)) !== "object"
  ) {
    throw new Error("Data should be an object.");
  }
  /* Cheks if validation is valid object or not */
  if (
    (typeof validation === "undefined" ? "undefined" : _typeof(validation)) !==
    "object"
  ) {
    throw new Error("Validation should be an object.");
  }
  /* Cheks if messages is valid object or not */
  if (
    (typeof messages === "undefined" ? "undefined" : _typeof(messages)) !==
    "object"
  ) {
    throw new Error("Messages should be an object.");
  }
  // loop through the data object
  for (var key in data) {
    // check data has key and also validation key exists
    if (data.hasOwnProperty(key) && validation.hasOwnProperty(key)) {
      // set the current value
      var value = data[key];
      // check if the value is object type
      if (
        (typeof value === "undefined" ? "undefined" : _typeof(value)) ===
        "object"
      ) {
        var _Validator = Validator(
          value,
          validation[key] || {},
          messages[key] || {},
          true
        );

        var newIsValid = _Validator.isValid;
        var newErrors = _Validator.errors;

        if (isValid) {
          isValid = newIsValid;
        }
        errors[key] = newErrors;
      } else {
        // store validation's current value in a variable
        var validations = validation[key];
        // store message's current value in a variable
        var message = messages[key] || {};
        // store validation types in variables
        var required = "required";
        var email = "email";
        var username = "username";
        var password = "password";
        var numeric = "numeric";
        var maxValue = "maxnumber";
        var minValue = "minnumbers";
        var alphaNumeric = "alphanumeric";
        var alpha = "alpha";
        var maxlength = "maxlength";
        var minlength = "minlength";
        var equal = "equal";
        var url = "url";
        /* validation checks start */
        if (validations[required] && (value === "" || !value)) {
          // check for undefined or required
          errors[key] = message[required] || key + " field is required.";
          isValid = false;
        } else if (validations[email] && value && !isValidEmail(value)) {
          // check for valid email
          errors[key] = message[email] || key + " field must be a valid email.";
          isValid = false;
        } else if (validations[numeric] && value && !isNumeric(value)) {
          // check for valid number
          errors[key] =
            message[numeric] || key + " field can only have numbers.";
          isValid = false;
        } else if (
          validations[alphaNumeric] &&
          value &&
          !isAlphaNumeric(value)
        ) {
          // check for alphanumeric value
          errors[key] =
            message[alphaNumeric] ||
            key + " field can only have aplhabates and numbers.";
          isValid = false;
        } else if (validations[alpha] && value && !isAlpha(value)) {
          // check for alphabates
          errors[key] =
            message[alpha] || key + " field can only have aplhabates.";
          isValid = false;
        } else if (
          validations[maxlength] &&
          value &&
          value.length > validations[maxlength]
        ) {
          // check for maxlength
          errors[key] =
            message[maxlength] ||
            key +
              " field can only have " +
              validations[maxlength] +
              " charaters.";
          isValid = false;
        } else if (
          validations[minlength] &&
          value &&
          value.length < validations[minlength]
        ) {
          // check for minlength
          errors[key] =
            message[minlength] ||
            key +
              " field should have atleast " +
              validations[minlength] +
              " charaters.";
          isValid = false;
        } else if (
          validations[minValue] &&
          value &&
          parseFloat(value) < parseFloat(validations[minValue])
        ) {
          // check for min value
          errors[key] =
            message[minlength] ||
            key +
              " field should be greater than " +
              validations[minValue] +
              " charaters.";
          isValid = false;
        } else if (
          validations[maxValue] &&
          value &&
          parseFloat(value) > parseFloat(validations[maxValue])
        ) {
          // check for max value
          errors[key] =
            message[maxValue] ||
            key +
              " field should be less than " +
              validations[maxValue] +
              " charaters.";
          isValid = false;
        } else if (
          validations[equal] &&
          value &&
          value !== data[validations[equal]]
        ) {
          // check for equal values
          errors[key] =
            message[equal] ||
            key + " and " + validations[equal] + " field did not matched.";
          isValid = false;
        } else if (validations[password] && value && !isValidPassword(value)) {
          errors[key] =
            message[password] ||
            key +
              " must contain one uppercase, one lowercase, one number and one special character and should be 8 charater long.";
          isValid = false;
        } else if (validations[username] && value && !isValidUsername(value)) {
          errors[key] =
            message[username] ||
            key + " can only have alphanumeric, _ and . values.";
          isValid = false;
        } else if (validations[url] && value && !isValidURL(value)) {
          errors[key] = message[url] || key + " should be a valid URL.";
          isValid = false;
        }
        /* Validation check ends */
      }
    }
  }
  /* returns the object */
  return {
    isValid: isValid,
    errors: errors
  };
});

exports.default = Validator;
