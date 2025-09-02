const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwt");

function auth(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

function roleCheck(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: insufficient rights" });
    }
    next();
  };
}

module.exports = { auth, roleCheck };
