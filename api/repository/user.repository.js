const User = require("../models/user");
const bcrypt = require("bcrypt");
const database = require("../config/dbConnection");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config/.env") });

const registerUser = async (full_name, email, password) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    return {
      status: 409,
      message: "User already exists with that email address",
    };
  }

  // NEEDS ORG NAME ADDING!

  try {
    const user = await User.create({ full_name, email, password });

    return {
      status: 201,
      message: "Account created successfully!",
      userId: user.id,
    };
  } catch {
    return {
      status: 500,
      message: "Oops.. Something seems to have gone wrong!",
    };
  }
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { status: 404, message: "User does not exist" };
  }

  const match = bcrypt.compareSync(password, user.password);

  if (!match) {
    return { status: 401, message: "Invalid email/password" };
  }

  return {
    status: 200,
    message: "Login successful!",
    userId: user.id,
  };
};

const logoutUser = async (sessionId) => {
  const query = "DELETE FROM sessions WHERE sid = ?";
  const response = await database.query(query, { replacements: [sessionId] });

  console.log(response);

  return {
    status: 200,
    message: "Logged out successfully!",
  };
};

module.exports = { registerUser, loginUser, logoutUser };
