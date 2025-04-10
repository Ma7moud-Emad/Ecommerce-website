import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Notfound from "./component/Notfound/Notfound";
import Register from "./component/Register/Register";
import Login from "./component/Login/Login";
import AuthUser from "./context/AuthUser/AuthUser";
import ProtectedRouter from "./component/ProdectedRouter/ProtectedRouter";
import Products from "./component/Products/Products";
import { QueryClient, QueryClientProvider } from "react-query";
import Brands from "./component/Brands/Brands";
import Categories from "./component/Categories/Categories";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import CartContext from "./context/CartContext";
import Cart from "./component/Cart/Cart";
import { Toaster } from "react-hot-toast";
import CachOrder from "./component/CachOrder/CachOrder";
import Home from "./component/Home/Home";
import AllOrder from "./component/allorders/AllOrder.jsx";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: (
          <ProtectedRouter>
            <Products />
          </ProtectedRouter>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRouter>
            <Brands />
          </ProtectedRouter>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRouter>
            <Categories />
          </ProtectedRouter>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        ),
      },
      {
        path: "ProductDetails/:productId",
        element: (
          <ProtectedRouter>
            <ProductDetails />
          </ProtectedRouter>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRouter>
            <CachOrder />
          </ProtectedRouter>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRouter>
            <AllOrder />
          </ProtectedRouter>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

const reactQueryConifg = new QueryClient();
function App() {
  return (
    <>
      <AuthUser>
        <CartContext>
          <QueryClientProvider client={reactQueryConifg}>
            <RouterProvider router={router} />
            <Toaster />
          </QueryClientProvider>
        </CartContext>
      </AuthUser>
    </>
  );
}

export default App;
