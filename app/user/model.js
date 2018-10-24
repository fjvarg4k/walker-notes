const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Joi = require('joi');
mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username
  }
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const UserJoiSchema = Joi.object().keys({
  firstName: Joi.string().min(1).trim().required(),
  lastName: Joi.string().min(1).trim().required(),
  username: Joi.string().alphanum().min(4).max(30).trim().required(),
  password: Joi.string().min(8).max(72).trim().required()
});

const User = mongoose.model('user', userSchema);

module.exports = { User, UserJoiSchema };
