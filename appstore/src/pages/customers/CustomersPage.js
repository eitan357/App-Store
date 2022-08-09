import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../css/customers/CustomersPage.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getCustomersData } from "../../functions/implementDataComp";
import BuyProductComp from "./BuyProduct";

const CustomersPageComp = () => {
  const navigation = useNavigate();
  const storeData = useSelector((state) => state);
  const [pageData, setPageData] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [error, setError] = useState(false);

  //Organizes all the information to the page
  useEffect(() => {
    try {
      let setData = getCustomersData(
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

  //send data to BuyProduct to check if the path is erroneous
  let pathCheck = function (id, name) {
    setCustomerData({ id, name });
    let path = `/customers/buyProduct`;
    navigation(
      window.location.pathname.replaceAll("%20", " ") === `${path}/${name}`
        ? "/customers"
        : `${path}/${name}`
    );
  };

  let navigatToNewCustomer = function () {
    navigation(
      window.location.pathname === "/customers/addNewCustomer"
        ? "/customers"
        : "/customers/addNewCustomer"
    );
  };

  //check if ther is any customer
  if (error)
    return (
      <div>
        <h4>{error?.message ? error.message : "There is no Customers"}</h4>
        <h4 className={"customers-title"}>Customers page</h4>
        <div className={"customers-page"}>
          <div className={"new_customer"}>
            <button
              className={"btn-new_customer"}
              onClick={() => navigatToNewCustomer()}
            >
              Add new customer
            </button>
            <div className={"page-new_customer"}>
              {window.location.pathname === "/customers/addNewCustomer" && (
                <Outlet />
              )}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <h4 className={"customers-title"}>Customers page</h4>
      <div className={"customers-page"}>
        <div className={"new_customer"}>
          <button
            className={"btn-new_customer"}
            onClick={() => navigatToNewCustomer()}
          >
            Add new customer
          </button>
          <div className={"page-new_customer"}>
            {window.location.pathname === "/customers/addNewCustomer" && (
              <Outlet />
            )}
          </div>
        </div>
        <br />
        <div className={"customers-list"}>
          <table
            border={"1px"}
            className={"customers-table"}
            style={{ border: "none" }}
          >
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>City</th>
                <th>Purchases Products</th>
                <th>Quantity</th>
                <th>Purchases Date</th>
              </tr>
            </thead>
            {pageData.map((data) => {
              let customer = data.customer;
              let id = customer._id;
              let rowNum = data.productAndPurchase.length;
              let quantity = data.productAndPurchase[0]?.purchase.quantity;
              let fullName = `${customer.firstName} ${customer.lastName}`;
              return (
                <tbody key={id}>
                  <tr>
                    <th rowSpan={rowNum}>
                      <Link to={`editCustomer/${id}/${fullName}`}>
                        {fullName}
                      </Link>
                    </th>
                    <td rowSpan={rowNum}>{customer.city}</td>
                    <td>
                      <Link to={`/products/editProduct/${id}`}>
                        {data.productAndPurchase[0]?.product.name}
                      </Link>
                    </td>
                    <td>{quantity && `x${quantity}`}</td>
                    <td>{data.productAndPurchase[0]?.purchase.date}</td>
                    <td rowSpan={rowNum}>
                      <button onClick={() => pathCheck(id, fullName)}>
                        Buy broduct
                      </button>
                    </td>
                  </tr>
                  {data.productAndPurchase.map((products, index) => {
                    let product = products.product;
                    let purchase = products.purchase;
                    if (data.productAndPurchase[0] === products) return "";
                    return (
                      <tr key={index}>
                        <td>
                          <Link to={`/products/editProduct/${product._id}`}>
                            {product.name}
                          </Link>
                        </td>
                        <td>{`x${purchase.quantity}`}</td>
                        <td>{purchase.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
          </table>
          <div className={"buy-product"}>
            {window.location.pathname === "/customers/addNewCustomer" ||
              window.location.pathname === "/customers" || (
                <BuyProductComp customer={customerData} />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPageComp;
