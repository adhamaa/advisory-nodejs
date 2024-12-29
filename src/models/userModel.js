const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // Sequelize instance

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_type: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    validate: {
      isIn: [['u', 'a']],
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Users', // Match the table name in your database
  timestamps: true, // Use timestamps
  createdAt: 'created_at', // Map createdAt to created_at
  updatedAt: 'updated_at', // Map updatedAt to updated_at
});

module.exports = { User };