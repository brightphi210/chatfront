import React,{useState, useEffect, useRef} from 'react'
import { IoSend } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { TbMessageCircleOff } from "react-icons/tb";
import Picker from '@emoji-mart/react'
import data  from '@emoji-mart/data'
import previewPosition  from '@emoji-mart/data'


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


  
    const sendMessage = (e) => {
        e.preventDefault();
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
        setShowPicker(false);

    };

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [messages, messages1]);
    

    console.log(messages1.length);


    const textareaRef = useRef(null);
    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [message]);

      

      const [showPicker, setShowPicker] = useState(false);

      const addEmoji = (e) => {
        let emoji = e.native;
        setMessage((prevText) => prevText + emoji);
      };


  return (
    <div>
        <div className='flex 2xl:px-[10rem] px-5 items-center bg-neutral-100 w-full py-4 fixed z-50'>
            <h2 className='text-xs'><span className='text-blue-600 font-bold'>{room_name.toLocaleUpperCase()}</span> Group Chat</h2>
            <h2 className='text-xs ml-auto cursor-pointer bg-blue-600 py-2 px-5 text-white rounded-full' onClick={leaveChat}>Leave Group</h2>
        </div>




        {messages1 && messages1.length === 0 && messages.length === 0 ? (
            <div className='flex h-screen justify-center items-center'>
                <div className='text-center'>
                    <p className='flex m-auto justify-center text-4xl opacity-35'><TbMessageCircleOff /></p>
                    <p className='text-xs'>No Message</p>
                </div>
            </div>
        ) : (

            <div ref={chatContainerRef} className='2xl:px-[10rem] px-5 w-full py-20 lg:h-[90vh] h-[90vh] overflow-y-scroll'>
                {messages1.map((msg, index) => (
                    
                    <div className='flex flex-col gap-10 w-full' key={index}>

                        {sender === msg.sender ? (

                            <div class="chat chat-end my-2">
                                <div className='flex items-center gap-3'>
                                    <div class="chat-bubble bg-blue-700  text-white w-fit max-w-xs break-words">
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
                                <div className="chat-bubble bg-neutral-100 text-black max-w-xs break-words">
                                    <p className='text-[10px] opacity-70 text-left'>{msg.sender}</p>
                                    <p className='text-xs'>{msg.message}</p>
                                </div>
                                </div>
                            </div>                  
                        )}
                    </div>
                ))}


                {messages.map((msg, index) => (
                    
                    <div className='flex flex-col gap-3 w-full' key={index}>

                    {sender === msg.message.sender ? (

                        <div class="chat chat-end my-2">
                            <div className='flex items-center gap-3'>
                                <div class="chat-bubble bg-blue-700  text-white max-w-xs break-words">
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
                            <div className="chat-bubble bg-neutral-100  text-black max-w-xs break-words">
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


        <div className=' fixed  bottom-0 py-5 pt-5 border-t bg-white border-neutral-200 w-full right-0 left-0 justify-center 2xl:px-[10rem] px-5'>

        <form className='flex relative items-center gap-3 w-full' onSubmit={sendMessage}>

            <div className='relative w-full flex'>
            <textarea type="text" 
                placeholder="Enter Message" 
                ref={textareaRef}
                className="input text-xs input-bordered w-full resize-none lg:max-h-[6rem] min-h-[2rem] max-h-[6rem] overflow-auto py-3 lg:pr-20 pr-10 rounded-lg" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className='absolute right-3 lg:ml-5 ml-16 lg:bottom-1 bottom-2 top-3 lg:p-3 p-3  bg-white flex justify-center items-center  rounded-full cursor-pointer' onClick={() => setShowPicker((val) => !val)}>
            <img
                className="emoji-icon lg:w-6 w-6"
                src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            />
            </div>
            </div>

            {showPicker && (
                <span className='w-full absolute bottom-[100px] left-0'>
                    <Picker data={data} onEmojiSelect={addEmoji} className=""/>
                </span>
            )}

            <button disabled={!message} type='submit'  className="border-none bg-blue-700 text-white text-base flex gap-3 items-center p-3 rounded-full justify-center ">
                {isLoading === false ?  <IoSend /> : <span className="loading loading-spinner loading-sm"></span>}
            </button>
        </form>
        </div> 
    </div>
  )
}

export default Chat
