import React,{useState, useEffect} from 'react'
import { IoSend } from "react-icons/io5";

const Chat = () => {


    const [messages, setMessages] = useState([]);
    const [messages1, setMessages1] = useState([]);
    const [message, setMessage] = useState('');
    const [isDisable, setIsDisable] = useState(false);


    const sender = localStorage.getItem('username')
    const room_name = localStorage.getItem('room_name')
    console.log('This is sender', sender);


  let ws;

  useEffect(() => {

    const fetchMessages = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/chatsAll/${room_name}`); // Replace with your API endpoint
        const data = await response.json();
        setMessages1(data.messages);
    };


    const websocketProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsEndpoint = `${websocketProtocol}://localhost:8000/ws/notification/${room_name}/`;

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
  const wsEndpoint = `${websocketProtocol}://localhost:8000/ws/notification/${room_name}/`;
  
    const sendMessage = () => {
        const socket = new WebSocket(wsEndpoint);
        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    message,
                    room_name,
                    sender
                })
            );
        };
        setMessage('')
    };



  return (
    <div>
        <div className='flex px-[10rem] bg-neutral-100 w-full'>
            <h2 className='py-3 text-xs'><span className='text-blue-600 font-bold'>{room_name.toLocaleUpperCase()}</span> Group Chat</h2>
            <h2 className='py-3 text-xs ml-auto '>Leave Group</h2>
        </div>
        
        <div className='2xl:px-[10rem] px-5 w-full py-14 pb-20 h-[90vh] overflow-y-scroll'>
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


            <div className=' absolute bottom-0 py-5 pt-5 border-t bg-white border-neutral-200 w-full right-0 left-0 justify-center 2xl:px-[10rem] px-5'>

                <div className='flex relative'>
                    <input type="text" 
                        placeholder="Enter Message" 
                        className="input text-xs input-bordered w-full 2xl:py-7 py-4 rounded-full" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button disabled={!message} type='button' onClick={sendMessage} className="border-none bg-blue-700 text-white absolute rounded-full p-3 2xl:top-2 top-1 right-2 2xl:right-4">
                        <IoSend />
                    </button>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Chat
