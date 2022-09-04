//require data
let emptyValue = function (data) {
  //check if all the field full
  if (Object.values(data).includes("")) {
    alert("You need to fill all the fields");
    return true;
  }
  return false;
};

//implement customers
let updateCustomerFun = function (e, dispatch, data) {
  e.preventDefault();
  dispatch({
    type: "UPDATE",
    payload: { collection: "customers", data },
  });
};
let addCustomerFun = function (e, dispatch, data) {
  e.preventDefault();
  dispatch({
    type: "ADD",
    payload: { collection: "customers", data },
  });
};
let deleteCustomerFun = function (e, dispatch, data, deleteBy = "_id") {
  e.preventDefault();
  dispatch({
    type: "DELETE",
    payload: { collection: "customers", data, deleteBy },
  });
};

//implement products
let updateProductFun = function (e, dispatch, data) {
  e.preventDefault();
  dispatch({
    type: "UPDATE",
    payload: { collection: "products", data },
  });
};
let addProductFun = function (e, dispatch, data) {
  e.preventDefault();
  dispatch({
    type: "ADD",
    payload: { collection: "products", data },
  });
};
let deleteProductFun = function (e, dispatch, data, deleteBy = "_id") {
  e.preventDefault();
  dispatch({
    type: "DELETE",
    payload: { collection: "products", data, deleteBy },
  });
};

//implemet purchases
let updatePurchaseFun = function (e, dispatch, data) {
  e.preventDefault();
  dispatch({
    type: "UPDATE",
    payload: { collection: "purchases", data },
  });
};

let addPurchaseFun = function (e, dispatch, data) {
  e.preventDefault();
  dispatch({
    type: "ADD",
    payload: { collection: "purchases", data },
  });
};

let deletePurchaseFun = function (e, dispatch, data, deleteBy = "_id") {
  e.preventDefault();
  dispatch({
    type: "DELETE",
    payload: { collection: "purchases", data, deleteBy },
  });
};

export {
  emptyValue,
  updateCustomerFun,
  addCustomerFun,
  deleteCustomerFun,
  updateProductFun,
  addProductFun,
  deleteProductFun,
  updatePurchaseFun,
  addPurchaseFun,
  deletePurchaseFun,
};
