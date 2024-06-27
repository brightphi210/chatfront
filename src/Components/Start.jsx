import React from 'react'
import { Link } from 'react-router-dom'
import { FaVideo } from "react-icons/fa6";
import { HiSquaresPlus } from "react-icons/hi2";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { BsArrowUpSquareFill } from "react-icons/bs";

const Start = () => {



  return (
    <div className='flex justify-center h-screen items-center'>
        <div className='grid grid-cols-2 gap-5 2xl:gap-10'>

            <Link to={'/create'}>
            <div className='text-center'>
                <p className='bg-orange-600 text-4xl text-white p-8 cursor-pointer rounded-3xl'><FaVideo /></p>
                <p className='text-xs pt-3'>Create</p>
            </div>
            </Link>

            <Link to={'/join'}>
            <div className='text-center'>
                <p className='bg-blue-600 text-4xl text-white p-8 cursor-pointer rounded-3xl'><HiSquaresPlus /></p>
                <p className='text-xs pt-3'>Join</p>
            </div>
            </Link>

            <div className='text-center' onClick={()=>document.getElementById('my_modal_2').showModal()}>
                <p className='bg-blue-600 text-4xl text-white p-8 cursor-pointer rounded-3xl'><RiCalendarScheduleFill /></p>
                <p className='text-xs pt-3'>Schedule</p>
            </div>

            <div className='text-center' onClick={()=>document.getElementById('my_modal_2').showModal()}>
                <p className='bg-blue-600 text-4xl text-white p-8 cursor-pointer rounded-3xl'><BsArrowUpSquareFill /></p>
                <p className='text-xs pt-3'>Share Screen</p>
            </div>
        </div>


        <dialog id="my_modal_2" className="modal">
          <div className="modal-box h-[15rem] flex justify-center items-center">
          <div>
              <h3 className="font-light text-sm text-center">Hello👋 this feature is</h3>
              <p className="py-4 2xl:text-2xl text-lg text-center font-bold">Comming Soon</p>
              <button onClick={()=>document.getElementById('my_modal_2').close()} className='bg-blue-600 flex m-auto justify-center px-10 py-3 rounded-lg text-white text-xs'>Close</button>
          </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </div>
  )
}

export default Start
