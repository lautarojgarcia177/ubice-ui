import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Root from "./pages/Root";
import UploadPhotos from "./pages/UploadPhotos";

export const routes = {
  root: "/",
  uploadPhotos: "uploadPhotos",
};

export const router = createBrowserRouter([
  {
    path: routes.root,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Root />,
      },
      {
        path: routes.uploadPhotos,
        element: <UploadPhotos />,
      }
    ],
  },
]);
