import React, { useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('Martin Johndson');
  const [bio, setBio] = useState('Hello! I am using QuickChat.');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
        <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
           <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
             <h3>Profile Details</h3>
             <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
                <input onChange={(e) => setSelectedImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
                <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImage && "rounded-full"}`} />
                Upload Profile Picture
             </label>
             <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' />
             <textarea required value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Write a short bio' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600' rows={4}/> 
             <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>Update Profile</button>
           </form>
           <img src={assets.logo_icon} className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' alt="" />
        </div>
    </div>
  )
}

export default Profile
