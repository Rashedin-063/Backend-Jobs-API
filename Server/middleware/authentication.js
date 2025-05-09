const User = require('../models/Users.model');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');


const auth = (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) { 
    throw new UnauthenticatedError('Authentication Invalid');
  }

  const token = authHeader.split(' ')[1];
 
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = {userId: payload.userId, username: payload.username};
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
}

module.exports = auth;