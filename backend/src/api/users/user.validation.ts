import { body, param } from 'express-validator';


export const createUserValidator = [
  body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Must be a valid email address.')
    .trim()
    .normalizeEmail(),

  body('role')
    .notEmpty().withMessage('Role is required.')
    .isIn(['admin', 'user']).withMessage("Role must be either 'admin' or 'user'."),

  body('status')
    .notEmpty().withMessage('Status is required.')
    .isIn(['active', 'inactive']).withMessage("Status must be either 'active' or 'inactive'."),
];

export const updateUserValidator = [
  body('email')
    .optional()
    .isEmail().withMessage('Must be a valid email address.')
    .trim()
    .normalizeEmail(),

  body('role')
    .optional()
    .isIn(['admin', 'user']).withMessage("Role must be either 'admin' or 'user'."),

  body('status')
    .optional()
    .isIn(['active', 'inactive']).withMessage("Status must be either 'active' or 'inactive'."),
  
  param('id')
    .isUUID().withMessage('User ID must be a valid UUID.'),
];
