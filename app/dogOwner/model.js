const mongoose = require('mongoose');
const Joi = require('joi');

// Maps the properties of a dog
// const dogSchema = mongoose.Schema({
//   dogName: {Type: String, required: true}
// });

// Maps the properties of a dog owner, some owners may have multiple dogs so dogSchema is nested in document
const dogOwnerSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dogNames: {type: String, required: true},
  address: {type: String, required: true},
  notes: {type: String, required: true},
  walkTimeRange: String,
  walkDays: String,
  phoneNumber: String,
  email: String
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
  address: Joi.string().min(8).trim().required(),
  notes: Joi.string().min(8).trim().required(),
  walkTimeRange: Joi.string().trim(),
  walkDays: Joi.string().trim(),
  phoneNumber: Joi.string().trim(),
  email: Joi.string().trim()
});

const DogOwner = mongoose.model('owner', dogOwnerSchema);
module.exports = { DogOwner, dogOwnerJoiSchema };
