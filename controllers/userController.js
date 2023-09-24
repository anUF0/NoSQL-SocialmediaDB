const { User, Thought } = require('../models');

module.exports = {
  //Gets all Users and populates with Friends
  async getUsers(req, res) {
    try {
      const user = await User.find().populate({
        path: 'friends',
        select: '-__v',
      });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Gets User based on id
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: params.userId }).populate({
        path: 'friends',
        select: '-__v',
      });
      if (!user) {
        return res.status(404).json({
          message: 'User not Found',
        });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Post new User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Updates User based on Id
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not Found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Deletes User
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete({ _id: params.userId });

      if (!user) {
        res.status(404).json({ message: 'User not Found' });
      }

      //Removes associated thoughts when User is deleted
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thoughts Removed' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {},
  async removeFriend(req, res) {},
};
