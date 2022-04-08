const { User } = require("../models");
const bcrypt = require("bcrypt");

const registerUser = async (full_name, email, password) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    return {
      status: 409,
      message: "User already exists with that email address",
    };
  }

  try {
    const user = await User.create({ full_name, email, password });

    return {
      status: 201,
      message: "Account created successfully!",
      userId: user.id,
      email: user.email,
      user,
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
    return {
      status: 404,
      message: "No user exists with that email address",
    };
  }

  const match = bcrypt.compareSync(password, user.password);

  if (!match) {
    return { status: 401, message: "Invalid email/password" };
  }

  return {
    status: 200,
    message: "Login successful!",
    userId: user.id,
    email: user.email,
  };
};

module.exports = { registerUser, loginUser };
