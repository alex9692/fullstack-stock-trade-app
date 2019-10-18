const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema(
	{
		stocks: {
			type: Array,
			required: true
		},
		boughtStocks: {
			type: Array,
			required: true
		},
		funds: {
			type: Number,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Stocks", stockSchema);
