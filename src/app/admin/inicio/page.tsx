import React from 'react'
import AdminView from '@/views/AdminView/inicio/AdminView'
import DashboardSidebar from '@/components/header/Header'
const page = () => {
  return (
    <div className='flex m-auto'>
        <DashboardSidebar/>
        <AdminView/>
    </div>
  )
}

export default page