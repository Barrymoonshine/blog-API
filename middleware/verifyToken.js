import jwt from 'jsonwebtoken';

const errorMessage =
  'Your request was not authorised, please log in or sign up to continue';

const verifyToken = (req, res, next) => {
  console.log('verify token called');
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  // Check if not undefined
  if (typeof bearerHeader === 'undefined') {
    // Forbidden, 403 status is not authorised
    console.log('verify token failure');
    res.status(403).json(errorMessage);
  } else {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];

    // Verify token
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err) => {
      if (err) {
        console.log('verify token failure');
        res.status(403).json(errorMessage);
      } else {
        // Next
        console.log('verify token all good');
        next();
      }
    });
  }
};

export default verifyToken;
