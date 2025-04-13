const express = require("express");
const {
  getWantedList,
  getWantedItem,
} = require("../controllers/wanted.controller");

const router = express.Router();
router.get("/wanted", getWantedList);
router.get("/wanted/:id", getWantedItem);

module.exports = router;
