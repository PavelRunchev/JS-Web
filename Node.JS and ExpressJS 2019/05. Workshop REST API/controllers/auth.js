const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../util/encryption');

function validateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });
    
    return false;
  }

  return true;
}

module.exports = {
  signUp: (req, res, next) => {
    if (validateUser(req, res)) {
      const { email, password, name } = req.body;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, password);
      User.create({ 
        email,
        hashedPassword,
        name,
        salt
      }).then((user) => {
        res.status(201)
          .json({ message: 'User created!', userId: user._id });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
    }
  },
  signIn: (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          const error = new Error('A user with this email could not be found');
          error.statusCode = 401;
          throw error;
        }

        if(!user.authenticate(password)) {
          const error = new Error('A user with this email could not be found');
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign({ 
          email: user.email,
          userId: user._id.toString()
        }
        , 'somesupersecret'
        , { expiresIn: '1h' });

         res.status(200).json(
           { 
             message: 'User successfully logged in!', 
             token, 
             userId: user._id.toString() 
           });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      })
  }
}