const sequelize = require('../util/db');
const { Model, DataTypes } = require('sequelize');

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    time: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, modelName: 'note', underscored: true, timestamps: false }
);

Note.sync();

module.exports = Note;
