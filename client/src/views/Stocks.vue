<template>
	<app-stock :stocks="stocks.stocks"></app-stock>
</template>

<script>
	import Stock from "../components/Stock/Stock";
	import { mapState } from "vuex";
	export default {
		components: {
			"app-stock": Stock
		},
		computed: {
			...mapState(["stocks"])
		}
	};
</script>
