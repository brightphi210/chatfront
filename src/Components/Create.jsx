import React, { useState } from 'react'
import { validationSchema } from './validate';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { IoSend } from "react-icons/io5";
const Create = () => {

    const navigate = useNavigate()

    const room_name = localStorage.getItem('room_name')


    const url = 'https://chat-cs4t.onrender.com/api/'
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [show, setShow] = useState(false)


    const [message1, setMessage1] = useState('')
    const [show1, setShow1] = useState(false)

    
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


                // setTimeout(() => {
                //     navigate('/join')
                // }, 1000);

                setLoading(false)
                setShow(true);
                setTimeout(() => {
                    setShow(false)
                }, 4000);
                setMessage(data.message)
                document.getElementById('my_modal_3').showModal()
            }

            else if(response.status === 400) {
                
                setShow1(true);
                setTimeout(() => {
                    setShow1(false);
                }, 2000);

                
                setMessage1(data.message)
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


    const [copySuccess, setCopySuccess] = useState('');

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(
          () => setCopySuccess('Copied!'),
          (err) => setCopySuccess('Failed to copy!')
        );
      };




      const handleShare = async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Check this out!',
              text: `Hello 👋😊,hope you're doing well, I wanted to invite you to Join me on VOICE APP for a chat. Looking forward to chatting with you soon! https://voicechats.vercel.app/join , my VOICE APP Room name is 👉 ${room_name}`,
              url: 'https://voicechats.vercel.app/join',
            });
            console.log('Link shared successfully');
          } catch (error) {
            console.error('Error sharing the link:', error);
          }
        } else {
          alert('Web Share API is not supported in your browser.');
        }
      };




  return (
    <div className='flex justify-center lg:h-screen h-[90vh] items-center'>
        

        {show && (<>
        
            <div role="alert" data-aos="fade-up" data-aos-duration="500" className="alert alert-success flex items-center  text-xs max-h-[3rem] text-white absolute w-fit top-20">
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


        {show1 && (<>
        
        <div role="alert" data-aos="fade-up" data-aos-duration="500" className="alert alert-error flex items-center  text-xs max-h-[3rem] text-white absolute w-fit top-20">
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
            <span>{message1}</span>
        </div>
    </>)}


      <form action="" autoComplete='off' onSubmit={handleSubmit} className='flex flex-col 2xl:w-[25%] w-full px-5 2xl:p-0 gap-4'>

        <h2 className='text-center text-lg font-bold'>CREAT A ROOM 😊😊</h2>
        <p className='text-sm text-center'>Create a room and start chatting with friends</p>
        <input 
            type="text" 
            placeholder="Enter your username"  
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


        <button type="submit" className="btn btn-neutral bg-blue-800 border-none hover:bg-blue-900">{loading === true ? <span className="loading flex items-center gap-3 loading-spinner loading-sm"></span> :  <>Create Room<IoSend /></>}</button>
      </form>

        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box h-[25rem] relative justify-center items-center flex">

            <div className='lg:p-8 p-5'>
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div>

                    <h3 className="text-lg font-bold text-center">Invite Your Friends</h3>
                    <p className='py-3 text-center lg:text-sm text-xs'>
                        Hello 👋😊, lt I wanted to invite 
                        you to Join me on VOICE for a chat. 
                        Looking forward to chatting with you soon!
                    </p>

                    <div className='flex flex-col gap-3'>
                        <input onClick={() => copyToClipboard('https://voicechats.vercel.app/join')} type="text" value="https://voicechats.vercel.app/join" readOnly  
                            className='outline-none text-center text-sm text-blue-700 underline cursor-pointer'
                        />

                        <div className='flex items-center w-full mt-3 gap-5'>
                            <button onClick={() => copyToClipboard( `Hello 👋😊,hope you're doing well, I wanted to invite you to Join me on VOICE APP for a chat. Looking forward to chatting with you soon! https://voicechats.vercel.app/join , my VOICE APP Room name is 👉 ${room_name}`)} 
                                className='bg-blue-700 text-white py-3 rounded-md text-xs w-full'>{copySuccess ? copySuccess : 'Copy Invitation Link'}
                            </button>
                            <button onClick={handleShare} className='w-[60%] border border-blue-600 p-3 rounded-md text-xs text-blue-600'>Share Link</button>
                        </div>
                        
                        
                        <Link to={'/join'}><button className='bg-green-700 m-auto w-full text-white p-3 rounded-md text-xs mt-2'>Join Your Room</button></Link>
                    </div>


                </div>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default Create
