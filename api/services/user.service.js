const Joi = require("joi");
const bcrypt = require("bcrypt");
const userRepository = require("../repository/user.repository");

const registerUser = async (fullName, email, password, repeatPassword) => {
  // Validate user input
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(
      /**
       * Minimum of eight characters with at least one upper case letter, one lower case letter,
       * one number, and one special character
       */
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      )
    ),
    repeatPassword: Joi.ref("password"),
  });

  try {
    await schema.validateAsync({
      fullName,
      email,
      password,
      repeatPassword,
    });

    // Hash password if validation is successful
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    return userRepository.registerUser(fullName, email, hashedPassword);
  } catch (err) {
    return { status: 400, message: err.details };
  }
};

const loginUser = async (email, password) => {
  // Validate user input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    await schema.validateAsync({
      email,
      password,
    });

    return userRepository.loginUser(email, password);
  } catch (err) {
    return { status: 400, message: err.details };
  }
};

module.exports = { registerUser, loginUser };
