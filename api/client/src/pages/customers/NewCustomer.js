import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../css/customers/NewCustomer.css";
import { addCustomerFun, emptyValue } from "../../functions/changeDataInComp";
import { createData } from "../../utils/fatchDataBL";

const AddnewCustomer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    city: "",
  });

  let changeCustomer = function (e) {
    e.preventDefault();
    let obj = e.target.value.trim();
    let upperCase = obj.charAt(0).toUpperCase() + obj.slice(1);
    setCustomer({ ...customer, [e.target.name]: upperCase });
  };

  let chackName = function () {
    // validate dupliction antry
  };

  let addCustomer = async function (e) {
    e.preventDefault();
    let customerData = customer;
    if (emptyValue(customer)) return;
    setCustomer({
      firstName: "",
      lastName: "",
      city: "",
    });
    let _id = await createData("customers", customerData);
    let obj = { ...customerData, _id };
    addCustomerFun(e, dispatch, obj);
  };

  return (
    <div className={"new-customer"}>
      <h4 className={"customer-title"}>Add new customer</h4>
      <button
        className="close-buying-customer"
        onClick={() => navigation("/customers")}
      >
        &times;
      </button>
      <form className={"form-new-customer"}>
        First Name:{" "}
        <input
          type="text"
          name="firstName"
          value={customer.firstName}
          onChange={(e) => changeCustomer(e)}
        />
        <br />
        last Name:{" "}
        <input
          type="text"
          name="lastName"
          value={customer.lastName}
          onChange={(e) => changeCustomer(e)}
        />
        <br />
        City:{" "}
        <input
          type="text"
          name="city"
          value={customer.city}
          onChange={(e) => changeCustomer(e)}
        />
        <br />
        <button className={"btn-new-customer"} onClick={(e) => addCustomer(e)}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddnewCustomer;
