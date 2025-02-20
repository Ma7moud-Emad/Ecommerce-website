import { useContext } from "react";
import { cartcontext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";
import axios from "axios";
import Swal from "sweetalert2";

function Cart() {
  // use context to share cart
  const {
    allProducts,
    countProducts,
    priceProducts,
    setAllProducts,
    setCountProducts,
    setPriceProducts,
    cartId,
    setCartId,
  } = useContext(cartcontext);

  // alert success
  function alertSuccess(msg) {
    Swal.fire({
      icon: "success",
      title: `${msg}`,
      showConfirmButton: false,
      timer: 3000,
      background: "#eee",
      backdrop: "0000005e",
      timerProgressBar: true,
      didOpen: () => {
        document.querySelector(
          ".swal2-timer-progress-bar"
        ).style.backgroundColor = "#0aad0a";
      },
    });
  }

  // alert error
  function alertFail(msg) {
    Swal.fire({
      icon: "error",
      title: `${msg}`,
      confirmButtonColor: "#0aad0a",
      background: "#eee",
      backdrop: "#0000005e",
      timerProgressBar: true,
      timer: 3000,
      didOpen: () => {
        document.querySelector(
          ".swal2-timer-progress-bar"
        ).style.backgroundColor = "#0aad0a";
      },
    });
  }

  // fun >> delet product to cart
  function deleteProduct(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: localStorage.tkn,
        },
      })
      .then((res) => {
        setAllProducts(res.data.data.products);
        setCountProducts(res.data.numOfCartItems);
        setPriceProducts(res.data.data.totalCartPrice);
        // alert
        alertSuccess("success");
      })
      .catch((error) => {
        // alert
        alertFail(error.response.data.message);
      });
  }

  // fun >> delet all products your cart
  function clearCart() {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token: localStorage.tkn,
        },
      })
      .then((res) => {
        setAllProducts(null);
        setCountProducts(0);
        setPriceProducts(0);
        setCartId(null);
        // alert
        alertSuccess(res.data.message);
      })
      .catch((error) => {
        // alert
        alertFail(error.response.data.message);
      });
  }

  // fun >> add product to cart
  function updateCount(productId, newCount) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        {
          headers: {
            token: localStorage.tkn,
          },
        }
      )
      .then((res) => {
        setAllProducts(res.data.data.products);
        setCountProducts(res.data.numOfCartItems);
        setPriceProducts(res.data.data.totalCartPrice);

        // alert
        alertSuccess("success");
      })
      .catch((error) => {
        // alert
        alertFail(error.response.data.message);
      });
  }

  return (
    <div className="container py-5">
      <div className="cart">
        <div className="cart-info pb-3">
          <div className="d-flex justify-content-between mb-3">
            <h2>Shopping Cart</h2>
            <button
              className="btn btn-danger"
              onClick={() => {
                cartId
                  ? clearCart()
                  : Swal.fire({
                      icon: "info",
                      title: "Your cart is empty",
                      showConfirmButton: false,
                      timer: 3000,
                      background: "#eee",
                      backdrop: "0000005e",
                      timerProgressBar: true,
                      didOpen: () => {
                        document.querySelector(
                          ".swal2-timer-progress-bar"
                        ).style.backgroundColor = "#0aad0a";
                      },
                    });
              }}
            >
              Clear All
            </button>
          </div>
          {cartId ? (
            <div className="d-flex row-gap-3 flex-column justify-content-center">
              <h3>
                Total Price:<span className="ms-2">{priceProducts}</span>
              </h3>
              <h3 className="border-bottom border-2 pb-4">
                Total Number:<span className="ms-2">{countProducts} </span>
              </h3>
            </div>
          ) : (
            <h1 className="text-center">your Cart Is Empty</h1>
          )}
        </div>
        {cartId ? (
          <div className="cart-products p-4">
            {allProducts?.map((product, ind) => {
              return (
                <div
                  className="cart-product mb-4 rounded-4 overflow-hidden p-3 row justify-content-between"
                  key={ind}
                >
                  <div className="d-flex align-items-center col-md-7">
                    <div className="w-50">
                      <img
                        src={product.product.imageCover}
                        alt="imageCover"
                        className="img-fluid"
                      />
                    </div>
                    <div>
                      <h3>{product.product.title}</h3>
                      <h4>{product.price} EGP</h4>
                      <div
                        className="d-flex align-items-center gap-2"
                        onClick={() => deleteProduct(product.product.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                        <p className="mb-0">Remove</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mt-4 justify-content-center align-items-center gap-3 col-md-4">
                    <button
                      className="btn"
                      onClick={() => {
                        updateCount(product.product.id, product.count + 1);
                      }}
                    >
                      +
                    </button>

                    <p className="mb-0 fs-4 fw-semibold">{product.count}</p>
                    <button
                      className="btn"
                      onClick={() => {
                        updateCount(product.product.id, product.count - 1);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {cartId ? (
          <Link
            to="/payment"
            className="text-white text-decoration-none fs-3 fw-bold d-block text-center rounded-3 p-1"
          >
            Checkout
          </Link>
        ) : (
          <Link
            to="/products"
            className="text-white text-decoration-none fs-3 fw-bold d-block text-center rounded-3 p-1"
          >
            Go To Shopping
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
