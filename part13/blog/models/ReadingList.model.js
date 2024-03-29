const { sequelize } = require('../util/db');
const { Model, DataTypes } = require('sequelize');

class ReadingList extends Model {}

ReadingList.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { underscored: true, sequelize, modelName: 'readings', timestamps: false }
);

module.exports = ReadingList;
