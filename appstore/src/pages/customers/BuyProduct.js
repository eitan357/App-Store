import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/customers/BuyProduct.css";
import {
  addPurchaseFun,
  updateProductFun,
} from "../../functions/changeDataInComp";
import { createData } from "../../utils/fatchDataBL";

const BuyProductComp = () => {
  const params = useParams();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);

  const [productId, setProductId] = useState(0);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);

  //get the choosed product data
  useEffect(() => {
    setProduct(storeData.products.find((product) => product._id === productId));
  }, [productId]);

  //get total price
  let totalPrice = function () {
    if (product?.price) return product.price * quantity;
    return 0;
  };

  // send Purchases data to server and reducer
  let addProduct = async function (e) {
    e.preventDefault();
    //check the quantity
    if (productId == 0) return alert("You need choose product");
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
      customerId: params.id,
      productId,
      date: new Date(),
      quantity,
    };
    setQuantity(1);
    setProductId(0);
    let _id = await createData("purchases", obj);
    addPurchaseFun(e, dispatch, { ...obj, _id });
    updateProductFun(e, dispatch, changeQuantity);
  };

  //check if the path is erroneous
  useEffect(
    () =>
      setError(
        JSON.parse(sessionStorage[params.name + params.id] ? false : true)
      ),
    [params]
  );
  if (error) return <h4>⛔The path does not exist⛔</h4>;

  return (
    <div>
      <h4 className={"buy-product-title"}>{`Buy Product - ${params.name}`} </h4>

      <button
        className={"close-buy-product"}
        onClick={() => navigation("/customers")}
      >
        &times;
      </button>
      <div className={"buy-product"}>
        <form className={"form_buy-product"}>
          Product:{" "}
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option>{""}</option>
            {storeData.products.map((product) => {
              return (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              );
            })}
          </select>
          <br />
          Quantity:{" "}
          <input
            type="number"
            max={10}
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
          />
          <br />
          {`Total Price: $${totalPrice()} `}
          <br />
          <button className={"buy-btn"} onClick={(e) => addProduct(e)}>
            BUY
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyProductComp;
