import { deleteData, updateData } from "../utils/fatchDataBL";

const addData = function (state, action) {
  let collection = action.payload.collection;
  let obj = action.payload.data;
  return {
    ...state,
    [collection]: [...state[collection], obj],
  };
};

const updateState = function (state, action) {
  let collection = action.payload.collection;
  let obj = action.payload.data;
  let id = obj._id;

  updateData(collection, id, obj);

  let arr = state[collection];
  let index = arr.findIndex((customer) => customer._id === id);
  if (index >= 0) arr[index] = obj;
  return {
    ...state,
    [collection]: [...arr],
  };
};

const deleteState = function (state, action) {
  let collection = action.payload.collection;
  let id = action.payload.data._id;
  let arr = state[collection];

  let deleteBy = action.payload.deleteBy;
  deleteData(collection, id, deleteBy);

  if (collection === "customers" || collection === "products") {
    let index = arr.findIndex((customer) => customer._id === id);
    if (index >= 0) arr.splice(index, 1);
  }
  if (collection === "purchases")
    arr = arr.filter((data) => data[deleteBy] !== id);

  return { ...state, [collection]: [...arr] };
};

const reducer = function (
  state = {
    customers: [],
    products: [],
    purchases: [],
  },
  action
) {
  switch (action.type) {
    case "UPLOAD_DATA":
      return action.payload;

    case "ADD":
      return addData(state, action);

    case "UPDATE":
      return updateState(state, action);

    case "DELETE":
      return deleteState(state, action);

    default:
      return state;
  }
};

export default reducer;
