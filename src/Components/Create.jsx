import React, { useState } from 'react'
import { validationSchema } from './validate';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
const Create = () => {

    const navigate = useNavigate()


    const url = 'https://chat-cs4t.onrender.com/api/'
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)

    
    const onSubmitFunc = async () => {
        setLoading(true)

        try {
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: values.username,
                    room_name: values.room
                })
                
            })


            const data = await response.json();
            if(response.ok || response.status === 200) {

                localStorage.setItem('room_name', values.room);


                setTimeout(() => {
                    navigate('/join')
                }, 1000);

                setLoading(false)
                setShow(true);
                setMessage(data.message)
            }
            console.log(data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues :{
            username: '',
            room: '',
        },

        validationSchema : validationSchema,
        onSubmit: onSubmitFunc,
    })


  return (
    <div className='flex justify-center h-screen items-center'>
        

        {show && (<>
        
            <div role="alert" data-aos="fade-up" data-aos-duration="500" className="alert alert-success  text-xs max-h-[4rem] text-white absolute w-fit top-20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{message}</span>
            </div>
        </>)}


      <form action="" autoComplete='off' onSubmit={handleSubmit} className='flex flex-col 2xl:w-[25%] w-full px-5 2xl:p-0 gap-4'>

        <h2 className='text-center text-lg font-bold'>Create a room </h2>
        <input 
            type="text" 
            placeholder="Enter username"  
            className={errors.username ? "input text-xs input-bordered w-full border-red-500" : "input border-green-700 text-xs input-bordered w-full" }
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            name='username'
        />

        {errors.username && <p className="text-red-400 text-xs font-light">{errors.username}</p>}


        <input 
            type="text" 
            placeholder="Enter room name"  
            className={errors.room ? "input text-xs input-bordered w-full border-red-500" : "input border-green-700 text-xs input-bordered w-full" }
            value={values.room}
            onChange={handleChange}
            onBlur={handleBlur}
            name='room'
        />
        {errors.room && <p className="text-red-400 text-xs font-light">{errors.room}</p>}


        <button type="submit" className="btn btn-neutral bg-blue-800 border-none hover:bg-blue-900">{loading === true ? <span className="loading loading-spinner loading-sm"></span> :  'Create'}</button>
      </form>
    </div>
  )
}

export default Create
