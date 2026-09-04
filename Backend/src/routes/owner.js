const express = require("express");
const { auth, roleCheck } = require("../middleware/auth");
const { myStores, storeRatings, addStore } = require("../controllers/ownerController");
const upload = require("../middleware/upload");

const router = express.Router();

router.use(auth, roleCheck("owner"));

router.get("/stores", myStores);
router.get("/stores/:store_id/ratings", storeRatings);


router.post("/stores/add", upload.single("image"), addStore);

module.exports = router;
