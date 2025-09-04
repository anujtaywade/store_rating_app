const express = require("express");
const { dashboard, listUsers, listStores, createUser, createStore } = require("../controllers/adminController");
const { auth, roleCheck } = require("../middleware/auth");

const router = express.Router();

router.use(auth, roleCheck("admin"));

router.get("/dashboard", dashboard);
router.get("/users", listUsers);
router.get("/stores", listStores);
router.post("/users", createUser);
router.post("/stores", createStore);

module.exports = router;
