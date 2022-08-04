import { create, deleteItems, getAll, getOne, update } from "./fatchDataDAL";

let error = function (e) {
  return `No connection to the server, please try again later. ${e}`;
};

const getAllData = async function (collection) {
  try {
    let req = await getAll(collection);
    return req.data;
  } catch (e) {
    error(e);
  }
};

const getOneData = async function (collection, id) {
  try {
    let req = await getOne(collection, id);
    return req.data;
  } catch (e) {
    error(e);
  }
};

const createData = async function (collection, obj) {
  try {
    let req = await create(collection, obj);
    return req.data;
  } catch (e) {
    error(e);
  }
};

const updateData = async function (collection, id, obj) {
  try {
    let req = await update(collection, id, obj);
    return req.data;
  } catch (e) {
    error(e);
  }
};

const deleteData = async function (collection, id, deleteBy) {
  try {
    let req = await deleteItems(collection, id, deleteBy);
    return req.data;
  } catch (e) {
    error(e);
  }
};

export { getAllData, getOneData, createData, updateData, deleteData };
