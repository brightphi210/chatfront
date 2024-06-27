import React from 'react'
import { Link } from 'react-router-dom'
import a from '../images/aa.png'

const Navbar = () => {
  return (
    <div className='flex text-xs 2xl:px-[10rem] px-5 fixed w-full items-center bg-white text-black p-3 border border-neutral-200'>
      <Link to={'/'}>
        <div className='flex items-center'>
            <img src={a} alt="" className='w-8 '/>
            <p className='text-base font-bold'>VOICE</p>
        </div>
      </Link>

      <ul className='flex ml-auto 2xl:gap-10 gap-3 items-center'>

        <Link to={'/join'}>
            <li className='cursor-pointer text-xs underline'>Join Room</li>
        </Link>


        <Link to={'/create'}>
            <li className='bg-blue-700 py-3 2xl:py-3  text-xs px-4 text-white rounded-md cursor-pointer'>Create Room</li>
        </Link>


      </ul>
    </div>
  )
}

export default Navbar
