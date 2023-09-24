const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid Email'],
      thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
      friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  const NOFriends = this.friends.length;
  return NOFriends;
});

const User = model('user', userSchema);

module.exports = User;
