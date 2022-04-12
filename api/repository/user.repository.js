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

const resetUserPassword = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return {
      status: 404,
      message: "No user exists with that email address",
    };
  }

  return {
    status: 200,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

const updateUserPassword = async (id, password) => {
  User.update(
    { password },
    {
      where: {
        id,
      },
    }
  );

  return {
    status: 200,
    message: "Password reset successful!",
  };
};

module.exports = {
  registerUser,
  loginUser,
  resetUserPassword,
  updateUserPassword,
};
