import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

Vue.config.productionTip = false;
Vue.filter("currency", val => {
	return "$" + val.toLocaleString();
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
