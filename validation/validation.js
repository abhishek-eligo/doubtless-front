// validation.js
import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
});

const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(10).pattern(/^\d{10}$/).required().messages({
    'string.pattern': 'Phone number can only contain numeric digits.',
    'any.required': 'Phone number is required.',
    'string.min': 'Phone number be at least 10 digits long.',
    'string.max': 'Phone numbercannot be longer than 10 digits long.',
  }),
  name: Joi.string().min(3).max(50).required().messages({
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name cannot be longer than 50 characters.',
    'any.required': 'Name is required.'
  }),
  last_name: Joi.string().min(3).max(50).required().messages({
    'any.required': 'Last name is required.'
  })
});
const changePasswordSchema = Joi.object({

  old_password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long.',
    'any.required': 'Password is required.'
  }),
  password_confirmation: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Password confirmation is required'
  }),
});
const forgetSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
});
const resetSchema = Joi.object({
  password: Joi.string().min(6).required(),
  password_confirmation: Joi.any().equal(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Password confirmation is required'
  }),
});

export { loginSchema, forgetSchema, registerSchema, resetSchema, changePasswordSchema };
