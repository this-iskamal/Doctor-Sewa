import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import DoctorDashboard from "./pages/Doctor-Dashboard/DoctorDashboard";
import PatientDashboard from "./pages/Patient-Dashboard/PatientDashboard";
import AdminDashboard from "./pages/Admin-Dashboard/AdminDashboard";
// import DoctorProfile from "./components/DoctorProfile/DoctorProfile";
import VerifiedDoctors from "./components/AdminDashboard/VerifiedDoctors";
import Patients from "./components/AdminDashboard/Patients";
import AvailableDoctors from "./components/AdminDashboard/AvailableDoctors";
import Doctors from "./components/AdminDashboard/Doctors";
import UserProfile from "./components/UserProfile/UserProfile";
import TakeHelp from "./components/TakeHelp/TakeHelp";
import ViewAppointments from "./components/ViewAppointments/ViewAppointments";
import EditTiming from "./components/EditTiming/EditTiming";
import DoctorTakeHelp from "./components/DoctorTakeHelp/DoctorTakeHelp";
import DoctorUserProfile from "./components/DoctorUserProfile/DoctorUserProfile";
import FindDoctors from "./components/FindDoctors/FindDoctors";
import TakeAppointment from "./components/TakeAppointment/TakeAppointment";
import BookAppointment from "./components/BookAppointment/BookAppointment";
import EditInformation from "./components/EditInformation/EditInformation";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import DoctorEditInformation from "./components/DoctorEditInformation/DoctorEditInformation";
import EditDoctorInfo from "./components/EditDoctorInfo/EditDoctorInfo";
import EditPatientInfo from "./components/EditPatientInfo/EditPatientInfo";
import VerifyAppointments from "./components/AdminDashboard/VerifyAppointments";
import PrivateRoute from "./PrivateRoute";
import DoctorP from "./components/P/DoctorP";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import AddAdminForm from "./components/AddAdminForm/AddAdminForm";

// import Dashboard from "./components/AdminDashboard/Dashboard";
// import AvailableDoctors from "./components/AdminDashboard/AvailableDoctors";
// import Doctors from "./components/AdminDashboard/Doctors";
// import Patients from "./components/AdminDashboard/Patients";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/doctor-dashboard/:id",
        element: (
          <PrivateRoute>
            <DoctorDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/patient-dashboard/:id",
        element: (
          <PrivateRoute>
            <PatientDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-information/:id",
        element: <EditInformation />,
      },
      {
        path: "/add-new-admin",
        element: <AddAdminForm />,
      },
      {
        path: "/password-reset",
        element: <PasswordReset />,
      },
      {
        path: "/doctor-profile-page/:id1/:id",
        element: <DoctorP />,
      },
      {
        path: "/admin-dashboard/verify-appointments",
        element: <VerifyAppointments />,
      },
      {
        path: "/doctor-edit-information/:id",
        element: (
          <PrivateRoute>
            <DoctorEditInformation />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-doctor-info/:id",
        element: <EditDoctorInfo />,
      },
      {
        path: "/edit-patient-info/:id",
        element: <EditPatientInfo />,
      },

      {
        path: "/change-password/:id",
        element: (
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        ),
      },

      {
        path: "/admin-dashboard/verify-doctor-list",
        element: <VerifiedDoctors />,
      },
      {
        path: "/admin-dashboard/available-doctor-list",
        element: <AvailableDoctors />,
      },
      {
        path: "/admin-dashboard/doctor-list",
        element: <Doctors />,
      },

      {
        path: "/admin-dashboard/patient-list",
        element: <Patients />,
      },
      {
        path: "/patient-dashboard/user-profile/:id",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/doctor-dashboard/doctor-user-profile/:id",
        element: (
          <PrivateRoute>
            <DoctorUserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/doctor-dashboard/view-appointments/:id",
        element: (
          <PrivateRoute>
            <ViewAppointments />
          </PrivateRoute>
        ),
      },
      {
        path: "/doctor-dashboard/edit-timing/:id",
        element: (
          <PrivateRoute>
            {" "}
            <EditTiming />
          </PrivateRoute>
        ),
      },
      {
        path: "/doctor-dashboard/doctor-take-help/:id",
        element: (
          <PrivateRoute>
            <DoctorTakeHelp />
          </PrivateRoute>
        ),
      },
      {
        path: "/patient-dashboard/find-doctors/:id",
        element: (
          <PrivateRoute>
            {" "}
            <FindDoctors />
          </PrivateRoute>
        ),
      },
      {
        path: "/patient-dashboard/take-appointment/:id",
        element: (
          <PrivateRoute>
            <TakeAppointment />
          </PrivateRoute>
        ),
      },
      {
        path: "/patient-dashboard/take-help/:id",
        element: (
          <PrivateRoute>
            {" "}
            <TakeHelp />
          </PrivateRoute>
        ),
      },
      {
        path: "/book-appointment/:id1/:id",
        element: (
          <PrivateRoute>
            <BookAppointment />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
      },
    ].filter(Boolean)
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
