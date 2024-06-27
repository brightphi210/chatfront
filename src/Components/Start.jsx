import React from 'react'
import { Link } from 'react-router-dom'
import { FaVideo } from "react-icons/fa6";
import { HiSquaresPlus } from "react-icons/hi2";

const Start = () => {


  return (
    <div className='flex justify-center h-screen items-center'>
        <div className='flex gap-10'>

            <Link to={'/create'}>
            <div className='text-center'>
                <p className='bg-orange-600 text-5xl text-white p-8 cursor-pointer rounded-2xl'><FaVideo /></p>
                <p className='text-xs pt-3'>Create</p>
            </div>
            </Link>

            <Link to={'/join'}>
            <div className='text-center'>
                <p className='bg-blue-600 text-5xl text-white p-8 cursor-pointer rounded-2xl'><HiSquaresPlus /></p>
                <p className='text-xs pt-3'>Join</p>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default Start
