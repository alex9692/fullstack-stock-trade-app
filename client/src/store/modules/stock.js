import { stocks, CONSTANT_PRICE } from "../../data/stocks";

const state = {
	stocks: []
};

const mutations = {
	END_DAY: state => {
		state.stocks.forEach(stock => {
			let max = CONSTANT_PRICE[stock.name] * 2;
			let min = CONSTANT_PRICE[stock.name] / 2;
			stock.price = Math.floor(Math.random() * (max - min + 1) + min);
			if (stock.price <= 1) {
				stock.price = 2;
			}
		});
	},
	LOAD_STOCKS_DATA: (state, payload) => {
		state.stocks = payload;
	}
};
const actions = {
	setStock: context => {
		context.commit("LOAD_STOCKS_DATA", stocks);
	},
	endDay: context => {
		setTimeout(() => {
			context.commit("END_DAY");
		}, 1000);
	}
};
const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
};
