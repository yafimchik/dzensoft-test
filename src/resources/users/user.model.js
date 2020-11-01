const mongoose = require('mongoose');

const userModelName = 'user';

const userType = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const UserProps = Object.keys(userType);
UserProps.push('id');

const userSchema = new mongoose.Schema(userType, { id: true });

const UserModel = mongoose.model(userModelName, userSchema);

module.exports = UserModel;
module.exports = { UserModel, UserProps };
