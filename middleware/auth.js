const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      message: "Unauthorized: please log in via GitHub OAuth at /auth/github",
    });
  }
  req.user = req.session.user;
  next();
};

const optionalAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;
  }
  next();
};

module.exports = { requireAuth, optionalAuth };