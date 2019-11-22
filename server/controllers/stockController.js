const Stock = require("../models/stock-model");

exports.loadStockData = async (req, res, next) => {
	try {
		const stock = await Stock.find();
		if (stock.length == 0) {
			throw new Error("Sorry, no stock data available!");
		}
		const latestStock = stock[stock.length - 1];
		res.status(200).json({
			status: "success",
			data: {
				stocks: latestStock["stocks"],
				boughtStocks: latestStock["boughtStocks"],
				funds: latestStock["funds"]
			}
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			message: error.message
		});
	}
};

exports.saveStockData = async (req, res, next) => {
	try {
		const stock = await Stock.create(req.body);

		res.status(200).json({
			status: "success",
			data: {
				stock
			}
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			message: "Something went wrong!!"
		});
	}
};
