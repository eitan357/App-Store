import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../css/products/EditProduct.css";
import { getEditProductData } from "../../functions/implementDataComp";
import {
  deleteProductFun,
  deletePurchaseFun,
  emptyValue,
  updateProductFun,
} from "../../functions/changeDataInComp";

const EditProductComp = () => {
  const storeData = useSelector((state) => state);
  const params = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [pageData, setPageData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      let data = getEditProductData(
        params.id,
        storeData.customers,
        storeData.products,
        storeData.purchases
      );
      setPageData(data);

      //check if the name in use
      setError(data.product.name !== params.name ? true : false);
    } catch (e) {
      setError(true);
    }
  }, [storeData, params]);

  let changeData = function (e, data) {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    let upperCase =
      value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
    let changedValue = name === "name" ? upperCase : Number(value);
    setPageData({
      ...pageData,
      product: { ...pageData.product, [data]: changedValue },
    });
  };
  // change data in state
  let updateProduct = function (e) {
    let product = pageData.product;
    if (emptyValue(product)) return;
    updateProductFun(e, dispatch, product);
    navigation(`/products/editProduct/${product._id}/${product.name}`);
  };
  let deleteProduct = function (e) {
    let product = pageData.product;
    if (emptyValue(product)) return;
    deletePurchaseFun(e, dispatch, product, "productId");
    deleteProductFun(e, dispatch, product);
    navigation("/products");
  };

  //check if the customer exist
  if (error) return <h4>The Customer doesn't exist in the system⛔</h4>;

  return (
    <div>
      <div className={"top-file-product"}>
        <h4 className={"edit-product-title"}>Edit product - {params.name}</h4>
        <button
          className={"back-to-procducts-btn"}
          onClick={() => navigation("/products")}
        >
          &#8701;Back
        </button>
      </div>
      <div className={"edit-product"}>
        <form>
          Name:{" "}
          <input
            type="text"
            value={pageData?.product?.name || ""}
            name={"name"}
            onChange={(e) => changeData(e, "name")}
          />
          <br />
          Price:{" "}
          <input
            type="number"
            value={pageData?.product?.price || 0}
            min={0}
            name={"price"}
            onChange={(e) => changeData(e, "price")}
          />
          <br />
          Quantity:{" "}
          <input
            type="number"
            value={pageData?.product?.quantity || 0}
            min={0}
            name={"quantity"}
            onChange={(e) => changeData(e, "quantity")}
          />
          <br />
          <button className={"btn"} onClick={(e) => deleteProduct(e)}>
            Delete Product
          </button>
          <button className={"btn"} onClick={(e) => updateProduct(e)}>
            Update Product
          </button>
        </form>
        <br />
        <b>Product's buyers:</b>
        <br />
        <table border={"1px"} style={{ border: "none" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Quantity</th>
            </tr>
          </thead>
          {pageData?.customerAndPurchase?.map((customers) => {
            let customer = customers.customer;
            let fullName = `${customer.firstName} ${customer.lastName}`;
            let purchases = customers.purchases;
            let rowNum = purchases.length;
            return (
              <tbody key={customer._id}>
                <tr>
                  <td rowSpan={rowNum}>
                    <Link
                      to={`/customers/editCustomer/${customer._id}/${fullName}`}
                    >
                      {fullName}
                    </Link>
                  </td>
                  <td>{purchases[0].date}</td>
                  <td>{purchases[0].quantity}</td>
                  <td>
                    <button
                      onClick={(e) =>
                        deletePurchaseFun(e, dispatch, purchases[0])
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
                {purchases.map((purchase) => {
                  if (purchase._id === purchases[0]._id) return "";
                  return (
                    <tr key={purchase._id}>
                      <td>{purchase.date}</td>
                      <td>{purchase.quantity}</td>
                      <td>
                        <button
                          onClick={(e) =>
                            deletePurchaseFun(e, dispatch, purchase)
                          }
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default EditProductComp;
