import Vue from "vue";
import Vuex from "vuex";

import stocks from "./modules/stock";
import global from "./modules/global";
import portfolio from "./modules/portfolio";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		global,
		stocks,
		portfolio
	}
});
