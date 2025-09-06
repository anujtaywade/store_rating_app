const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpires } = require("../config/jwt");
const { findByEmail, createUser } = require("../models/userModel");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address ,role} = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, password: hashed, address, role: role || "user" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
      expiresIn: jwtExpires,
    });

    res.json({ token, role: user.role, id: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.json({ message: "Logged out successfully. Please remove token on client side." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

