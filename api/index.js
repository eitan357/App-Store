const express = require("express");
const cors = require("cors");

const router = require("./routers/router");

const app = express();
app.use(cors());
require("./config/internetShopDB");

app.use(express.json());

app.use("/api/customers", router);
app.use("/api/products", router);
app.use("/api/purchases", router);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API running`));
