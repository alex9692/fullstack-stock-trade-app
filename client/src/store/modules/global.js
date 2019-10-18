import axios from "axios";

const state = {
	funds: 10000,
	error: {
		fundsError: { error: false, title: "", message: "", name: "fundsError" },
		saveError: { error: false, title: "", message: "", name: "saveError" },
		loadError: { error: false, title: "", message: "", name: "loadError" }
	}
};

const mutations = {
	CHECK_FUNDS: (state, payload) => {
		const spentFunds = payload.price * payload.quantity;
		if (spentFunds > state.funds) {
			state.error.fundsError.error = true;
			state.error.fundsError.title = "Not enough funds";
			state.error.fundsError.message =
				"You cannot spend more than what you own.";
		}
	},
	ADD_FUNDS: (state, payload) => {
		const addFunds = payload.quantity * payload.price;
		state.funds += addFunds;
	},
	DEDUCT_FUNDS: (state, { payload, fundsError }) => {
		if (fundsError) return;
		state.funds -= payload.price * payload.quantity;
	},
	LOAD_FUNDS: (state, payload) => {
		state.funds = payload;
	},
	RESET_ERROR: state => {
		state.error.fundsError.error = false;
		state.error.loadError.error = false;
		state.error.saveError.error = false;
	},
	LOAD_FAIL: (state, message) => {
		state.error.loadError.error = true;
		state.error.loadError.message = message;
		state.error.loadError.title = "Load fail";
	}
};

const actions = {
	saveStock: async context => {
		const payload = {
			stocks: context.rootState.stocks.stocks,
			boughtStocks: context.rootState.portfolio.boughtStocks,
			funds: context.rootState.global.funds
		};
		await axios.post("http://localhost:8000/api/v1/stocks", payload);
	},
	loadStock: async context => {
		try {
			const response = await axios.get("http://localhost:8000/api/v1/stocks");

			context.commit("LOAD_STOCKS_DATA", response.data.data.stocks);
			context.commit("LOAD_PORTFOLIO_DATA", response.data.data.boughtStocks);
			context.commit("LOAD_FUNDS", response.data.data.funds);
			context.commit("RESET_ERROR");
		} catch (err) {
			context.commit("LOAD_FAIL", err.response.data.message);
			setTimeout(() => {
				context.commit("RESET_ERROR");
			}, 5000);
		}
	}
};

const getters = {
	error: state => {
		return state.error;
	},
	fundsError: state => {
		return state.error.fundsError.error;
	},
	loadError: state => {
		return state.error.loadError.error;
	},
	funds: state => {
		return state.funds;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
