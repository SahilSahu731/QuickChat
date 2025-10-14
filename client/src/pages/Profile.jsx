import React, { useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('Martin Johndson');
  const [bio, setBio] = useState('Hello! I am using QuickChat.');
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
        <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
           <form className='flex flex-col gap-5 p-10 flex-1'>
             <h3>Profile Details</h3>
             <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
                <input onChange={(e) => setSelectedImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden />
                <img src={assets} alt="" />
             </label>
           </form>
           <img src="" alt="" />
        </div>
    </div>
  )
}

export default Profile
