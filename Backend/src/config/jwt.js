module.exports = {
  jwtSecret: process.env.JWT_SECRET || "supersecretkey",
  jwtExpires: "1d",
};
