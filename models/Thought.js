const { Schema, model, Types } = require('mongoose');
const DateFormatter = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //get: (date) => DateFormatter.formatDate(date, 'DD-MMM-YYYY hh:mm a'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: [1],
      maxLength: [280],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) =>
        DateFormatter.formatDate(new Date(date), 'DD-MMM-YYYY hh:mm a'),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);

//Virtual to count the number of reactions on a thought
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
