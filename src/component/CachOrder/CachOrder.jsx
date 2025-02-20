import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useContext, useState } from "react";
import { cartcontext } from "../../context/CartContext";
import "./CachOrder.css";
import { ColorRing } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CachOrder() {
  const navigate = useNavigate();
  const [isclicked, setIsclicked] = useState(false);
  const { cartId, setCartId, setCountProducts } = useContext(cartcontext);

  function updateUI() {
    setCountProducts(0);
    setCartId(null);
  }
  function reqOrderPayment(values) {
    setIsclicked(true);
    if (values.payment == "cashPayment") {
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          {
            shippingAddress: {
              details: values.details,
              phone: values.phone,
              city: values.city,
            },
          },
          {
            headers: {
              token: localStorage.tkn,
            },
          }
        )
        .then((res) => {
          setIsclicked(false);
          updateUI();

          // alert
          Swal.fire({
            icon: "success",
            title: `${res.data.status}`,
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
              navigate("/allorders");
            }
          });
        })
        .catch((error) => {
          setIsclicked(false);
          Swal.fire({
            icon: "error",
            title: `${error.response.data.message}`,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: `No`,
            denyButtonColor: "#0aad0a",
          });
        });
    }
    if (values.payment == "onlinePayment") {
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
          {
            shippingAddress: {
              details: values.details,
              phone: values.phone,
              city: values.city,
            },
          },
          {
            headers: {
              token: localStorage.tkn,
            },
          }
        )
        .then((res) => {
          setIsclicked(false);
          window.open(res.data.session.url, "_self");
          updateUI();
        })
        .catch(() => {
          setIsclicked(false);
        });
    }
  }

  let orderPayment = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      payment: "",
    },
    onSubmit: reqOrderPayment,
    validationSchema: yup.object().shape({
      details: yup.string().required("details is required"),
      phone: yup.string().required("phone is required"),
      city: yup.string().required("city is required"),
      payment: yup.string().required(""),
    }),
  });

  return (
    <>
      <div className="container">
        <div className="order">
          <div className="order-info py-4">
            <h1>Checkout</h1>
          </div>
          <div className="order-form">
            <form onSubmit={orderPayment.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control "
                  id="phone"
                  name="phone"
                  placeholder="Phone Number..."
                  autoComplete="newPhone"
                  value={orderPayment.values.phone}
                  onChange={orderPayment.handleChange}
                  onBlur={orderPayment.handleBlur}
                />
                {orderPayment.errors.phone && orderPayment.touched.phone ? (
                  <p className="mt-2 ms-2">{orderPayment.errors.phone}</p>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="form-label fw-semibold">
                  City
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="city"
                  name="city"
                  placeholder="Write Your City..."
                  autoComplete="newCity"
                  value={orderPayment.values.city}
                  onChange={orderPayment.handleChange}
                  onBlur={orderPayment.handleBlur}
                />
                {orderPayment.errors.city && orderPayment.touched.city ? (
                  <p className="mt-2 ms-2">{orderPayment.errors.city}</p>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="details" className="form-label fw-semibold">
                  details
                </label>
                <textarea
                  className="form-control "
                  id="details"
                  name="details"
                  autoComplete="newdetails"
                  placeholder="Write Your Address Here..."
                  value={orderPayment.values.details}
                  onChange={orderPayment.handleChange}
                  onBlur={orderPayment.handleBlur}
                />
                {orderPayment.errors.details && orderPayment.touched.details ? (
                  <p className="mt-2 ms-2">{orderPayment.errors.details}</p>
                ) : null}
              </div>

              <div className="radio">
                <label className="form-check-label fw-bold mb-4 d-block">
                  <input
                    className="form-check-input me-2"
                    type="radio"
                    name="payment"
                    value="onlinePayment"
                    onChange={orderPayment.handleChange}
                    // onBlur={orderPayment.handleBlur}
                  />
                  Online Payment
                </label>

                <label className="form-check-label fw-bold mb-4 d-block">
                  <input
                    className="form-check-input me-2"
                    type="radio"
                    name="payment"
                    value="cashPayment"
                    onChange={orderPayment.handleChange}
                    // onBlur={orderPayment.handleBlur}
                  />
                  Cash Payment
                </label>
              </div>
              <div className="mb-4">
                {isclicked ? (
                  <div className="loader text-center rounded-3">
                    <ColorRing
                      visible={true}
                      height="40"
                      width="40"
                      ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={["white", "white", "white", "white", "white"]}
                    />
                  </div>
                ) : (
                  <input
                    type="submit"
                    className="form-control fw-bold fs-3"
                    // disabled={orderPayment.errors ? true:false}
                    value={`Continue with ${orderPayment.values.payment}`}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CachOrder;
