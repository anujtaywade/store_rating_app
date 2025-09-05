const express = require("express");
const { createStore } = require("../controllers/adminController");
const multer = require("multer");
const { auth, roleCheck } = require("../middleware/auth");
const { myStores, storeRatings } = require("../controllers/ownerController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.use(auth, roleCheck("owner"));

router.get("/stores", myStores);
router.get("/stores/:store_id/ratings", storeRatings);
router.post("/stores/add", auth, roleCheck("owner"), upload.single("image"), createStore);

module.exports = router;
