const Organisation = require("./organisation");
const User = require("./user");
const database = require("../config/dbConnection");

Organisation.belongsToMany(User, {
  through: "organisation_users",
});
User.belongsToMany(Organisation, { through: "organisation_users" });

database.sync();

module.exports = {
  User,
  Organisation,
};
