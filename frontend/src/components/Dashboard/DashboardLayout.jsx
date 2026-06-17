import React from 'react'
import Navbar from '../navbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default DashboardLayout