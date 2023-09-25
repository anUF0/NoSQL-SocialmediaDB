const { User, Thought } = require('../models');

module.exports = {
  //Gets all Users and populates with Friends
  async getUsers(req, res) {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Gets User based on id
  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        //Populates user's thoughts and friends
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' });
      if (!user) {
        return res.status(404).json({
          message: 'User Id not Found',
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
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User Id not Found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Deletes User
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

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
  //Adds user with friendId from other user's array
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not Found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Removes user with friendId from other user's array
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'User not Found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
