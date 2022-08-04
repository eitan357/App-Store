const { json } = require("express");
const express = require("express");
const internetStoreBL = require("../BLs/internetStoreBL");
const purchasesModule = require("../models/purchasesModule");
const router = express.Router();

//getAllData
router.get("/", async (req, res, next) => {
  let status = await internetStoreBL.getAllData(purchasesModule);
  return res.json(status);
});

//getOneData
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let status = await internetStoreBL.getOneData(purchasesModule, id);
  return res.json(status);
});

//createData
router.post("/", async (req, res, next) => {
  let obj = req.body;
  let status = await internetStoreBL.createData(purchasesModule, obj);
  return res.json(status);
});

//updateData
router.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let obj = req.body;
  let status = await internetStoreBL.updateData(purchasesModule, id, obj);
  return res.json(status);
});

//deleteData
router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let deleteBy = req.body.deleteBy;
  let status = await internetStoreBL.deleteData(purchasesModule, id, deleteBy);
  return res.json(status);
});

module.exports = router;
