const Joi = require("joi");
const organisationRepository = require("../repository/organisation.repository");

const registerOrganisation = async (organisationName, user) => {
  // Validate user input
  const schema = Joi.object({
    organisationName: Joi.string().required(),
  });

  try {
    await schema.validateAsync({ organisationName });
    return organisationRepository.registerOrganisation(organisationName, user);
  } catch (err) {
    return { status: 400, message: err.details };
  }
};

module.exports = { registerOrganisation };
