import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // Get auth header value
  const { token } = req.cookies;
  // Check if undefined
  if (typeof token === 'undefined') {
    // Forbidden, 403 status is not authorised
    res
      .status(403)
      .json(
        'Access denied, no authorisation details provided. Please log in or sign up to continue'
      );
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        res
          .status(403)
          .json(
            'Your request was not authorised, please log in or sign up to continue'
          );
      } else {
        // Next
        next();
      }
    });
  }
};

export default verifyToken;
