const { getMyStores, getStoreRatings } = require("../models/ownerModel");

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
