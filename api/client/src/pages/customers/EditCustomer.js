import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../css/customers/EditCustomer.css";
import { getEditCustomerData } from "../../functions/implementDataComp";
import {
  deleteCustomerFun,
  deletePurchaseFun,
  emptyValue,
  updateCustomerFun,
} from "../../functions/changeDataInComp";

const EditCustomerComp = () => {
  const storeData = useSelector((state) => state);
  const params = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [pageData, setPageData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      let data = getEditCustomerData(
        params.id,
        storeData.customers,
        storeData.products,
        storeData.purchases
      );
      setPageData(data);

      //check if the name in use
      let fullName = `${data?.customer?.firstName} ${data?.customer?.lastName}`;
      setError(fullName !== params.name ? true : false);
    } catch (e) {
      setError(true);
    }
  }, [storeData, params]);

  let changeData = function (e, data) {
    e.preventDefault();
    let obj = e.target.value.trim();
    let upperCase = obj.charAt(0).toUpperCase() + obj.slice(1);
    setPageData({
      ...pageData,
      customer: { ...pageData.customer, [data]: upperCase },
    });
  };

  // change data in state
  let updateCustomer = function (e) {
    let customer = pageData.customer;
    if (emptyValue(customer)) return;
    updateCustomerFun(e, dispatch, customer);
    navigation(
      `/customers/editCustomer/${customer._id}/${customer.firstName} ${customer.lastName}`
    );
  };

  let deleteCustomer = function (e) {
    let customer = pageData.customer;
    if (emptyValue(customer)) return;
    deletePurchaseFun(e, dispatch, customer, "customerId");
    deleteCustomerFun(e, dispatch, customer);
    navigation("/customers");
  };

  //check if the customer exist
  if (error) return <h4>The Customer doesn't exist in the system⛔</h4>;

  return (
    <div>
      <div className={"top-file-customer"}>
        <h4 className={"edit-customer-title"}>Editing of '{params.name}'</h4>
        <button
          className={"back-to-customers-btn"}
          onClick={() => navigation("/customers")}
        >
          &#8701;Back
        </button>
      </div>
      <div className={"edit-customer"}>
        <form>
          First Name:{" "}
          <input
            type="text"
            value={pageData?.customer?.firstName || ""}
            onChange={(e) => changeData(e, "firstName")}
          />
          <br />
          Last Name:{" "}
          <input
            type="text"
            value={pageData?.customer?.lastName || ""}
            onChange={(e) => changeData(e, "lastName")}
          />
          <br />
          City:{" "}
          <input
            type="text"
            value={pageData?.customer?.city || ""}
            onChange={(e) => changeData(e, "city")}
          />
          <br />
          <button className={"btn"} onClick={(e) => deleteCustomer(e)}>
            Delete Customer
          </button>
          <button className={"btn"} onClick={(e) => updateCustomer(e)}>
            Update Customer
          </button>
        </form>
        <br />
        <b> customer's Products:</b>
        <br />
        <table border={"1px"} style={{ border: "none" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {pageData?.productAndPurchase?.map((products) => {
              let product = products.product;
              let purchase = products.purchase;
              return (
                <tr key={purchase._id}>
                  <td>
                    <Link
                      to={`/products/editProduct/${product._id}/${product.name}`}
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td>{purchase.quantity}</td>
                  <td>
                    <button
                      onClick={(e) => deletePurchaseFun(e, dispatch, purchase)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditCustomerComp;
