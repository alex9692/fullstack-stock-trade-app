const state = {
	boughtStocks: []
};

const mutations = {
	BUY_STOCK: (state, { payload, fundsError }) => {
		if (fundsError) return;
		const findBoughtStocks = state.boughtStocks.find(
			stock => stock.name === payload.name
		);

		if (!findBoughtStocks) {
			state.boughtStocks.push({
				name: payload.name,
				quantity: payload.quantity
			});
		} else {
			findBoughtStocks.quantity += payload.quantity;
		}
	},
	SELL_STOCK: (state, payload) => {
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
	},
	LOAD_PORTFOLIO_DATA: (state, payload) => {
		state.boughtStocks = payload;
	}
};

const actions = {
	buyStock: (context, payload) => {
		context.commit("CHECK_FUNDS", payload);
		const fundsError = context.rootState.global.error.fundsError.error;
		context.commit("BUY_STOCK", { payload, fundsError });
		context.commit("DEDUCT_FUNDS", { payload, fundsError });
		setTimeout(() => {
			context.commit("RESET_ERROR");
		}, 5000);
	},
	sellStock: (context, payload) => {
		context.commit("SELL_STOCK", payload);
		context.commit("ADD_FUNDS", payload);
	}
};

const getters = {
	portfolioStocks: (state, getters, rootState) => {
		if (state.boughtStocks.length == 0) {
			return [];
		}
		return state.boughtStocks.map(stock => {
			const findStock = rootState.stocks.stocks.find(
				el => el.name === stock.name
			);
			return {
				...stock,
				price: findStock.price
			};
		});
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
