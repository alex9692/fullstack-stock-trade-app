const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const stockRouter = require("./routes/stock-routes");

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/dist")));

app.use("/api/v1/stocks", stockRouter);

mongoose
	.connect("mongodb://localhost:27017/stock-trader-mini-app", {
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useNewUrlParser: true
	})
	.then(() => {
		console.log("db connected successfully");
	});

app.listen(8000, () => {
	console.log("running in port: 8000");
});
