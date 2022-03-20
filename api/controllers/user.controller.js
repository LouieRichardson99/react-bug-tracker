const userService = require("../services/user.service");

const userSignup = async (req, res) => {
  const { fullName, email, password, repeatPassword } = req.body;

  const response = await userService.registerUser(
    fullName,
    email,
    password,
    repeatPassword
  );

  // Adding users session to Redis.
  if (response?.status === 201) {
    req.session.userId = response.userId;
    req.session.save();
  }

  return res.status(response?.status).json({
    message: response?.message,
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const response = await userService.loginUser(email, password);

  // Adding users session to Redis.
  if (response?.status === 200) {
    req.session.userId = response.userId;
    req.session.save();
  }

  return res.status(response?.status).json({
    message: response?.message,
  });
};

const userLogout = (req, res) => {
  req.session.destroy();

  res.status(200).json({
    message: "Log out successful!",
  });
};

module.exports = { userSignup, userLogin, userLogout };
