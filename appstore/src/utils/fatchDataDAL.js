import axios from "axios";

//to Heroku url (didnt work with create function):
//`https://apireactproject2022.herokuapp.com/api/${collection}`

const getAll = function (collection) {
  return axios.get(`http://localhost:8080/api/${collection}`);
};

const getOne = function (collection, id) {
  return axios.get(`http://localhost:8080/api/${collection}/` + id);
};

const create = function (collection, obj) {
  return axios.post(`http://localhost:8080/api/${collection}`, obj);
};

const update = function (collection, id, obj) {
  return axios.put(`http://localhost:8080/api/${collection}/` + id, obj);
};

const deleteItems = function (collection, id, deleteBy) {
  return axios.delete(`http://localhost:8080/api/${collection}/` + id, {
    data: { deleteBy: deleteBy },
  });
};

export { getAll, getOne, create, update, deleteItems };
