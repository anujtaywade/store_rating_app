const express = require("express");
const { auth, roleCheck } = require("../middleware/auth");
const { myStores, storeRatings } = require("../controllers/ownerController");

const router = express.Router();

router.use(auth, roleCheck("owner"));

router.get("/stores", myStores);
router.get("/stores/:store_id/ratings", storeRatings);

module.exports = router;
