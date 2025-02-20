import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthUser/AuthUser";
import Swal from "sweetalert2";
import signup from "../../assets/images/signup.svg";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  // use context to share token
  const { setToken } = useContext(AuthContext);

  // login button is hide when request send
  const [isClicked, setIsClicked] = useState(false);

  // obj assign to formik >>> initialValues
  let user = {
    name: "",
    email: "",
    password: "",
    phone: "",
    rePassword: "",
  };

  // fun assign to formik >>> onSubmit
  function userRegister(values) {
    // hide login and show loaging...
    setIsClicked(true);

    axios
      // send user info to sign in
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((res) => {
        // set token to context
        setToken(res.data.token);

        // store to loacalstorge
        localStorage.setItem("tkn", res.data.token);

        // show login and hide loading...
        setIsClicked(false);

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
      // fail request
      .catch((error) => {
        // show login and hide loaging...
        setIsClicked(false);

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

  const register = useFormik({
    initialValues: user,
    onSubmit: userRegister,
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required").min(2, "Too short!"),
      email: yup
        .string()
        .email("Email must be a valid email")
        .required("Email is required"),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(/^01[0-25]\d{8}$/, "Invalid Phone Number"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum password is 6 characters")
        .max(12, "Maximum password is 12 characters.")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
          "Password must be a combination of a number and a character"
        ),
      rePassword: yup
        .string()
        .required("password is required")
        .oneOf([yup.ref("password")], "Type the correct password"),
    }),
  });
  return (
    <>
      <div className="container p-5">
        <div className="register mx-auto d-md-flex justify-content-between align-items-center">
          <div>
            <div className="register-info">
              <h1>Get Start Shopping</h1>
              <p className="fw-semibold ">
                Welcome to FreshCart! Enter your email to get started.
              </p>
            </div>
            <div className="register-form">
              <form onSubmit={register.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="name"
                    name="name"
                    autoComplete="newname"
                    value={register.values.name}
                    onChange={register.handleChange}
                    onBlur={register.handleBlur}
                  />
                  {register.errors.name && register.touched.name ? (
                    <p className="mt-2 ms-2">{register.errors.name}</p>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control "
                    id="email"
                    name="email"
                    autoComplete="newemail"
                    value={register.values.email}
                    onChange={register.handleChange}
                    onBlur={register.handleBlur}
                  />
                  {register.errors.email && register.touched.email ? (
                    <p className="mt-2 ms-2">{register.errors.email}</p>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control "
                    id="phone"
                    name="phone"
                    autoComplete="newphone"
                    value={register.values.phone}
                    onChange={register.handleChange}
                    onBlur={register.handleBlur}
                  />
                  {register.errors.phone && register.touched.phone ? (
                    <p className="mt-2 ms-2">{register.errors.phone}</p>
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
                    autoComplete="newpassword"
                    value={register.values.password}
                    onChange={register.handleChange}
                    onBlur={register.handleBlur}
                  />
                  {register.errors.password && register.touched.password ? (
                    <p className="mt-2 ms-2">{register.errors.password}</p>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="rePassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control "
                    id="rePassword"
                    name="rePassword"
                    autoComplete="newrepassword"
                    value={register.values.rePassword}
                    onChange={register.handleChange}
                    onBlur={register.handleBlur}
                  />
                  {register.errors.rePassword && register.touched.rePassword ? (
                    <p className="mt-2 ms-2">{register.errors.rePassword}</p>
                  ) : null}
                </div>
                <div className="mb-3">
                  <input
                    type="submit"
                    className="form-control"
                    // disabled={login.errors ? true:false}
                    value={isClicked ? "loading..." : "Sign Up"}
                  />
                </div>
              </form>
            </div>
            <div className="register-links">
              <p className="">
                You have an account?
                <Link className="fw-seimbold text-decoration-none" to="/login">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
          <div>
            <img className="img-fluid" src={signup} alt="Signin img" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
