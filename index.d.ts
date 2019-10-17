declare module "js-object-validation";
declare interface ValidatorMethods {
  required?: boolean;
  email?: boolean;
  username?: boolean;
  password?: boolean;
  numeric?: boolean;
  maxnumber?: number;
  minnumbers?: number;
  alphanumeric?: boolean;
  alpha?: boolean;
  maxlength?: number;
  minlength?: number;
  equal?: string;
  url?: boolean;
}
declare interface ValidatorMessageMethods {
  required?: string;
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
  equal?: string;
  url?: string;
}

declare interface ValidatorReturnType {
  isValid: boolean;
  errors: any;
}

declare function Validator(
  data: any,
  validation?: {
    [key: string]: ValidatorMethods;
  },
  messages?: {
    [key: string]: ValidatorMessageMethods;
  }
): ValidatorReturnType;

export default Validator;
