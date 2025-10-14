import React, { useState } from 'react'
import assets from '../assets/assets'

const Login = () => {

  const [currState, setCurrState] = useState('Signup'); // Signup, Login
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === 'Signup' && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return
    }
    else {
      // login
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* left */}
        <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />
        {/* right */}
        <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 w-96 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
            <h2 className='font-medium text-2xl flex justify-between items-center'>
              {currState}
              {isDataSubmitted && <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} className='w-5 cursor-pointer' alt="" />}
            </h2>
            {currState === 'Signup' && !isDataSubmitted && <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />}
            {!isDataSubmitted && (
              <>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Email' required />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Password' required />
              </>
            )}

            {currState === 'Signup' && isDataSubmitted && (
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Add a Bio' />
            )}

            <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-lg cursor-pointer'> {currState === "Signup" ? "Create Account" : "Login Now"} </button>

            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <input type="checkbox"  />
              <p>Agree to terms and policy</p>
            </div>

            <div className='flex flex-col gap-2 items-center'>
              { currState === 'Signup' ? <p className='text-sm'>Already have an account? <span onClick={() => {setCurrState('Login'); setIsDataSubmitted(false)}} className='text-purple-400 cursor-pointer'>Login</span> </p> : (
                <p className='text-sm'>Don't have an account? <span onClick={() => {setCurrState('Signup'); setIsDataSubmitted(false)}} className='text-purple-400 cursor-pointer'>Signup</span> </p>
              ) }
            </div>
        </form>
    </div>
  )
}

export default Login
