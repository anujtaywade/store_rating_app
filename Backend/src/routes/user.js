const express = require("express");
const { auth, roleCheck } = require("../middleware/auth");
const { viewStores, giveRating } = require("../controllers/userController");

const router = express.Router();

router.get("/stores", auth, roleCheck("user", "owner", "admin"), viewStores);
router.post("/rate", auth, roleCheck("user", "owner"), giveRating);

module.exports = router;
