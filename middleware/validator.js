import { check, validationResult } from 'express-validator';

const createFormValidation = () => [
  check('title').isString().notEmpty().withMessage('Please enter a title'),
  check('caption').isString().notEmpty().withMessage('Please enter a caption'),
  check('content')
    .isString()
    .notEmpty()
    .withMessage('Please provide content for the blog'),
  check('region').isString().notEmpty().withMessage('Please select the region'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json(errors.array());
};

export { createFormValidation, validate };
