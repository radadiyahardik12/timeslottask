import React, { useEffect, useState } from 'react'
import customerservise from '../customer/customerservise';
import AdminDashboard from './AdminDashboard';
import ClientDashboard from './ClientDashboard';

const Dashboard = () => {
    const isAdmin =  localStorage.getItem("is_admin") == true ? true : false;
  return (
    <div>
        {
            isAdmin ?  <AdminDashboard/> : <ClientDashboard/>
        }
    </div>
  )
}

export default Dashboard