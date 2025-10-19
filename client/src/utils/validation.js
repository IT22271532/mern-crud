// Validation utility functions

export const validateName = (name) => {
  const errors = [];
  
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (name.trim().length > 50) {
    errors.push('Name must be less than 50 characters');
  } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    errors.push('Name can only contain letters and spaces');
  }
  
  return errors;
};

export const validateEmail = (email) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email.trim())) {
    errors.push('Please enter a valid email address');
  } else if (email.trim().length > 100) {
    errors.push('Email must be less than 100 characters');
  }
  
  return errors;
};

export const validateAge = (age) => {
  const errors = [];
  const ageNum = parseInt(age);
  
  if (!age || age.toString().trim().length === 0) {
    errors.push('Age is required');
  } else if (isNaN(ageNum)) {
    errors.push('Age must be a valid number');
  } else if (ageNum < 1) {
    errors.push('Age must be greater than 0');
  } else if (ageNum > 150) {
    errors.push('Age must be less than 150');
  }
  
  return errors;
};

export const validateForm = (formData) => {
  const errors = {};
  
  const nameErrors = validateName(formData.name);
  const emailErrors = validateEmail(formData.email);
  const ageErrors = validateAge(formData.age);
  
  if (nameErrors.length > 0) errors.name = nameErrors;
  if (emailErrors.length > 0) errors.email = emailErrors;
  if (ageErrors.length > 0) errors.age = ageErrors;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};