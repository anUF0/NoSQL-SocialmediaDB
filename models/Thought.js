const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: [1],
    maxLength: [280],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: 
});

//Getter Method to format date
thoughtSchema.get()

const Thought = model('thought', thoughtSchema);

module.export = Thought;
