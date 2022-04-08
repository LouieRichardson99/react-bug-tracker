const { Organisation } = require("../models");

const registerOrganisation = async (name, user) => {
  try {
    const organisation = await Organisation.create({ name });
    organisation.addUser(user);

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
