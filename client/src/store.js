import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const CONSTANT_PRICE = {
	BMW: 110,
	Google: 200,
	Apple: 250,
	Twitter: 8
};

export default new Vuex.Store({
	state: {
		funds: 10000,
		stocks: [
			{ name: "BMW", price: 110 },
			{ name: "Google", price: 200 },
			{ name: "Apple", price: 250 },
			{ name: "Twitter", price: 8 }
		],
		boughtStocks: [],
		error: {
			fundsError: { error: false, title: "", message: "", name: "funds" },
			saveError: { error: false, title: "", message: "", name: "save" },
			loadError: { error: false, title: "", message: "", name: "load" }
		}
	},
	mutations: {
		checkFunds: (state, payload) => {
			const findStock = state.stocks.find(el => el.name === payload.name);

			const spentFunds = findStock.price * payload.quantity;
			if (spentFunds > state.funds) {
				state.error.fundsError.error = true;
				state.error.fundsError.title = "Not enough funds";
				state.error.fundsError.message =
					"You cannot spend more than what you own.";
			}
		},
		addStock: (state, payload) => {
			if (state.error.fundsError.error) return;
			const findBoughtStocks = state.boughtStocks.find(
				stock => stock.name === payload.name
			);
			const findStock = state.stocks.find(stock => stock.name === payload.name);
			if (!findBoughtStocks) {
				state.boughtStocks.push({ ...payload, price: findStock.price });
			} else {
				findBoughtStocks.quantity += payload.quantity;
			}
		},
		deductFunds: (state, payload) => {
			if (state.error.fundsError.error) return;
			const findBoughtStock = state.boughtStocks.find(
				el => el.name === payload.name
			);
			state.funds -= findBoughtStock.price * payload.quantity;
		},
		endTheDay: state => {
			// const randomNo = Math.floor(Math.random() * (max - min + 1) + min);
			state.stocks.forEach(stock => {
				const findBoughtStock = state.boughtStocks.find(
					el => el.name === stock.name
				);
				let max = CONSTANT_PRICE[stock.name] + 50;
				let min = CONSTANT_PRICE[stock.name] - 50;
				if (stock.name === "Twitter") {
					max = CONSTANT_PRICE[stock.name] + 50;
					min = CONSTANT_PRICE[stock.name] - 5;
				}
				const randomNo = Math.floor(Math.random() * (max - min + 1) + min);
				stock.price = randomNo;
				if (stock.price <= 0) {
					stock.price = 1;
				}
				if (findBoughtStock) {
					findBoughtStock.price = stock.price;
				}
			});
		},
		addFunds: (state, payload) => {
			const findBoughtStock = state.boughtStocks.find(
				el => el.name === payload.name
			);
			if (findBoughtStock) {
				findBoughtStock.quantity -= payload.quantity;
			}
			if (findBoughtStock.quantity === 0) {
				state.boughtStocks = state.boughtStocks.filter(
					el => el.name !== findBoughtStock.name
				);
			}
			const refund = payload.quantity * findBoughtStock.price;
			state.funds += refund;
		},
		loadStockData: (state, payload) => {
			state.stocks = payload.stocks;
			state.boughtStocks = payload.boughtStocks;
			state.funds = payload.funds;
		},
		resetError: state => {
			state.error.fundsError.error = false;
			state.error.loadError.error = false;
			state.error.saveError.error = false;
		},
		loadSaveFail: (state, message) => {
			state.error.loadError.error = true;
			state.error.loadError.message = message;
			state.error.loadError.title = "Load fail";
		}
	},
	actions: {
		addStockToPortfolio: (context, payload) => {
			context.commit("checkFunds", payload);
			context.commit("addStock", payload);
			context.commit("deductFunds", payload);
			setTimeout(() => {
				context.commit("resetError");
			}, 4000);
		},
		endDay: context => {
			setTimeout(() => {
				context.commit("endTheDay");
			}, 1000);
		},
		sellStock: (context, payload) => {
			context.commit("addFunds", payload);
		},
		saveStock: async context => {
			await axios.post("http://localhost:8000/api/v1/stocks", {
				stocks: context.state.stocks,
				boughtStocks: context.state.boughtStocks,
				funds: context.state.funds
			});
		},
		loadStock: async context => {
			try {
				const response = await axios.get("http://localhost:8000/api/v1/stocks");

				context.commit("loadStockData", {
					boughtStocks: response.data.data.boughtStocks,
					stocks: response.data.data.stocks,
					funds: response.data.data.funds
				});
				context.commit("resetError");
			} catch (err) {
				context.commit("loadSaveFail", err.response.data.message);
				setTimeout(() => {
					context.commit("resetError");
				}, 4000);
			}
		}
	}
});
