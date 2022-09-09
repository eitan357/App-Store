const express = require("express");
const internetStoreBL = require("../BLs/internetStoreBL");

const router = express.Router();

let collection;
const setCollection = function (req, res, next) {
  if (req.originalUrl.includes("/api/customers"))
    collection = require("../models/customersModule");
  if (req.originalUrl.includes("/api/products"))
    collection = require("../models/productsModule");
  if (req.originalUrl.includes("/api/purchases"))
    collection = require("../models/purchasesModule");
  next();
};
router.use(setCollection);

//getAllData
router.get("/", async (req, res, next) => {
  let status = await internetStoreBL.getAllData(collection);
  return res.json(status);
});

//getOneData
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let status = await internetStoreBL.getOneData(collection, id);
  return res.json(status);
});

//createData
router.post("/", async (req, res, next) => {
  let obj = req.body;
  let status = await internetStoreBL.createData(collection, obj);
  return res.json(status);
});

//updateData
router.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let obj = req.body;
  let status = await internetStoreBL.updateData(collection, id, obj);
  return res.json(status);
});

//deleteData
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let deleteBy = req.body.deleteBy;
  let status = await internetStoreBL.deleteData(collection, id, deleteBy);
  return res.json(status);
});

module.exports = router;
