import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import { ContentLayout } from "./ContentLayout";
import { Equipment } from "./Equipment/Equipment";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ContentLayout />}>
      <Route path="equipment" element={<Equipment />} />
      <Route path="journal" element={<div>You can add an entry here soon</div>} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
