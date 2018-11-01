const mongoose = require('mongoose');
const Joi = require('joi');

const dogOwnerSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dogNames: {type: String, required: true},
  address: {type: String, required: true},
  notes: {type: String, required: true},
  walkTimeRange: {type: String, default: ''},
  walkDays: {type: String, default: ''},
  phoneNumber: {type: String, default: ''},
  email: {type: String, default: ''}
});

// Defined an instance of a dog owner and check if user is populated
// to prevent sensitive info from being displayed
dogOwnerSchema.methods.serialize = function() {
  let user;

  if (typeof user === 'function') {
    user = this.user.serialize();
  } else {
    user = this.user;
  }

  return {
    id: this._id,
    user: user,
    firstName: this.firstName,
    lastName: this.lastName,
    dogNames: this.dogNames,
    address: this.address,
    notes: this.notes,
    walkTimeRange: this.walkTimeRange,
    walkDays: this.walkDays,
    phoneNumber: this.phoneNumber,
    email: this.email
  };
}

// Cheks that data provided when creating new dog owner is valid
const dogOwnerJoiSchema = Joi.object().keys({
  user: Joi.string().optional(),
  firstName: Joi.string().min(1).trim().required(),
  lastName: Joi.string().min(1).trim().required(),
  dogNames: Joi.string().min(1).trim().required(),
  address: Joi.string().trim().required(),
  notes: Joi.string().trim().required(),
  walkTimeRange: Joi.string().trim().allow(''),
  walkDays: Joi.string().trim().allow(''),
  phoneNumber: Joi.string().trim().allow(''),
  email: Joi.string().trim().allow('')
});

const DogOwner = mongoose.model('owner', dogOwnerSchema);
module.exports = { DogOwner, dogOwnerJoiSchema };
