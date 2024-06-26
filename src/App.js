import React from "react";
import User from "./components/User";
import Blogs from "./components/Blogs";
import BlogsId from "./components/BlogsId";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";
import { createBrowserRouter, Outlet } from "react-router-dom";
import MenuAppBar from "./components/MenuAppBar";
import { PatientInfo } from "./components/Patient/PatientInfo";
import AccesDoctor from "./components/Patient/AccesDoctor";
import AccessHospital from "./components/Patient/AccessHospital";
import { AppProvider } from "./AppContext";
import { AddHospital } from "./components/Admin/AddHospital";
import { AddDoctor } from "./components/Hospital/AddDoctor";
import CreateEhr from "./components/EHR/CreateEhr";
import UploadEHR from "./components/Patient/UploadEHR";
import AccessEhr from "./components/Doctor/AccessEhr";
import DetailsComponent from "./components/EHR/DetailsComponent";


export const App = () => {
  return (
    <React.Fragment>
      <AppProvider>
        <MenuAppBar />
        <Outlet />
      </AppProvider>
    </React.Fragment>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "patientInfo",
        element: <PatientInfo />,
      },
      {
        path: "DoctorAccess",
        element: <AccesDoctor />,
      },
      {
        path: "HospitalAccess",
        element: <AccessHospital />,
      },
      {
        path: "AddHospital",
        element: <AddHospital />,
      },
      {
        path: "AddDoctor",
        element: <AddDoctor />,
      },
      {
        path: "CreateEhr",
        element: <CreateEhr />,
      },
      {
        path: "UploadEHR",
        element: <UploadEHR />,
      },
      {
        path: "AccessEhr",
        element: <AccessEhr />,
      },
      {
        path: "DetailsComponent/:id/:addresse",
        element: <DetailsComponent />,
      },
      {
        path: "user",
        element: (
          <PrivateRoute>
            <User />
          </PrivateRoute>
        ),
      },
      {
        path: "blogs",
        element: (
          <PrivateRoute>
            <Blogs />
          </PrivateRoute>
        ),
      },
      {
        path: "blogs/:id",
        element: (
          <PrivateRoute>
            <BlogsId />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
