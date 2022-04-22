const { User, Organisation } = require("../models");
const bcrypt = require("bcrypt");

const userData = async (id) => {
  const user = await User.findOne({
    attributes: ["full_name", "id", "image", "email"],
    where: id,
    include: Organisation,
  });

  if (user) {
    return {
      status: 200,
      message: "Fetch successful",
      data: user,
    };
  }
};

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

const uploadUserProfileImage = async (url, userId) => {
  try {
    User.update(
      { image: url },
      {
        where: {
          id: userId,
        },
      }
    );

    return {
      status: 201,
      message: "Uploaded profile image successfully",
    };
  } catch {
    return {
      status: 400,
      message: "Upload failed",
    };
  }
};

module.exports = {
  userData,
  registerUser,
  loginUser,
  resetUserPassword,
  updateUserPassword,
  uploadUserProfileImage,
};
