const { DataTypes } = require("sequelize");
const database = require("../config/dbConnection");

const Organisation_Users = database.define("organisation_users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: "user",
    referencesKey: "id",
    allowNull: false,
  },
  organisationId: {
    type: DataTypes.INTEGER,
    references: "organisation",
    referencesKey: "id",
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Organisation_Users.sync();

module.exports = Organisation_Users;
