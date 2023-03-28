import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import DoctorDashboard from "./pages/Doctor-Dashboard/DoctorDashboard";
import PatientDashboard from "./pages/Patient-Dashboard/PatientDashboard";
import AdminDashboard from "./pages/Admin-Dashboard/AdminDashboard";
import DoctorProfile from "./components/DoctorProfile/DoctorProfile";
import VerifiedDoctors from "./components/AdminDashboard/VerifiedDoctors";
import Patients from "./components/AdminDashboard/Patients";
import AvailableDoctors from "./components/AdminDashboard/AvailableDoctors";
import Doctors from "./components/AdminDashboard/Doctors";
import UserProfile from "./components/UserProfile/UserProfile";
import TakeHelp from './components/TakeHelp/TakeHelp'
import FindDoctors from './components/FindDoctors/FindDoctors'
import TakeAppointment from './components/TakeAppointment/TakeAppointment'

// import Dashboard from "./components/AdminDashboard/Dashboard";
// import AvailableDoctors from "./components/AdminDashboard/AvailableDoctors";
// import Doctors from "./components/AdminDashboard/Doctors";
// import Patients from "./components/AdminDashboard/Patients";

function App() {



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login  />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/doctor-dashboard",
      element: <DoctorDashboard />,
    },
    {
      path: "/patient-dashboard/:id",
      element: <PatientDashboard />,
    },
    // {
    //   path: `/doctor-profile`,
    //   element:<DoctorProfile id={id}/>,
    // },
    {
      path:'/admin-dashboard/verify-doctor-list',
      element:<VerifiedDoctors/>
    },
    {
      path:'/admin-dashboard/available-doctor-list',
      element:<AvailableDoctors/>
    },
    {
      path:'/admin-dashboard/doctor-list',
      element:<Doctors/>
    },
    
    {
      path:'/admin-dashboard/patient-list',
      element:<Patients/>
    },
    {
      path:'/patient-dashboard/user-profile/:id',
      element:<UserProfile/>
    },
    {
      path:'/patient-dashboard/find-doctors/:id',
      element:<FindDoctors/>
    },
    {
      path:'/patient-dashboard/take-appointment/:id',
      element:<TakeAppointment/>
    },
    {
      path:'/patient-dashboard/take-help/:id',
      element:<TakeHelp/>
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard />,
      // children: [
      //   {
      //     path: "dashboard",
      //     element: <Dashboard />,
      //   },
      //   {
      //     path: "available-doctors",
      //     element: <AvailableDoctors />,
      //   },
      //   {
      //     path: "doctors",
      //     element: <Doctors />,
      //   },
      //   {
      //     path: "patients",
      //     element: <Patients />,
      //   },

      // ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
