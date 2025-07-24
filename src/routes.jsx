import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./components/home/Home";
import Catalogue from "./components/catalogue/Catalogue";
import Product from "./components/product/Product";
import Cart from "./components/cart/Cart";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "catalogue",
        element: <Catalogue />,
      },
      {
        path: "catalogue/category/:category",
        element: <Catalogue />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "search/:search",
        element: <Catalogue />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;
