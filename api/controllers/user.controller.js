const userService = require("../services/user.service");
const organisationService = require("../services/organisation.service");

const userSignup = async (req, res) => {
  const { fullName, email, organisationName, password, repeatPassword } =
    req.body;

  const response = await userService.registerUser(
    fullName,
    email,
    password,
    repeatPassword
  );

  // Adding user session to Redis.
  if (response?.status === 201) {
    // If the user registration is successful, register the organisation
    organisationService.registerOrganisation(organisationName, response.user);

    const user = {
      id: response.userId,
      email: response.email,
    };

    req.session.user = user;
    req.session.cookie.expires = new Date(Date.now() + 100000);
    req.session.cookie.maxAge = 100000;
    req.session.save();

    return res.status(response?.status).json({
      message: response?.message,
      user,
    });
  }

  return res.status(response?.status).json({
    message: response?.message,
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const response = await userService.loginUser(email, password);

  // Adding user session to Redis.
  if (response?.status === 200) {
    const user = {
      id: response.userId,
      email: response.email,
    };

    req.session.user = user;
    req.session.cookie.expires = new Date(Date.now() + 100000);
    req.session.cookie.maxAge = 100000;
    req.session.save();

    return res.status(response?.status).json({
      message: response?.message,
      user,
    });
  }

  return res.status(response?.status).json({
    message: response?.message,
  });
};

const userLogout = (req, res) => {
  if (req.session) {
    req.session.destroy();
  }

  res.status(200).json({
    message: "Log out successful!",
  });
};

module.exports = { userSignup, userLogin, userLogout };
