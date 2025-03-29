import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteEmployee = () => {

  const {id} = useParams();
  const navigate = useNavigate()

  const handleDelete = async() => {
      try {
        await axios.delete(`http://localhost:8000/deleteEmployee/${id}`)
        console.log('employee deleted successfully')
        navigate('/')
      } catch (error) {
        console.error(error)
      }    
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className='card  text-center'>
          <div className="p-3">
          <RiDeleteBin6Line className='fs-1 text-primary mb-3'  />
          <h5 className='fw-bold mb-4 mx-auto' style={{maxWidth:"235px"}}>Are you sure you want to Delete</h5>
          </div>
          <div className='d-flex justify-content-center gap-1'>
            <button className='btn btn-danger w-50' onClick={()=>navigate('/')}>Cancel</button>
            <button className='btn btn-primary w-50' onClick={handleDelete} >Yes</button>
          </div>
      </div>
    </div>
  )
}

export default DeleteEmployee