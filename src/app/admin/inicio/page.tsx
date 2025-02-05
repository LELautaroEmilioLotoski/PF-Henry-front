import React from 'react'
import AdminView from '@/views/AdminView/inicio/AdminView'
import DashboardHeader from '@/components/specific/adminHeader/AdminHeader'

const page = () => {
  return (
    <div className='flex m-auto'>
        <DashboardHeader/>
        <AdminView/>
    </div>
  )
}

export default page