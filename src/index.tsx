import { Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ContentLayout } from "./ContentLayout";
import { AuthContextProvider } from "./Context/AuthContext";
import { Equipment } from "./Equipment/Equipment";
import { Journal } from "./Journal/Journal";
import { Login } from "./Login/Login";
import Logout from "./Login/Logout";
import Shell from "./Login/Shell";
import { ProtectedRoute } from "./ProtectedRoute";
import { Register } from "./Register/Register";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "./Context/ToastContainer";
import { DataContextProvider } from "./Context/DataContext/DataContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ContentLayout />}>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/equipment" />} />
        <Route path="equipment" element={<Equipment />} />
        <Route path="journal" element={<Journal />} />
      </Route>
      <Route
        path="login"
        element={
          <Shell>
            <Login />
          </Shell>
        }
      />
      <Route
        path="register"
        element={
          <Shell>
            <Register />
          </Shell>
        }
      />
      <Route path="logout" element={<Logout />} />
      <Route
        path="profile"
        element={
          <>
            Profile...
            <Typography>Add choice to change units (knots, mph, ft, meters etc...)</Typography>
            <Typography>Add addition/removal of beaches/locations?</Typography>
          </>
        }
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ToastContainer>
        <AuthContextProvider>
          <DataContextProvider>
            <RouterProvider router={router} />
          </DataContextProvider>
        </AuthContextProvider>
      </ToastContainer>
    </LocalizationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
