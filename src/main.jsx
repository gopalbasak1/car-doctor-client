import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Rotes/Router.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="max-w-7xl mx-auto">
    <React.StrictMode>
     <AuthProvider>
     <RouterProvider router={Router} />
     </AuthProvider>
    </React.StrictMode>
    ,
  </div>
);
