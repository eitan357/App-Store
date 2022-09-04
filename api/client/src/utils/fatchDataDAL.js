import axios from "axios";

//to Heroku url (didnt work with create function):
//`https://apireactproject2022.herokuapp.com/api/${collection}`

const getAll = function (collection) {
  return axios.get(`https://eitan-app-store.herokuapp.com/${collection}`);
};

const getOne = function (collection, id) {
  return axios.get(`https://eitan-app-store.herokuapp.com/${collection}/` + id);
};

const create = function (collection, obj) {
  return axios.post(`https://eitan-app-store.herokuapp.com/${collection}`, obj);
};

const update = function (collection, id, obj) {
  return axios.put(
    `https://eitan-app-store.herokuapp.com/${collection}/` + id,
    obj
  );
};

const deleteItems = function (collection, id, deleteBy) {
  return axios.delete(
    `https://eitan-app-store.herokuapp.com/${collection}/` + id,
    {
      data: { deleteBy: deleteBy },
    }
  );
};

export { getAll, getOne, create, update, deleteItems };
