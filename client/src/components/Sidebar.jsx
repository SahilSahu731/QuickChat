import { useEffect, useState } from 'react';
import React, { useContext } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';

const Sidebar = () => {

    const {getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages} = useContext(ChatContext)
    const {logout, onlineUsers} = useContext(AuthContext);
    const [input, setInput] = useState(false);
    const navigate = useNavigate();

    const filtereduser = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

    useEffect(() => {
        getUsers();
    }, [onlineUsers])

  return (
    <div className={`bg-[8185b2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}>
        <div className='pb-5 p-5'>
            <div className='flex justify-between items-center'>
                <img src={assets.logo} alt="" className='max-w-40' />
                <div className='relative py-2 group'>
                    <img src={assets.menu_icon} alt="" className='max-w-5 cursor-pointer' />
                    <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
                        <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>Edit Profile</p>
                        <hr className='my-2 border-t border-gray-500' />
                        <p onClick={logout} className='cursor-pointer text-sm'>Logout</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#282142] flex items-center gap-2 rounded-full px-4 py-3 mt-5'>
                <img src={assets.search_icon} alt="search" className='w-3' />
                <input onChange={(e)=> setInput(e.target.value)} type="text" placeholder='Search users....' className='bg-transparent border-none outline-none text-white text-md flex-[1_1_0%] w-full placeholder:[#c8c8c8]' />
            </div>
        </div>

        <div className='flex flex-col ml-4'>
            {filtereduser.map((user, index) => (
                <div onClick={() => {setSelectedUser(user); setUnseenMessages(prev => ({...prev, [user._id]:0}))}} key={user._id} className={`relative flex items-center gap-3 p-3 rounded-lg mb-2 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] ${selectedUser?._id === user._id ? 'bg-[#282142]/50' : ''}`}>
                    <img src={user?.profilePic || assets.avatar_icon} alt="profile" className='w-[35px] aspect-[1/1] rounded-full' />
                    <div className='flex flex-col leading-5'>
                        <p className='text-white text-lg font-bold'>{user.fullName}</p>
                        { onlineUsers.includes(user._id) ? <span className='text-green-400 text-md'>Online</span> : <span className='text-neutral-400 text-xs'>Offline</span>}
                    </div>
                    {unseenMessages[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>{unseenMessages[user._id]}</p>}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar
