"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var sequelize = new Sequelize("sqlite::memory:", {
  logging: false
}); //Teacher Model

module.exports = sequelize.define("Teacher", {
  // Teacher's model attributes are defined here
  name: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    unique: true,
    isEmail: true
  }
}, {
  freezeTableName: true // Model tableName (`user`) will be the same as the model name

});