import useGetApiQuery from "../../CustomeHooks/useGetApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cartcontext } from "../../context/CartContext";
import Swal from "sweetalert2";
import Snippet from "../Snippet/Snippet";
import "./Products.css";

function Products() {
  const { addProduct } = useContext(cartcontext);
  const navigate = useNavigate();

  // alert success
  function alertSuccess(msg) {
    Swal.fire({
      icon: "success",
      title: `${msg.data.message}`,
      showConfirmButton: false,
      padding: 20,
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        document.querySelector(
          ".swal2-timer-progress-bar"
        ).style.backgroundColor = "#0aad0a";
      },
    });
  }

  // alert fail
  function alertFail(msg) {
    Swal.fire({
      icon: "error",
      title: `${msg.response.data.message}`,
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: `No`,
      denyButtonColor: "#0aad0a",
    });
  }

  function failAddAlert(msg) {
    Swal.fire({
      icon: "error",
      title: `${msg}`,
      text: "Do you want to log in ?",
      showDenyButton: true,
      confirmButtonText: "Log In",
      confirmButtonColor: "#0aad0a",
      denyButtonText: `Cancle`,
      denyButtonColor: "red",
      background: "#eee",
      backdrop: "#0000005e",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  }

  const result = useGetApiQuery({
    url: "https://ecommerce.routemisr.com/api/v1/products",
    uniqueKey: "products",
  });

  if (result.isLoading) {
    return (
      <>
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <Snippet />
        </div>
      </>
    );
  }

  if (result.isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${result.error.response.data.message}`,
      color: "#ff0000",
      background: "#eee",
    });
    return <></>;
  }

  return (
    <>
      <div className="container ">
        <div className="products row row-gap-4 p-4 justify-content-center ">
          <h2 className="pt-4 mb-0">All Products</h2>
          {result.data.data.data.map((product) => {
            return (
              <div
                className="product rounded-5 col-12 col-sm-6 col-md-4 col-xl-3"
                key={product.id}
              >
                <div className="product-action d-flex justify-content-between py-2">
                  <button
                    className="border-0 py-2 px-3 rounded-3"
                    onClick={() => {
                      if (localStorage.tkn) {
                        addProduct(product.id, alertSuccess, alertFail);
                      } else {
                        failAddAlert(
                          "To add the product to your cart you must log in"
                        );
                      }
                    }}
                  >
                    Add To Cart
                  </button>
                  <button
                    className="border-0"
                    onClick={() => {
                      localStorage.tkn ? "" : navigate("/login");
                    }}
                  >
                    <i className="fa-regular fa-heart fs-2 fw-semibold"></i>
                  </button>
                </div>
                <div
                  className="product-show"
                  onClick={() => {
                    if (localStorage.tkn) {
                      navigate(`/ProductDetails/${product.id}`);
                    } else
                      Swal.fire({
                        icon: "info",
                        title: "To view product details you must be logged in",
                        text: "Do you want to log in ?",
                        showDenyButton: true,
                        confirmButtonText: "Log In",
                        confirmButtonColor: "#0aad0a",
                        denyButtonText: `Cancle`,
                        denyButtonColor: "red",
                        background: "#eee",
                        backdrop: "0000005e",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          navigate("/login");
                        }
                      });
                  }}
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="img-fluid"
                  />

                  <h3>{product.category.name}</h3>

                  <p className="text-black fw-semibold">
                    {product.title.split(" ", 4).join(" ")}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    {product.priceAfterDiscount ? (
                      <p>
                        <del>{product.price}</del>
                        <span className="text-black fs-4 fw-semibold ms-1">
                          {product.priceAfterDiscount}
                        </span>
                      </p>
                    ) : (
                      <p className="text-black fs-4 fw-semibold">
                        {product.price}
                      </p>
                    )}

                    <p className="text-black fs-4 fw-semibold ms-1">
                      <i className="fa-solid fa-star me-1"></i>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Products;
