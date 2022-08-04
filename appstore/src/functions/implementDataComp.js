//Customers Pages
let getCustomersData = function (
  customers = [],
  products = [],
  purchases = []
) {
  return customers.map((customer) => {
    // get customer's purchases
    let customerPurchases = purchases.filter(
      (purchase) => purchase.customerId === customer._id
    );

    //get customer's products data
    let productAndPurchase = customerPurchases.map((customerPurchase) => {
      let product = products.find(
        (product) => product._id === customerPurchase.productId
      );
      return {
        purchase: {
          ...customerPurchase,
          date: new Date(customerPurchase.date).toLocaleDateString(),
        },
        product,
      };
    });
    return { customer, productAndPurchase };
  });
};

let getEditCustomerData = function (
  customerId,
  customers = [],
  products = [],
  purchases = []
) {
  let allcustomers = getCustomersData(customers, products, purchases);
  let customer = allcustomers.find(
    (customer) => customer.customer._id === customerId
  );
  return customer;
};

//Products Pages
let getProductsData = function (customers = [], products = [], purchases = []) {
  return products.map((product) => {
    // get purchase's product
    let allPurchase = purchases
      .filter((purchase) => purchase.productId === product._id)
      .map((purchase) => {
        return {
          ...purchase,
          date: new Date(purchase.date).toLocaleDateString(),
        };
      });

    //get product's buyers
    let allCustomers = [
      ...new Set(
        allPurchase.map((productPurchase) =>
          customers.find(
            (customer) => customer._id === productPurchase.customerId
          )
        )
      ),
    ];

    let customerAndPurchase = allCustomers.map((customer) => {
      let purchases = allPurchase.filter(
        (purchase) => purchase.customerId === customer._id
      );
      return {
        customer,
        purchases,
      };
    });

    return {
      product,
      customerAndPurchase,
    };
  });
};

let getEditProductData = function (
  productId,
  customers = [],
  products = [],
  purchases = []
) {
  let allProducts = getProductsData(customers, products, purchases);
  let product = allProducts.find(
    (productData) => productData.product._id === productId
  );
  return product;
};

//Purchases page
let getPurchasesData = function (
  customers = [],
  products = [],
  purchases = []
) {
  return purchases.map((purchase) => {
    //purchase's customer
    let customer = customers.find((customer) => {
      return customer._id === purchase.customerId;
    });
    //purchase's product
    let product = products.find(
      (product) => product._id === purchase.productId
    );
    return {
      purchase,
      customer,
      product,
    };
  });
};

// get the search data
let searchPurchases = function (e, search, stateData) {
  e.preventDefault();
  let searchCustomer = search.customer ? search.customer : "";
  let searchProduct = search.product ? search.product : "";
  let searchDate = search.date ? new Date(search.date).toDateString() : "";
  console.log(stateData);
  return () =>
    stateData
      .map((purchase) => {
        let filterCustomer = (data) => {
          if (searchCustomer === "") return data;
          let fullName = `${data.customer.firstName} ${data.customer.lastName}`;
          if (fullName === searchCustomer) return data;
          return;
        };

        let filterProduct = (data) => {
          if (searchProduct === "") return data;
          if (data.product.name === searchProduct) return data;
          return;
        };

        let filterDate = (data) => {
          if (searchDate === "") return data;
          let purchaseDate = new Date(data.purchase.date).toDateString();
          if (purchaseDate === searchDate) return data;
          return;
        };

        return (
          filterCustomer(purchase) &&
          filterProduct(purchase) &&
          filterDate(purchase) &&
          purchase
        );
      })
      .filter((element) => element !== undefined);
};

export {
  getCustomersData,
  getEditCustomerData,
  getProductsData,
  getEditProductData,
  getPurchasesData,
  searchPurchases,
};
