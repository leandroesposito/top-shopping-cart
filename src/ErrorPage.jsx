import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return <div className="error">{error.statusText || error.message}</div>;
}

export default ErrorPage;
