import React from 'react'
import {createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';



function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/>
    },
  ])
  return (
    <>
    
   <RouterProvider router={router}/>
   </>
  );
}

export default App;
