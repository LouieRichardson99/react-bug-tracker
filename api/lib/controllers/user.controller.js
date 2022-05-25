const userService = require("../services/user.service");
const organisationService = require("../services/organisation.service");

const userData = async (req, res) => {
  const { id } = req.session.user;
  const response = await userService.getUser(id);

  if (response?.status === 200) {
    return res.status(response.status).json({
      message: response?.message,
      user: response?.data,
    });
  }

  return res.status(response?.status);
};

const userOrganisations = async (req, res) => {
  const { id } = req.session.user;

  const response = await organisationService.fetchUserOrganisations(id);

  if (response?.status === 200) {
    return res.status(response.status).json({
      message: response?.message,
      organisations: response?.data,
    });
  }

  return res.status(response?.status);
};

const userSignup = async (req, res) => {
  const { fullName, email, organisationName, password } = req.body;

  const response = await userService.registerUser(fullName, email, password);

  if (response?.status === 201) {
    try {
      const user = {
        id: response?.userId,
        email: response?.email,
      };

      organisationService.registerOrganisation(organisationName, user);

      const hour = 3600000;

      req.session.user = user;
      req.session.cookie.expires = new Date(Date.now() + hour);
      req.session.cookie.maxAge = hour;
      req.session.save();

      return res.status(response?.status).json({
        message: response?.message,
        user,
      });
    } catch {
      // TODO: Remove newly created user from database

      return res.status(500).json({
        message:
          "There seems to be a problem creating your organisation. Please try again",
      });
    }
  }

  return res.status(response?.status).json({
    message: response?.message,
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const response = await userService.loginUser(email, password);

  if (response?.status === 200) {
    const user = {
      id: response.userId,
      email: response.email,
    };

    const hour = 3600000;

    req.session.user = user;
    req.session.cookie.expires = new Date(Date.now() + hour);
    req.session.cookie.maxAge = hour;
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

const userResetPassword = async (req, res) => {
  const { email } = req.body;

  userService.resetUserPassword(email);

  /*
   * Always send a status code 200 and success message even if
   * there is no user matching the email.
   *
   * This will prevent giving attackers any indication that they should
   * try a different email address.
   */
  return res.status(200).json({
    message: "Password reset email has been sent!",
  });
};

const userUpdatePassword = async (req, res) => {
  const { token, password, repeatPassword } = req.body;

  const response = await userService.updateUserPassword(
    token,
    password,
    repeatPassword
  );

  return res.status(response?.status).json({
    message: response?.message,
  });
};

const userUploadProfileImage = async (req, res) => {
  if (req?.file) {
    const { path } = req.file;
    const userId = req.session.user.id;

    const response = await userService.uploadUserProfileImage(path, userId);

    return res.status(response?.status).json({
      message: response?.message,
    });
  }
};

module.exports = {
  userData,
  userOrganisations,
  userSignup,
  userLogin,
  userLogout,
  userResetPassword,
  userUpdatePassword,
  userUploadProfileImage,
};
