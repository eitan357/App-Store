import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../css/products/NewProduct.css";
import { addProductFun, emptyValue } from "../../functions/changeDataInComp";
import { createData } from "../../utils/fatchDataBL";

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  let changeProduct = function (e) {
    e.preventDefault();
    let value = e.target.value;
    console.log(value);
    let name = e.target.name;
    let upperCase =
      value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
    let changedValue = name === "name" ? upperCase : Number(value);
    setProduct({ ...product, [name]: changedValue });
  };

  let addProduct = async function (e) {
    e.preventDefault();
    let productData = product;
    if (emptyValue(productData)) return;
    setProduct({
      name: "",
      price: "",
      quantity: "",
    });
    let _id = await createData("products", productData);
    let obj = { ...productData, _id };
    addProductFun(e, dispatch, obj);
  };

  return (
    <div className={"new-product"}>
      <h4 className={"product-title"}>Add new product</h4>
      <button
        className="close-buying-product"
        onClick={() => navigation("/products")}
      >
        &times;
      </button>
      <form className={"form-new-product"}>
        Name:{" "}
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={(e) => changeProduct(e)}
        />
        <br />
        Price:{" "}
        <input
          type="number"
          name="price"
          min={0}
          value={product.price}
          onChange={(e) => changeProduct(e)}
        />
        <br />
        Quantity:{" "}
        <input
          type="number"
          name="quantity"
          min={0}
          value={product.quantity}
          onChange={(e) => changeProduct(e)}
        />
        <br />
        <button className={"btn-new-product"} onClick={(e) => addProduct(e)}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
