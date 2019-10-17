## Simple JS validation for forms

This is basically aimed to validate forms in reactjs.

## installation

### using npm

`npm i js-object-validation`

or

`npm install js-object-validation`

### using yarn

`yarn add js-object-validation`

## Benifits

> Pure JS

> Customizable messages

> No dependencies

> Easy to use.

## Usage

```
import Validator from "js-object-validation";

try{
  const objectToValidate = {
    email: "sbamniya23",
    password: "12"
  }
  const validations = {
    email: {
      email: true,
    },
    password: {
      minlength: 8,
    }
  }
  const messages = {
    email: {
      email: "Email should be valid email",
    },
    password: {
      minlength: "Password should be at least 8 charater long",
    }
  } // this is optional

  const {isValid, errors} = Validator(objectToValidate, validations, messages);
  if(isValid){
    <!-- object has passed all validations -->
  } else {
    <!-- object has some error -->
    console.log(errors)
  }
} catch(error) {
  console.log(error)
}

```

<!-- required?: string;
  email?: string;
  username?: string;
  password?: string;
  numeric?: string;
  maxnumber?: string;
  minnumbers?: string;
  alphanumeric?: string;
  alpha?: string;
  maxlength?: string;
  minlength?: string;
  equal?: string; -->

## Validation types Options

#### Required

> required

#### Valid email

> email

#### Valid number

> numeric

#### Max number

> maxnumber

#### Min number

> minnumbers

#### Valid Alphanumeric

> alphanumeric

#### Valid Alphabetic string

> alpha

#### Maxlength

> maxlength

#### Min lenght

> minlength

#### Compare two fields

> equal

#### Strong Password

> password

#### Username

> username

#### Valid URL

> url

# Update

Fixed <a href="https://github.com/sbamniya/react-validations/issues/1">Issue #1</a>

Added Validations for Password and Username

# Update 2

Added typescript defination and removed ENUM for clear management

## Want to contribute/update ?

If you have any new update/idea feel free to contact.

> sbamniya23@gmail.com

## Contributors

<a href="https://github.com/sbamniya">@sbamniya</a>
