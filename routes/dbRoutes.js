const express = require("express");
const { create, getAll, update, remove } = require("../controllers/dbControllers");

const router = express.Router();

router.post("/create", create);
router.get("/all", getAll);
router.put("/update", update);
router.delete("/delete", remove);

module.exports = router