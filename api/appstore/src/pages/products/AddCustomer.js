import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/products/AddCustomer.css";
import {
  addPurchaseFun,
  updateProductFun,
} from "../../functions/changeDataInComp";
import { createData } from "../../utils/fatchDataBL";

const AddCustomerComp = (props) => {
  const navigation = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);

  const [customerId, setCustomerId] = useState("");
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProduct(
      storeData.products.find((prdouct) => prdouct._id === props.product.id)
    );
  }, [props]);

  //add customer to the list
  let addCustomer = async function (e) {
    //check the quantity
    if (customerId === "") return alert("You need choose customer");
    if (product.quantity === 0) return alert("The Product is not in stock");
    if (product.quantity < quantity)
      return alert(`The requested quantity of products is not available.
    Choose a smaller number then ${quantity} `);

    //add the data
    let changeQuantity = {
      ...product,
      quantity: product.quantity - quantity,
    };
    let obj = {
      customerId,
      productId: props.product.id,
      date: new Date(),
      quantity,
    };
    setQuantity(1);
    setCustomerId(0);
    let _id = await createData("purchases", obj);
    addPurchaseFun(e, dispatch, { ...obj, _id });
    updateProductFun(e, dispatch, changeQuantity);
  };

  return (
    <div className="add-customer">
      <button
        className="close-add-customer"
        onClick={() => navigation("/products")}
      >
        &times;
      </button>
      <br />
      Customer:{" "}
      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      >
        <option>{""}</option>
        {storeData.customers.map((customer) => (
          <option
            key={customer._id}
            value={customer._id}
          >{`${customer.firstName} ${customer.lastName}`}</option>
        ))}
      </select>
      <br />
      Product quantity:{" "}
      <input
        type="number"
        max={10}
        min={1}
        value={quantity || ""}
        onChange={(e) => setQuantity(+e.target.value)}
      />
      <br />
      <button className={"add-btn"} onClick={(e) => addCustomer(e)}>
        Add
      </button>
    </div>
  );
};

export default AddCustomerComp;
