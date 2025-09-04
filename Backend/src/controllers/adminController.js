const bcrypt = require("bcrypt");
const { getDashboardStats, getUsers, getStores, addUser, addStore } = require("../models/adminModel");

exports.dashboard = async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await getUsers(req.query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listStores = async (req, res) => {
  try {
    const stores = await getStores(req.query);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await addUser({ name, email, password: hashed, address, role });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;
    const store = await addStore({ name, email, address, owner_id });
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
