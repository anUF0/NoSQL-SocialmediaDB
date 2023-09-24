const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
  thoughts: [Thoughts], //WIP
  friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

userSchema.virtual('friendCount');
//WIP

const User = model('user', userSchema);

module.exports = User;
