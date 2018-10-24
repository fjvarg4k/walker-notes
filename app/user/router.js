const express = require('express');
const Joi = require('joi');

const { User, UserJoiSchema } = require('./model');

const userRouter = express.Router();

// Creates new user
userRouter.post('/', (req, res) => {
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password
  };

  // Checks that all provided data passes all schema requirements
  const validation = Joi.validate(newUser, UserJoiSchema);
  if (validation.error) {
    return res.status(422).json({ error: validation.error });
  }

  User.find({username: newUser.username})
    .count()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({ error: 'Username already taken' });
      }
      return User.hashPassword(newUser.password);
    })
    .then(passwordHash => {
      newUser.password = passwordHash;

      User.create(newUser)
        .then(user => {
          return res.status(201).json(user.serialize());
        })
        .catch(err => {
          console.error(err);
          return res.status(500).json({ error: err.message });
        });
    });
});

module.exports = { userRouter };
