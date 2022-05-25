const checkAuthorisation = (req, res, next) => {
  if (!req.session.user) {
    return res.json({ message: "Unauthorised request!", status: 401 });
  }

  return next();
};

module.exports = { checkAuthorisation };
