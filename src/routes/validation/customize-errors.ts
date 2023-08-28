const customizeErrors = (errors: any) => {
  errors.forEach((error: any) => {
    switch (error.code) {
      case "string.email":
        error.message = `${error.local.label} must be a valid email`;
        break;
      case "string.base":
        error.message = `${error.local.label} must be a string`;
        break;
      case "any.required":
        error.message = `${error.local.label} required`;
        break;
    }
  });
  return errors;
};

export default customizeErrors;
