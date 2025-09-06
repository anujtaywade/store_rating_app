const express = require("express");
const multer = require("multer");
const { auth, roleCheck } = require("../middleware/auth");
const { myStores, storeRatings, addStore } = require("../controllers/ownerController");

const router = express.Router();


const upload = multer({ dest: "uploads/" });


router.use(auth, roleCheck("owner"));

router.get("/stores", myStores);
router.get("/stores/:store_id/ratings", storeRatings);


router.post("/stores/add", upload.single("image"), addStore);

module.exports = router;
