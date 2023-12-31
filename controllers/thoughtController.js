const { Thought, User } = require('../models');

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get Single Thought based on Id
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'Thought ID not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Create New Thought
  async postThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      //Pushes new thought into user's thoughts array
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought Posted but User not Found',
        });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update thought based on Id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought Id not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Delete Thought based on Id
  async removeThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(404).json({ message: 'Thought Id not found' });
      }
      //Removes thought from user's Thoughts Array
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought Removed but User not Found',
        });
      }
      res.json({ message: 'Though Successfully Removed' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Adds reaction to thought
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought Id not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Removes reaction, taking in both thoght and reaction's id
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought Id not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
