const { getStores, rateStore } = require("../models/userAppModel");

exports.viewStores = async (req, res) => {
  try {
    const stores = await getStores();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.giveRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    if (!store_id || !rating) {
      return res.status(400).json({ error: "store_id and rating required" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const result = await rateStore({
      user_id: req.user.id,
      store_id,
      rating,
    });

    res.status(201).json({ message: "Rating submitted successfully", rating: result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
