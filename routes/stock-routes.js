const express = require("express");
const router = express.Router();

const stockController = require("../controllers/stockController");

router
	.route("/")
	.get(stockController.loadStockData)
	.post(stockController.saveStockData);

module.exports = router;
