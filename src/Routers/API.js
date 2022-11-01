const express = require("express");
const router = express.Router();
const LoadDataController = require("../Controllers/LoadDataController");

router.get("/LoadData/:pageNo", LoadDataController.DataList);

module.exports = router;
