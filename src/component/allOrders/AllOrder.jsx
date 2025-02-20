import "./AllOrder.css";
import axios from "axios";
import { useQuery } from "react-query";
import Snippet from "../Snippet/Snippet";
import Swal from "sweetalert2";

export default function AllOrder() {
  async function allOrders() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.cartOwner}`,
      {
        headers: {
          token: localStorage.tnk,
        },
      }
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: allOrders,
  });

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
      color: "#ff0000",
      background: "#eee",
    });
  }
  if (isLoading) {
    return (
      <>
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <Snippet />
        </div>
      </>
    );
  }
  const orders = data.data.reverse().map((order) => {
    return (
      <div
        className="order my-5 px-3 py-5 rounded-4 d-md-flex justify-content-around"
        key={order.id}
      >
        <div className="order-products">
          {order.cartItems.map((product) => {
            return (
              <div
                className="product d-flex justify-content-around justify-content-md-start align-items-center"
                key={product._id}
              >
                <div className="product-cover">
                  <img
                    className="img-fluid"
                    src={product.product.imageCover}
                    alt={product.title}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.product.title}</h3>
                  <h4>
                    <span>{product.price} EGP</span>
                  </h4>
                  <h4>
                    Qty: <span>{product.count}</span>
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
        <div className="order-details">
          <h3 className="pb-2 mb-3 text-center">Order Details</h3>
          <h4>
            Order ID: <span>{order.id}</span>
          </h4>
          <h4>
            Order ID: <span>{order.paymentMethodType}</span>
          </h4>
          <h4>
            Address: <span>{order.shippingAddress.city}</span>
          </h4>
          <h4>
            Phone Number: <span>{order.shippingAddress.phone}</span>
          </h4>
          <h4>
            Total Order Price: <span>{order.totalOrderPrice}</span>
          </h4>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="container">
        <div className="orders px-2">{orders}</div>
      </div>
    </>
  );
}
