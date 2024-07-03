import React,{useState, useEffect} from 'react'
import { IoSend } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { TbMessageCircleOff } from "react-icons/tb";

const Chat = () => {

    const navigate = useNavigate()
    const [messages, setMessages] = useState([]);
    const [messages1, setMessages1] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsloading] = useState(false);

    const sender = localStorage.getItem('username')
    const room_name = localStorage.getItem('room_name')
    const exist = localStorage.getItem('exist')
    // console.log('This is sender', sender);


    const leaveChat = () => {
        localStorage.removeItem('username')
        navigate('/join')
    }

  let ws;

  useEffect(() => {
    const fetchMessages = async () => {
        const response = await fetch(`https://chat-cs4t.onrender.com/api/chatsAll/${room_name}`);
        const data = await response.json();
        console.log('This is my data',data);
        setMessages1(data.messages);
    };

    const websocketProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    // const wsEndpoint = `${websocketProtocol}://localhost:8000/ws/notification/${room_name}/`;
    const wsEndpoint = `wss://chat-cs4t.onrender.com/ws/notification/${room_name}/`;

    ws = new WebSocket(wsEndpoint);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    fetchMessages();


    return () => {
      ws.close();
    };
  }, [room_name]);

    const websocketProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    // const wsEndpoint = `${websocketProtocol}://localhost:8000/ws/notification/${room_name}/`;
    const wsEndpoint = `wss://chat-cs4t.onrender.com/ws/notification/${room_name}/`;


  
    const sendMessage = () => {

        setIsloading(true)
        const socket = new WebSocket(wsEndpoint);
        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    message,
                    room_name,
                    sender
                })
            );
        setIsloading(false)

        };
        setMessage('')

    };


    console.log(messages1.length);

  return (
    <div>
        <div className='flex 2xl:px-[10rem] px-5 items-center bg-neutral-100 w-full py-4 fixed z-50'>
            <h2 className='text-xs'><span className='text-blue-600 font-bold'>{room_name.toLocaleUpperCase()}</span> Group Chat</h2>
            <h2 className='text-xs ml-auto cursor-pointer bg-blue-600 py-2 px-5 text-white rounded-full' onClick={leaveChat}>Leave Group</h2>
        </div>




        {messages1 && messages1.length === 0 && messages.length === 0 ? (
            <div className='flex h-screen m justify-center items-center'>
                <div className='text-center'>
                    <p className='flex m-auto justify-center text-4xl opacity-35'><TbMessageCircleOff /></p>
                    <p className='text-xs'>No Message</p>
                </div>
            </div>
        ) : (

            <div className='2xl:px-[10rem] px-5 w-full py-20 h-[90vh] overflow-y-scroll'>
                {messages1.map((msg, index) => (
                    
                    <div className='flex flex-col gap-10 w-full'>

                        {sender === msg.sender ? (

                            <div class="chat chat-end my-2">
                                <div className='flex items-center gap-3'>
                                    <div class="chat-bubble bg-blue-700  text-white">
                                        <p className='text-[10px] opacity-70 text-left'>{msg.sender}</p>
                                        <p className='text-xs'>{msg.message}</p>
                                    </div>
                                    <p className='bg-neutral-200 p-2 px-3 flex justify-center items-center rounded-full text-xs'>{msg.sender.slice(0,1).toLocaleUpperCase()}</p>
                                </div>

                            </div>  
                        ) : (

                            <div className="chat chat-start my-2">
                                <div className='flex items-center gap-3'>
                                <p className='bg-blue-800 text-white p-2 px-3 flex justify-center items-center rounded-full text-xs'>{msg.sender.slice(0,1).toLocaleUpperCase()}</p>
                                <div className="chat-bubble bg-neutral-100  text-black">
                                    <p className='text-[10px] opacity-70 text-left'>{msg.sender}</p>
                                    <p className='text-xs'>{msg.message}</p>
                                </div>
                                </div>
                            </div>                  
                        )}
                    </div>
                ))}


                {messages.map((msg, index) => (
                    
                    <div className='flex flex-col gap-3 w-full'>

                    {sender === msg.message.sender ? (

                        <div class="chat chat-end my-2">
                            <div className='flex items-center gap-3'>
                                <div class="chat-bubble bg-blue-700  text-white">
                                    <p className='text-[10px] opacity-70 text-left'>{msg.message.sender}</p>
                                    <p className='text-xs'>{msg.message.message}</p>
                                </div>
                                <p className='bg-neutral-200 p-2 px-3 flex justify-center items-center rounded-full text-xs'>{msg.message.sender.slice(0,1).toLocaleUpperCase()}</p>
                            </div>
                        </div> 
                    ) : (

                        <div className="chat chat-start my-2">
                            <div className='flex items-center gap-3'>
                            <p className='bg-blue-800 text-white p-2 px-3 flex justify-center items-center rounded-full text-xs'>{msg.message.sender.slice(0,1).toLocaleUpperCase()}</p>
                            <div className="chat-bubble bg-neutral-100  text-black">
                                <p className='text-[10px] opacity-70 text-left'>{msg.message.sender}</p>
                                <p className='text-xs'>{msg.message.message}</p>
                            </div>
                        </div>
                    </div>                    
                    )}
                </div>
                ))}
            </div>
        )}


        <div className=' absolute bottom-0 py-5 pt-5 border-t bg-white border-neutral-200 w-full right-0 left-0 justify-center 2xl:px-[10rem] px-5'>

        <div className='flex relative'>
            <input type="text" 
                placeholder="Enter Message" 
                className="input text-xs input-bordered w-full 2xl:py-7 py-4 rounded-full" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button disabled={!message} type='button' onClick={sendMessage} className="border-none bg-blue-700 text-white absolute text-xs flex gap-3 items-center rounded-full py-3 lg:px-5 px-4 lg:right-1.5 right-0 lg:top-1 h-[3rem]">
                {isLoading === false ?  <>Send <IoSend /></>  : <span className="loading loading-spinner loading-md"></span>}
            </button>
        </div>
        </div>
    </div>
  )
}

export default Chat
