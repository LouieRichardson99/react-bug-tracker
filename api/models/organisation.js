const { DataTypes } = require("sequelize");
const database = require("../config/dbConnection");

const Organisation = database.define("organisation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Organisation.sync();

module.exports = Organisation;
