const checkAuthorisation = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  return res.json({ message: "Unauthorised request!", status: 401 });
};

module.exports = { checkAuthorisation };
