import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./components/home/Home";
import Catalogue from "./components/catalogue/Catalogue";

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
    ],
  },
];

export default routes;
