const express = require("express");
const multer = require("multer");
const { auth, roleCheck } = require("../middleware/auth");
const { myStores, storeRatings, addStore } = require("../controllers/ownerController");

const router = express.Router();

// Multer setup (saves in /uploads with random names)
const upload = multer({ dest: "uploads/" });

// ✅ protect all routes for owners
router.use(auth, roleCheck("owner"));

router.get("/stores", myStores);
router.get("/stores/:store_id/ratings", storeRatings);

// ✅ owner adds store (NOT adminController)
router.post("/stores/add", upload.single("image"), addStore);

module.exports = router;
