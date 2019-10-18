<template>
	<div class="mt-5 mb-4">
		<b-navbar toggleable="lg" type="light" variant="light-gray">
			<b-navbar-brand to="/" active-class="active">Stock Tracker</b-navbar-brand>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item to="/portfolio" active-class="active">Portfolio</b-nav-item>
					<b-nav-item to="/stocks" active-class="active">Stocks</b-nav-item>
				</b-navbar-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item class="mr-2" @click="endDay">End Day</b-nav-item>
					<b-nav-item-dropdown class="mx-3" text="Save/Load" right>
						<b-dropdown-item @click="saveStockData">Save</b-dropdown-item>
						<b-dropdown-item @click="loadStockData">Load</b-dropdown-item>
					</b-nav-item-dropdown>
					<b-nav-text class="ml-2">Funds: {{ funds | currency }}</b-nav-text>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		methods: {
			endDay() {
				this.$store.dispatch("endDay");
			},
			saveStockData() {
				this.$store.dispatch("saveStock");
			},
			loadStockData() {
				this.$store.dispatch("loadStock");
			}
		},
		computed: {
			...mapGetters(["funds"])
		}
	};
</script>

<style scoped>
	.bg-light-gray {
		background-color: #e8ecf0;
	}
</style>