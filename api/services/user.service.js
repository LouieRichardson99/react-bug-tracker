const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userRepository = require("../repository/user.repository");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });

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

const resetUserPassword = async (email) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  try {
    await schema.validateAsync({ email });

    const response = await userRepository.resetUserPassword(email);

    if (response.status !== 200) {
      return;
    }

    const payload = {
      email: response.user.email,
      id: response.user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const smtpTransporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_SECRET,
      },
    });

    const data = {
      from: "Louie <louierich99@gmail.com",
      to: payload.email,
      subject: "Password Reset",
      html: `<p>Here is the <a href=http://localhost:3000/update-password/${token}>link</a> to password reset form</p>`,
    };

    smtpTransporter.sendMail(data);
  } catch {
    return;
  }
};

const updateUserPassword = async (token, password, repeatPassword) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    // Validate user input
    const schema = Joi.object({
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
      await schema.validateAsync({ password, repeatPassword });

      // Hash password if validation is successful
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      return userRepository.updateUserPassword(id, hashedPassword);
    } catch {
      return {
        status: 400,
        message: "Password failed validation schema",
      };
    }
  } catch {
    return {
      status: 401,
      message: "Update password unauthorised",
    };
  }
};

module.exports = {
  registerUser,
  loginUser,
  resetUserPassword,
  updateUserPassword,
};
