const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const createUser = async ({ name, username, password }) => {
  // password input validation
  if (password?.length < 3) {
    throw new mongoose.Error.ValidationError();
  }

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      name,
      username,
      password: passwordHash,
    });

    return newUser;
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const userList = await User.find({})
      .populate('blogs', 'url title author _id')
      .exec();
    return userList;
  } catch (err) {
    throw err;
  }
};

const addBlogToUser = async (userId, blogId) => {
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { blogs: blogId } }
    ).exec();
  } catch (err) {
    throw err;
  }
};

module.exports = { createUser, getAllUsers, addBlogToUser };
