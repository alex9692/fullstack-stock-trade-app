<template>
	<app-portfolio-stock :stocks="portfolioStocks"></app-portfolio-stock>
</template>

<script>
	import PortfolioStock from "../components/Portfolio/Stock";
	import { mapGetters } from "vuex";
	export default {
		components: {
			"app-portfolio-stock": PortfolioStock
		},
		computed: {
			...mapGetters(["portfolioStocks"])
		}
	};
</script>
