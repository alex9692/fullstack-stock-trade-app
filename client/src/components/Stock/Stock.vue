<template>
	<div>
		<b-row align-h="around" class="my-3">
			<b-col cols="5" class="mb-4" v-for="stock in stocks" :key="stock.name">
				<b-card header-text-variant="dark-green" header-bg-variant="light-green">
					<template v-slot:header>
						<h5 class="mb-0">
							{{stock.name}}
							<span style="font-size: 12px">(Price: {{stock.price}})</span>
						</h5>
					</template>
					<b-row>
						<b-col cols="5">
							<b-form-input placeholder="Quantity" type="number" v-model="quantity[stock.name]"></b-form-input>
						</b-col>
						<b-col cols="2" class="ml-auto">
							<b-button
								:disabled="quantity[stock.name] <= 0 || !Number.isInteger(+quantity[stock.name])"
								variant="light-green"
								class="font-weight-bold"
								@click="addToPortfolio(stock.name, stock.price)"
							>Buy</b-button>
						</b-col>
					</b-row>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	export default {
		props: ["stocks"],
		data() {
			return {
				quantity: {
					BMW: "",
					Google: "",
					Apple: "",
					Twitter: ""
				}
			};
		},
		methods: {
			addToPortfolio(stockName, stockPrice) {
				this.$store.dispatch("buyStock", {
					name: stockName,
					quantity: +this.quantity[stockName],
					price: stockPrice
				});
				this.quantity[stockName] = "";
			}
		}
	};
</script>

<style scoped>
	.bg-light-green {
		background-color: #d3e6c0;
	}
	.text-dark-green {
		color: #788f62;
	}
	.btn-light-green {
		color: #fff;
		background-color: #81c970;
		border-color: #81c970;
	}
</style>