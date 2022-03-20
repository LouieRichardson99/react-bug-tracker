const userService = require("../services/user.service");

const userSignup = async (req, res) => {
  const { fullName, email, password, repeatPassword } = req.body;

  const response = await userService.registerUser(
    fullName,
    email,
    password,
    repeatPassword
  );

  // Adding users session to DB.
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

  // Adding users session to DB.
  if (response?.status === 200) {
    req.session.userId = response.userId;
  }

  return res.status(response?.status).json({
    message: response?.message,
  });
};

const userLogout = (req, res) => {
  req.session.Key = "Hey";
  // req.session.destroy();
};

module.exports = { userSignup, userLogin, userLogout };
