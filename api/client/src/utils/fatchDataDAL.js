import axios from "axios";

const url = "https://localhost:8080/api/";

const getAll = function (collection) {
  return axios.get(url + collection);
};

const getOne = function (collection, id) {
  return axios.get(url + collection + "/" + id);
};

const create = function (collection, obj) {
  return axios.post(url + collection, obj);
};

const update = function (collection, id, obj) {
  return axios.put(url + collection + "/" + id, obj);
};

const deleteItems = function (collection, id, deleteBy) {
  return axios.delete(url + collection + "/" + id, {
    data: { deleteBy: deleteBy },
  });
};

export { getAll, getOne, create, update, deleteItems };
