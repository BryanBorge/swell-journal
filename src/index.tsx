import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { ContentLayout } from "./ContentLayout";
import { Equipment } from "./Equipment/Equipment";
import { Journal } from "./Journal/Journal";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Typography } from "@mui/material";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthContextProvider } from "./Context/AuthContext";
import Login from "./Login/Login";
import Logout from "./Login/Logout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ContentLayout />}>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/equipment" />} />
        <Route path="equipment" element={<Equipment />} />
        <Route path="journal" element={<Journal />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route
        path="settings"
        element={
          <>
            Settings...
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
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </LocalizationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
