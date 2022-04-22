const { Organisation, Organisation_Users } = require("../models");

const registerOrganisation = async (name, user) => {
  try {
    const organisation = await Organisation.create({ name });

    // Add relation to junction table (organisation_users)
    organisation.addUser(user).then(() => {
      const organisationId = organisation.dataValues.id;
      const userId = user.id;

      Organisation_Users.findOne({
        where: { userId, organisationId },
      }).then(({ id }) => {
        Organisation_Users.update({ isAdmin: true }, { where: { id } });
      });
    });

    return {
      status: 201,
      message: "Organisation created successfully!",
    };
  } catch {
    return {
      status: 500,
      message: "Oops.. Something seems to have gone wrong!",
    };
  }
};

module.exports = { registerOrganisation };
