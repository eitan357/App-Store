const express = require("express");
const cors = require("cors");

const customersRouter = require("./routers/customersRouter");
const productsRouter = require("./routers/productsRouter");
const purchasesRouter = require("./routers/purchasesRouter");

const app = express();
app.use(cors());
require("./config/internetShopDB");

app.use(express.json());

app.use("/api/customers", customersRouter);
app.use("/api/products", productsRouter);
app.use("/api/purchases", purchasesRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`API running`));
