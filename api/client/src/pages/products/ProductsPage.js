import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getProductsData } from "../../functions/implementDataComp";
import "../../css/products/ProductsPage.css";
import AddCustomerComp from "./AddCustomer";

const ProductsPageComp = () => {
  const storeData = useSelector((state) => state);
  const navigation = useNavigate();

  const [pageData, setPageData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      let setData = getProductsData(
        storeData.customers,
        storeData.products,
        storeData.purchases
      );
      setPageData(setData);
      setError(setData.length === 0 ? true : false);
    } catch (e) {
      setError(e);
    }
  }, [storeData]);

  let calculateOneProduct = function (data) {
    return (
      data.length > 0 &&
      data.reduce(
        (acc, purchase) =>
          acc +
          purchase.purchases.reduce(
            (acc, purchase) => acc + purchase.quantity,
            0
          ),
        0
      )
    );
  };

  let calculateAllPurchases = function () {
    return (
      pageData.length > 0 &&
      pageData
        .map((data) =>
          data.customerAndPurchase.reduce(
            (acc, purchase) =>
              acc +
              purchase.purchases.reduce(
                (acc, purchase) => acc + purchase.quantity,
                0
              ),
            0
          )
        )
        .reduce((acc, num) => acc + num, 0)
    );
  };

  //send data to BuyProduct to check if the path is erroneous
  let pathCheck = function (name) {
    let path =
      window.location.pathname.replaceAll("%20", " ") === `/products/${name}`
        ? "/products"
        : `/products/${name}`;
    navigation(path);
  };

  let navigatToNewProduct = function () {
    let path =
      window.location.pathname === "/products/addNewProduct"
        ? "/products"
        : "/products/addNewProduct";
    navigation(path);
  };

  if (error)
    return (
      <div>
        <h4>{error?.message ? error.message : "There is no Product"}</h4>
        <h4 className={"products-title"}>Products page</h4>
        <div className={"products-page"}>
          <div className="new_product">
            <button
              className={"btn-new_product"}
              onClick={() => navigatToNewProduct()}
            >
              Add new product
            </button>
            <div className={"page-new_product"}>
              {window.location.pathname === "/products/addNewProduct" && (
                <Outlet />
              )}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <h4 className={"products-title"}>Products page</h4>
      <div className={"products-page"}>
        <div className="new_product">
          <button
            className={"btn-new_product"}
            onClick={() => navigatToNewProduct()}
          >
            Add new product
          </button>
          <div className={"page-new_product"}>
            {window.location.pathname === "/products/addNewProduct" && (
              <Outlet />
            )}
          </div>
        </div>
        <div className={"product-list"}>
          <p className={"calculation"}>
            {pageData.length > 0 && (
              <b>Calculation of all products sold: {calculateAllPurchases()}</b>
            )}
          </p>
          {pageData.map((data) => {
            let product = data.product;
            let id = product._id;
            let name = product.name;
            let calculate = calculateOneProduct(data.customerAndPurchase);
            return (
              <div className={"product"} key={id}>
                <dl>
                  <ul>
                    <dt>
                      <Link to={`editProduct/${id}/${name}`}>
                        <b>{name}</b>
                      </Link>
                    </dt>
                    {calculate && (
                      <dd>
                        <b style={{ color: "green" }}>
                          Calculation of all {name}s sold: {calculate}
                        </b>
                      </dd>
                    )}
                    <dd>Price: {product.price}</dd>
                    <dd>Quantity: {product.quantity}</dd>
                    <ul style={{ listStyle: "none" }}>
                      <dt>Buyers:</dt>
                      {data.customerAndPurchase.map((customers) => {
                        let customer = customers.customer;
                        let fullName = `${customer.firstName} ${customer.lastName}`;
                        return (
                          <ul key={customer._id}>
                            <li style={{ listStyle: "none" }}>
                              Name:{" "}
                              <Link
                                to={`/customers/editCustomer/${customer._id}/${fullName}`}
                              >
                                {fullName}
                              </Link>
                            </li>

                            {customers.purchases.map((purchase, index) => {
                              return (
                                <li key={index}>
                                  {`Date: ${purchase.date}. Quantity: ${purchase.quantity}.`}
                                </li>
                              );
                            })}
                          </ul>
                        );
                      })}
                      <dd>
                        <button
                          className={"btn-addCustomer"}
                          onClick={() => pathCheck(name)}
                        >
                          Add Customer
                        </button>
                      </dd>
                      <dd>
                        {window.location.pathname.replaceAll("%20", " ") ===
                          `/products/${name}` && (
                          <AddCustomerComp product={{ id, name }} />
                        )}
                      </dd>
                    </ul>
                  </ul>
                </dl>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsPageComp;
