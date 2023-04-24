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
import ViewAppointments from './components/ViewAppointments/ViewAppointments'
import EditTiming from './components/EditTiming/EditTiming'
import DoctorTakeHelp from './components/DoctorTakeHelp/DoctorTakeHelp'
import DoctorUserProfile from './components/DoctorUserProfile/DoctorUserProfile'
import FindDoctors from './components/FindDoctors/FindDoctors'
import TakeAppointment from './components/TakeAppointment/TakeAppointment'
import BookAppointment from "./components/BookAppointment/BookAppointment";
import EditInformation from "./components/EditInformation/EditInformation";
import ChangePassword from "./components/ChangePassword/ChangePassword";

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
      path: "/doctor-dashboard/:id",
      element: <DoctorDashboard />,
    },
    {
      path: "/patient-dashboard/:id",
      element: <PatientDashboard />,
    },
    ,
    {
      path: "/edit-information/:id",
      element: <EditInformation/>,
    },
    ,
    {
      path: "/change-password/:id",
      element: <ChangePassword/>,
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
      path:'/doctor-dashboard/doctor-user-profile/:id',
      element:<DoctorUserProfile/>
    },
    {
      path:'/doctor-dashboard/view-appointments/:id',
      element:  <ViewAppointments/>
    },
    {
      path:'/doctor-dashboard/edit-timing/:id',
      element:<EditTiming/>
    },
    {
      path:'/doctor-dashboard/doctor-take-help/:id',
      element:<DoctorTakeHelp/>
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
      path:'/book-appointment/:id1/:id',
      element:<BookAppointment/>
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
