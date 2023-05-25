import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import FruitsMaster from "./components/FruitsMaster";
import ErrorPage from "./components/ErrorPage";
import FruitDetails from "./components/FruitDetails";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Panier from "./components/Panier";

const router = createBrowserRouter([
  {
    path: "/fruits/:fruitName",
    element: <FruitDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/creation-de-compte",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/connexion",
    element: <Signin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <FruitsMaster />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/panier",
    element: <Panier />,
    errorElement: <ErrorPage />,
  }
]);



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
