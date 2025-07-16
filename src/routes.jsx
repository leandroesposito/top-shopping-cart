import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./components/home/Home";
import Catalogue from "./components/catalogue/Catalogue";
import Product from "./components/product/Product";

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
    ],
  },
];

export default routes;
