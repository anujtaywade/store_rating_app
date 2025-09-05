const { getMyStores, getStoreRatings } = require("../models/ownerModel");
const { addStore } = require("../models/adminModel");

exports.myStores = async (req, res) => {
  try {
    const stores = await getMyStores(req.user.id);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.storeRatings = async (req, res) => {
  try {
    const { store_id } = req.params;
    const ratings = await getStoreRatings(req.user.id, store_id);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { name, address, description } = req.body;
    const owner_id = req.user.id;
    const image = req.file?.filename || null; // optional image

    if (!name || !address) {
      return res.status(400).json({ error: "Name and address are required" });
    }

    const store = await addStore({ name, address, description, owner_id, image });
    res.status(201).json({ message: "Store added successfully", store });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
