import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../navbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="dark"
    />
    </>
  )
}

export default DashboardLayout