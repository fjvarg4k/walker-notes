const express = require('express');
const Joi = require('joi');
const dogOwnerRouter = express.Router();

const { jwtPassportMiddleware } = require('../auth/strategy');
const { DogOwner, dogOwnerJoiSchema } = require('./model');

// Create new dog owner
dogOwnerRouter.post('/', jwtPassportMiddleware, (req, res) => {
  const newDogOwner = {
    user: req.user.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dogNames: req.body.dogNames,
    address: req.body.address,
    notes: req.body.notes,
    walkTimeRange: req.body.walkTimeRange,
    walkDays: req.body.walkDays,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  };

  const validation = Joi.validate(newDogOwner, dogOwnerJoiSchema);
  if (validation.error) {
    return res.status(422).json({ error: validation.error });
  }

  DogOwner.create(newDogOwner)
    .then(createdDogOwner => {
      return res.status(201).json(createdDogOwner.serialize());
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Retrieve a specific user's client info
dogOwnerRouter.get('/', jwtPassportMiddleware, (req, res) => {
  DogOwner.find({ user: req.user.id })
    .populate('user')
    .then(owners => {
      return res.status(200).json(
        owners.map(owner => owner.serialize())
      );
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Retrieve all dog owners info
dogOwnerRouter.get('/all', (req, res) => {
  DogOwner.find()
    .populate('user')
    .then(owners => {
      return res.status(200).json(
        owners.map(owner => owner.serialize())
      );
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Retrieve one instance of a dog owner by id
dogOwnerRouter.get('/:ownerid', (req, res) => {
  DogOwner.findById(req.params.ownerid)
    .populate('user')
    .then(owner => {
      return res.status(200).json(owner.serialize());
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Update dog owner by id
dogOwnerRouter.put('/:ownerid', jwtPassportMiddleware, (req, res) => {
  const dogOwnerUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dogNames: req.body.dogNames,
    address: req.body.address,
    notes: req.body.notes,
    walkTimeRange: req.body.walkTimeRange,
    walkDays: req.body.walkDays,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  };

  const validation = Joi.validate(dogOwnerUpdate, dogOwnerJoiSchema);
  if (validation.error) {
    return res.status(422).json({ error: validation.error });
  }

  DogOwner.findByIdAndUpdate(req.params.ownerid, dogOwnerUpdate)
    .then(() => {
      return res.status(201).end();
    })
    .catch(err => {
      return res.status(500).json(err)
    });
});

// Remove dog owner by id
dogOwnerRouter.delete('/:ownerid', jwtPassportMiddleware, (req, res) => {
  DogOwner.findByIdAndDelete(req.params.ownerid)
    .then(() => {
      return res.status(201).end();
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

module.exports = { dogOwnerRouter };
