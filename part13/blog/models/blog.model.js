const { sequelize } = require('../util/db');
const { Model, DataTypes } = require('sequelize');
const { User } = require('.');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: { args: 1991, msg: 'Blog must be published after or on 1991.' },
        max: {
          args: new Date().getFullYear(),
          msg: 'Blog must not be published beyond the current year.',
        },
      },
    },
  },
  { sequelize, underscored: true, modelName: 'blog' }
);

module.exports = Blog;
