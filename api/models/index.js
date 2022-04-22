const Organisation = require("./organisation");
const User = require("./user");
const database = require("../config/dbConnection");
const Organisation_Users = require("./organisation_users");

Organisation.belongsToMany(User, {
  through: Organisation_Users,
});
User.belongsToMany(Organisation, { through: Organisation_Users });

database.sync();

module.exports = {
  User,
  Organisation,
  Organisation_Users,
};
