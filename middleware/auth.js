const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const header = req.get("Authorization") || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message:
        "Unauthorized: send a valid token in the Authorization header as 'Bearer <token>'.",
    });
  }

  if (!process.env.JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "Server configuration error: JWT_SECRET is not set." });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized: invalid or expired token." });
  }
};

module.exports = { requireAuth };
