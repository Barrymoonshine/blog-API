import { check, validationResult } from 'express-validator';

export const createFormValidation = () => [
  check('title').isString().notEmpty().withMessage('Please enter a title'),
  check('caption').isString().notEmpty().withMessage('Please enter a caption'),
  check('content')
    .isString()
    .notEmpty()
    .withMessage('Please provide content for the blog'),
  check('region').isString().notEmpty().withMessage('Please select the region'),
];

export const usernamePasswordValidation = () => [
  check('username')
    .isString()
    .notEmpty()
    .withMessage('Please enter a username'),
  check('password')
    .isString()
    .notEmpty()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/)
    .withMessage('Please enter a valid password'),
];

export const confPasswordValidation = () => [
  check('confirmPassword')
    .isString()
    .notEmpty()
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      return false;
    })
    .withMessage('Passwords do not match'),
];

export const commentFormValidation = () => [
  check('comment')
    .isString()
    .notEmpty()
    .withMessage('Please provide a comment'),
];

export const likeFormValidation = () => [
  check('username')
    .isString()
    .notEmpty()
    .withMessage('Please log in to like this blog '),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json(errors.array());
};
