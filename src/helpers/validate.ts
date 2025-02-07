import { ILoginErrors, ILoginProps, IRegisterErrors, IRegisterProps } from "@/interfaces/Types";



// LOGIN

export function validateLoginForm(values: ILoginProps): ILoginErrors {
  const errors: ILoginErrors = {};

  // EMAIL
  if (!values.email) {
    errors.email = "The email field is required";
  } else if (!/^[\w.-]+@[\w-]+\.[\w]{2,4}$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // PASSWORD
  if (!values.password) {
    errors.password = "The password field is required";
  } else if (values.password.length < 6) {
    errors.password = "The password must be at least 6 characters long";
  }

  return errors;
}

// REGISTER

export const validateRegisterForm = (values: IRegisterProps): IRegisterErrors => {
    const errors: IRegisterErrors = {};

    // NAME
    if (!values.name.trim()) {
        errors.name = "The name field is required";
    } else if (values.name.length < 3 || values.name.length > 80) {
        errors.name = "The name must be between 3 and 80 characters";
    }

    // EMAIL
    if (!values.email) {
        errors.email = "The email field is required";
    } else if (values.email.length < 3 || values.email.length > 80) {
        errors.email = "The email must be between 3 and 80 characters";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email address";
    }

    // PASSWORD
    if (!values.password) {
        errors.password = "The password field is required";
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/g.test(values.password)) {
        errors.password = "The password must contain at least one uppercase letter, one number, and one special character";
    } else if (values.password.length < 8 || values.password.length > 24) {
        errors.password = "The password must be between 8 and 24 characters";
    }

    // CONFIRM PASSWORD
    if (!values.ConfirmPassword) {
        errors.ConfirmPassword = "The confirm password field is required";
    } else if (values.ConfirmPassword !== values.password) {
        errors.ConfirmPassword = "Passwords do not match";
    }

    // ADDRESS
    if (!values.address.trim()) {
        errors.address = "The address field is required";
    } else if (values.address.length < 3 || values.address.length > 80) {
        errors.address = "The address must be between 3 and 80 characters";
    }

    return errors;
};