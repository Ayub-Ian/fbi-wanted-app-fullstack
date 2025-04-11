const express = require("express");
const {
  getWanted,
  getWantedItem,
} = require("../controllers/wanted.controller");

const router = express.Router();
router.get("/wanted", getWanted);
router.get("/wanted/:id", getWantedItem);

module.exports = router;
