import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthUser/AuthUser";
import { cartcontext } from "../../context/CartContext";
import signin from "../../assets/images/signin.png";
import "./Login.css";
import Swal from "sweetalert2";
import { ColorRing } from "react-loader-spinner";

function Login() {
  // use context to share token
  const { setToken } = useContext(AuthContext);

  // use context to share cart
  const { getCart } = useContext(cartcontext);

  // used to go anther link
  const navigate = useNavigate();

  // login button is hide when request send
  const [isclicked, setIsclicked] = useState(false);

  // obj assign to formik >>> initialValues
  let user = {
    email: "",
    password: "",
  };
  // fun assign to formik >>> onSubmit
  function userLogin(values) {
    // hide login and show loading...
    setIsclicked(true);
    axios
      // check user is sign up
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((res) => {
        // set token to context
        setToken(res.data.token);

        // store to loacalstorge
        localStorage.setItem("tkn", res.data.token);

        // cart info
        getCart();

        // show login button
        setIsclicked(false);

        // alert
        Swal.fire({
          icon: "success",
          title: `Welcome Back,`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#eee",
          backdrop: "0000005e",
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            navigate("/home");
          }
        });
      })
      // if fail request
      .catch((error) => {
        // show login button
        setIsclicked(false);

        // alert
        Swal.fire({
          icon: "error",
          title: `${error.response.data.message}`,
          showConfirmButton: false,
          showDenyButton: true,
          denyButtonText: `Ok`,
          denyButtonColor: "red",
          background: "#eee",
          backdrop: "#0000005e",
        });
      });
  }

  let login = useFormik({
    initialValues: user,
    onSubmit: userLogin,

    // using yup lib to validate
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Email must be a valid email")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
  });

  return (
    <>
      <div className="container p-5">
        <div className="login mx-auto d-md-flex justify-content-between align-items-center">
          <div>
            <div className="login-info">
              <h1>Sign in to FreshCart</h1>
              <p className="fw-semibold ">
                Welcome back to FreshCart! Enter your email to get started.
              </p>
            </div>
            <div className="login-form">
              <form onSubmit={login.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control "
                    id="email"
                    name="email"
                    autoComplete="newEmail"
                    value={login.values.email}
                    onChange={login.handleChange}
                    onBlur={login.handleBlur}
                  />
                  {login.errors.email && login.touched.email ? (
                    <p className="mt-2 ms-2">{login.errors.email}</p>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control "
                    id="password"
                    name="password"
                    placeholder="********"
                    autoComplete="newpassword"
                    value={login.values.password}
                    onChange={login.handleChange}
                    onBlur={login.handleBlur}
                  />
                  {login.errors.password && login.touched.password ? (
                    <p className="mt-2 ms-2">{login.errors.password}</p>
                  ) : null}
                </div>

                <div className="mb-3">
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
                      className="form-control"
                      // disabled={login.errors ? true:false}
                      value="Log In"
                    />
                  )}
                </div>
              </form>
            </div>
            <div className="login-links">
              <p className="mb-1">
                Don{"'"}t have an account?{" "}
                <Link
                  className="fw-seimbold text-decoration-none"
                  to="/register"
                >
                  Sign Up
                </Link>
              </p>
              <Link className="fw-seimbold text-decoration-none" to="/">
                Forget Your Password?
              </Link>
            </div>
          </div>
          <div>
            <img className="img-fluid" src={signin} alt="Signin img" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
