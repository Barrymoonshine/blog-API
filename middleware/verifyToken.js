import jwt from 'jsonwebtoken';

const errorMessage =
  'Your request was not authorised, please log in or sign up to continue';

const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  // Check if undefined
  if (typeof bearerHeader === 'undefined') {
    // Forbidden, 403 status is not authorised
    res.status(403).json(errorMessage);
  } else {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Verify the token
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err) => {
      if (err) {
        res.status(403).json(errorMessage);
      } else {
        // Next
        next();
      }
    });
  }
};

export default verifyToken;
