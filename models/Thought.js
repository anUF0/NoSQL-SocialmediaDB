const { Schema, model } = require('mongoose');

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
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reaction],
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);

//Getter Method to format date
thoughtSchema.get();

//Virtual to count the number of reactions on a thought
thoughtSchema.virtual('reactionCount').get(function(){
  const NOReactions = this.reactions.

})

const Thought = model('thought', thoughtSchema);

module.export = Thought;
