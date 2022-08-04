import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/PurchasesPage.css";
import {
  getPurchasesData,
  searchPurchases,
} from "../functions/implementDataComp";

const PurchasesPageComp = () => {
  const storeData = useSelector((state) => state);
  const [dataFromState, setDataFromState] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [search, setSearch] = useState({
    customer: "",
    product: "",
    date: "",
  });
  const [error, setError] = useState(false);
  useEffect(() => {
    try {
      setDataFromState(
        getPurchasesData(
          storeData.customers,
          storeData.products,
          storeData.purchases
        )
      );
      setError(storeData.purchases.length === 0 ? true : false);
    } catch (e) {
      setError(e);
    }
  }, [storeData]);

  let changeSearch = function (e) {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    let upperCase = value.charAt(0).toUpperCase() + value.slice(1);
    let changedValue = name === "date" ? value : upperCase;
    setSearch({ ...search, [name]: changedValue });
  };

  //check if ther is any purchase

  if (error)
    return <h4>{error?.message ? error.message : "There is no Purchases"}</h4>;

  return (
    <div>
      <h4 className={"purchases-page-title"}>Purchases page</h4>
      <h4 className={"search-title"}>Search:</h4>
      <div className={"purchases-page"}>
        <form className={"form-purchases-page"}>
          <p>
            <b className={"title-search"}>Customer Name:</b>
            <input
              type="text"
              className={"input-search"}
              name={"customer"}
              placeholder={"Enter first and last name"}
              value={search.customer}
              onChange={(e) => changeSearch(e)}
            />
          </p>
          <p>
            <b className={"title-search"}>Product Name:</b>
            <input
              type="text"
              className={"input-search"}
              name={"product"}
              placeholder={"Enter the product name"}
              value={search?.product}
              onChange={(e) => changeSearch(e)}
            />
          </p>
          <p>
            <b className={"title-search"}>date:</b>
            <input
              type="date"
              className={"input-search"}
              name={"date"}
              value={search?.date}
              onChange={(e) => changeSearch(e)}
            />
          </p>
          <button
            className={"btn-search"}
            onClick={(e) =>
              setPageData(searchPurchases(e, search, dataFromState))
            }
          >
            Search &#x1F50E;&#xFE0E;
          </button>
        </form>
        <br />
        {pageData.length == 0 && <h4>The requested purchase does not exist</h4>}
        <div className={"found-purchas"}>
          {pageData.length > 0 &&
            pageData.map((purchases, index) => {
              let purchase = purchases.purchase;
              let customer = purchases.customer;
              let product = purchases.product;
              return (
                <div key={purchase._id} style={{ margin: "3%" }}>
                  <table
                    border={"1px"}
                    style={{
                      border: "none",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <thead>
                      <tr>
                        <th colSpan={5}>Purchase Num.{index + 1}</th>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Customer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{new Date(purchase.date).toLocaleDateString()}</td>
                        <td>{product.name}</td>
                        <td>{`x${purchase.quantity}`}</td>
                        <td>{customer.firstName + " " + customer.lastName}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PurchasesPageComp;
