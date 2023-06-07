import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession, setSession, clearSession } from '../helper/session';
import AddContact from './add_contact';
import io from 'socket.io-client';

const ChatPage = () => {
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [chats, setChats] = useState([]);
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [msg,setMsg] = useState("");
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        if (!getSession()) return navigate('/auth');
        const socket = io('http://localhost:5000');
        setSocket(socket)
        const session = getSession();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: session.id
            }),
        };
        fetch("http://localhost:5000/chat/rooms", options).then(response => { return response.json() })
        .then((data) => {
            setRooms(data.rooms)    
        })
        .catch(err => {
            console.log(err);
        })

        socket.on('message', data => {
            console.log(data)
            setChats((prevChats) => [...prevChats, data]);
        })
    }, [])

    const getID = () => {
        return (getSession()).id;
    }
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleLogout = () => {
        clearSession();
        navigate('/auth')
    }

    const handleMessage = (e) => {
        setMsg(e.target.value);
    };
    const handleLoadChats = (id, name, r) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        };
        fetch("http://localhost:5000/chat/rooms/get", options).then(response => { return response.json() })
        .then((data) => {
            setName(name)
            setChats(data.chats)
            if(room != ""){
                socket.emit('leave', room);
            }
            setRoom(r)
            socket.emit('join-room', r)
        })
        .catch(err => {
            console.log(err);
        })


    }

    const handleSendMessage = () =>{
        if(msg == "") return;
        const data = {
            from: getID(),
            message: msg,
            room: room
        }
        socket.emit("message",data)
        setMsg("")
    }
    return (
        <div className="">
            <header className="bg-white shadow py-2 px-4 flex justify-between">
                <h1 className="text-2xl text-green-700 font-bold">Messenger</h1>
                <button onClick={handleLogout} className="bg-white text-red-700 font-semibold">Logout</button>
            </header>
            <div className=" text-white min-h-screen flex">
                <div className="flex  flex-col bg-green-700 w-[15%] p-2">
                    <button className="bg-white text-green-700 font-semibold p-2 rounded hover:bg-gray-100" onClick={handleOpenModal}> Chat Someone</button>
                    <AddContact isOpen={modalOpen} onClose={handleCloseModal} > </AddContact>
                    <div className="flex flex-col contacts-container mt-[2rem] gap-2">
                        <p className="text-white font-semibold">Contacts:</p>
                        {rooms.map((e, i) => {
                            if (e.from === getID()) {
                                return <button key={i} className='bg-white text-green-700 px-2 py-2 rounded flex font-semibold place-items-center gap-2' onClick={() => handleLoadChats(e.id, e.to_name,e.room_id)}>
                                    <i className="fas fa-circle-user fa-2xl"></i>
                                    <p className='text-capitalize'>{e.to_name}</p>
                                </button>
                            }
                            if (e.to === getID()) {
                                return <button key={i} className='bg-white text-green-700 px-2 py-2 rounded flex font-semibold ' onClick={() => handleLoadChats(e.id,e.from_name, e.room_id)}>
                                    <p className='text-capitalize'>{e.from_name}</p>
                                </button>
                            }

                        })}
                    </div>
                </div>
                <div className="flex-1 flex flex-col ">
                    <div className="flex flex-col h-screen">
                        <div className="flex-1 overflow-y-auto">
                            { chats.length === 0 && (
                            <div className="flex flex-col place-items-center mt-[15%]">
                                <p className="font-semibold text-green-700 text-2xl">Select on contacts to start message.</p>
                            </div>
                            )}

                            <div className="flex flex-col  gap-4 my-4 mx-4 space-y-2">
                                {chats.map((e, i) => {
                                    if (e.from_id === getID()) {
                                        return <div className="flex items-start ">
                                            <div className="rounded-full h-6 w-6 bg-green-700 flex items-center justify-center text-white font-bold"><i className="fas fa-circle-user"></i></div>
                                            <div className="ml-2">
                                                <div className="bg-white shadow-lg border p-2 rounded-md">
                                                    <p className="text-green-700">{e.chat}</p>
                                                </div>
                                                <p className="text-sm text-gray-400">{e.created_at}</p>
                                            </div>
                                        </div>
                                    }
                                    else {
                                        return (
                                        <div className="flex flex-row gap-4 place-items-center">
                                            
                                            <div className="ml-auto">
                                                <p className='text-gray-400 text-sm'>{name}</p>
                                                <div className="bg-green-700 p-2 rounded-md">
                                                    <p className="text-white">{e.chat}</p>
                                                </div>
                                                <p className="text-sm text-gray-400">{e.created_at}</p>
                                            </div>
                                            <div className="rounded-full h-6 w-6 bg-green-700 flex items-center justify-center text-white font-bold"><i className="fas fa-circle-user"></i></div>
                                        </div>
                                        )
                                    }
                                })}

                            </div>
                        </div>


                        <div className="bg-green-800 py-2 px-4 sticky bottom-0 ">
                            <div className="flex items-center">
                                <input onChange={handleMessage}
                                    type="text"
                                    className="flex-1 py-2 px-3 rounded-full bg-green-700 border-none text-white focus:outline-none"
                                    placeholder="Type your message..."
                                />
                                <button className="ml-2 px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-600 focus:outline-none" onClick={handleSendMessage}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChatPage;
