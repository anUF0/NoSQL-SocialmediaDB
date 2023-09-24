const { Thought, User } = require('../models');

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = Thought.find();
      res.json(thoughts);
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
      res.json(course);
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
        { _id: req.userId },
        { $push: { thoughts: _id } },
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
        res.status(404).json({ message: 'Thought ID not found' });
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
        res.status(404).json({ message: 'Thought ID not found' });
      }
      //Removes thought from user's Thoughts Array
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $pull: { thoughts: _id } },
        { new: true }
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
  // Adds reaction to thouh
  //WIP
  async addReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);

      //Pushes new thought into user's thoughts array
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $push: { thoughts: _id } },
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
  async removeReaction(req, res) {},
};
