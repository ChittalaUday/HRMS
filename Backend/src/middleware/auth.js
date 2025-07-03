const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET || "secret";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Access token is missing or invalid",
    });
  }

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: "Invalid token",
      });
    }
    next();
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, jwt_secret, { expiresIn: "3h" });
};

module.exports = {
  authenticateToken,
  generateAccessToken,
};
