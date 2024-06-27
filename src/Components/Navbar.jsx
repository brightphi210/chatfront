import React from 'react'
import { Link } from 'react-router-dom'
import a from '../images/aa.png'

const Navbar = () => {
  return (
    <div className='flex text-xs px-[10rem] fixed w-full items-center bg-white text-black p-3 border border-neutral-200'>
      <Link to={'/'}>
        <div className='flex items-center'>
            <img src={a} alt="" className='w-10 '/>
            <p className='text-lg font-bold'>VOICE</p>
        </div>
      </Link>

      <ul className='flex ml-auto gap-10 items-center'>

        <Link to={'/join'}>
            <li className='cursor-pointer underline'>Join Room</li>
        </Link>


        <Link to={'/create'}>
            <li className='bg-blue-700 py-3 px-6 text-white rounded-md cursor-pointer'>Create Room</li>
        </Link>


      </ul>
    </div>
  )
}

export default Navbar
