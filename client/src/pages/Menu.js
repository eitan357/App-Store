import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Menu.css";

const MenuComp = () => {
  const navigation = useNavigate();

  return (
    <div className={"menu"}>
      <div className="box box-customers">
        <h5 className={`title`}>Follow the customers</h5>
        <button
          className={`btn`}
          onClick={() => {
            navigation("/customers");
          }}
        >
          Customers Page
        </button>
      </div>
      <div className={"box"}>
        <h5 className={`title`}>Find your products</h5>
        <button
          className={`btn`}
          onClick={() => {
            navigation("/products");
          }}
        >
          Products Page
        </button>
      </div>
      <div className={"box"}>
        <h5 className={`title`}>See all the purchases</h5>
        <button
          className={`btn`}
          onClick={() => {
            navigation("/purchases");
          }}
        >
          Purchases Page
        </button>
      </div>
    </div>
  );
};
export default MenuComp;
