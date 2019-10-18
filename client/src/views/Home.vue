<template>
	<div class="mt-2">
		<b-card class="pt-4 pb-2 px-2" border-variant="light-gray">
			<h1 class="mt-1 mb-1 display-4 font-weight-normal">Trade or View your Portfolio</h1>
			<p class="mb-1">You may save & Load your Data</p>
			<p>Click on 'End Day' to begin a new Day!</p>
			<hr />
			<h3>Your Funds: {{ funds | currency }}</h3>
		</b-card>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		computed: {
			...mapGetters(["funds"])
		}
	};
</script>


<style scoped>
	.bg-light-gray {
		background-color: #dee2e6;
	}
</style>