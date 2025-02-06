import React from 'react'
import RegisterWorker from '@/components/specific/Register/RegisterWorker'
 
function CreateEmployee() {
  return (
    <div>
      <div className="flex justify-center">
        <h1>Crear nuevo Empleado</h1>
      </div>
      <RegisterWorker />
    </div>
  )
}
 
export default CreateEmployee