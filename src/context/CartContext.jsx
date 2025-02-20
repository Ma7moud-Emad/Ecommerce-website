import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const cartcontext = createContext();

function CartContext(props) {
  const [allProducts, setAllProducts] = useState(null);
  const [countProducts, setCountProducts] = useState(0);
  const [priceProducts, setPriceProducts] = useState(0);

  const [cartId, setCartId] = useState(null);

  // fun >> add product to cart
  function addProduct(productId, alertSuccess, alertFail) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.tkn,
          },
        }
      )
      .then((res) => {
        getCart();
        alertSuccess(res);
      })
      .catch((error) => {
        alertFail(error);
      });
  }

  // fun >> show cart data
  async function getCart() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.tkn,
        },
      })
      .then((res) => {
        setAllProducts(res.data.data.products);
        setCountProducts(res.data.numOfCartItems);
        setPriceProducts(res.data.data.totalCartPrice);
        setCartId(res.data.data._id);
        localStorage.setItem("cartOwner", res.data.data.cartOwner);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          showDenyButton: true,
          denyButtonText: `Ok`,
          denyButtonColor: "#0aad0a",
        });
      });
  }

  // when refresh re-render cart
  useEffect(() => {
    getCart();
  }, []);

  return (
    <cartcontext.Provider
      value={{
        allProducts,
        countProducts,
        priceProducts,
        cartId,
        addProduct,
        getCart,
        setAllProducts,
        setCountProducts,
        setPriceProducts,
        setCartId,
      }}
    >
      {props.children}
    </cartcontext.Provider>
  );
}

export default CartContext;
