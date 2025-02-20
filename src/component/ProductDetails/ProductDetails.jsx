import { useNavigate, useParams } from "react-router-dom";
import useGetApiQuery from "../../CustomeHooks/useGetApi";
import { useContext } from "react";
import { cartcontext } from "../../context/CartContext";
import Swal from "sweetalert2";
import Snippet from "../Snippet/Snippet";
import "./ProductDetails.css";
import Slider from "react-slick";

function ProductDetails() {
  const navigate = useNavigate();

  const { productId } = useParams();

  const { addProduct } = useContext(cartcontext);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        navigate("/cart");
      }
    });
  }

  // alert fail
  function alertFail(msg) {
    Swal.fire({
      icon: "error",
      title: `${msg.response.data.message}`,
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: `Ok`,
      denyButtonColor: "#0aad0a",
    });
  }

  const result = useGetApiQuery({
    url: `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
    uniqueKey: ["product", productId],
  });

  if (result.isLoading) {
    return (
      <>
        <div className="container d-flex justify-content-center align-items-center">
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
    });
    return <></>;
  }

  return (
    <>
      <div className="container p-5">
        <div className="product-details px-sm-5 px-md-0 row align-items-center">
          <div className="images col-md-6">
            <Slider {...settings}>
              {result.data.data.data.images.map((image, ind) => {
                return (
                  <div key={ind}>
                    <img className="img-fluid" src={image} alt={ind} />
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="details mt-5 col-md-6">
            <h3 className="mb-0">{result.data.data.data.title}</h3>
            <p className="mt-2 mb-4">{result.data.data.data.description}</p>
            <h4 className="mb-3">{result.data.data.data.category.name}</h4>
            <div className="d-flex justify-content-between mb-3">
              <p className="fs-5 fw-semibold">
                {result.data.data.data.price} EGP
              </p>
              {result.data.data.data.priceAfterDiscount ? (
                <p className="">
                  <del>{result.data.data.data.price}</del>
                  <span>{result.data.data.data.priceAfterDiscount}</span>
                </p>
              ) : (
                ""
              )}
              <p className="fs-5 fw-semibold">
                <i className="fa-solid fa-star me-1"></i>
                {result.data.data.data.ratingsAverage}
              </p>
              <i className="fa-regular fa-heart fs-2 fw-semibold"></i>
            </div>
            <button
              className="border-0 rounded-3 w-100 fs-4 p-2 fw-semibold"
              onClick={() => {
                addProduct(productId, alertSuccess, alertFail);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
