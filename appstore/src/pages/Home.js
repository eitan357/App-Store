import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate, Link, Navigate } from "react-router-dom";
import "../css/Home.css";

import { getAllData } from "../utils/fatchDataBL";
import BuyProductComp from "./customers/BuyProduct";
import CustomersPageComp from "./customers/CustomersPage";
import EditCustomerComp from "./customers/EditCustomer";
import AddnewCustomer from "./customers/NewCustomer";
import MenuComp from "./Menu";
import AddCustomerComp from "./products/AddCustomer";
import EditProductComp from "./products/EditProduct";
import AddNewProduct from "./products/NewProduct";
import ProductsPageComp from "./products/ProductsPage";
import PurchasesPageComp from "./PurchasesPage";

const HomeComp = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        let collections = await Promise.all([
          getAllData("customers"),
          getAllData("products"),
          getAllData("purchases"),
        ]);

        dispatch({
          type: "UPLOAD_DATA",
          payload: {
            customers: collections[0],
            products: collections[1],
            purchases: collections[2],
          },
        });
      } catch (err) {
        return setError(err);
      }
    })();
  }, []);

  return (
    <div>
      <div className={"home-page"}>
        {error && error.message}
        <h3 className={"shop-title"}>Internet Shop &#128722;</h3>
        <Link to={"/"}>
          <img
            className={"house"}
            alt="house"
            src="data:image/png;base64,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"
          />
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<MenuComp />} />
        <Route path="/customers" element={<CustomersPageComp />}>
          <Route path="buyProduct/:id/:name" element={<BuyProductComp />} />
          <Route path="addNewCustomer" element={<AddnewCustomer />} />
        </Route>
        <Route
          path="/customers/editCustomer/:id/:name"
          element={<EditCustomerComp />}
        />
        <Route path="/products" element={<ProductsPageComp />}>
          <Route path=":id/:name" element={<AddCustomerComp />} />
          <Route path="addNewProduct" element={<AddNewProduct />} />
        </Route>
        <Route
          path="/products/editProduct/:id/:name"
          element={<EditProductComp />}
        />
        <Route path="/purchases" element={<PurchasesPageComp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default HomeComp;
