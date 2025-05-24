import React from 'react'
import { Link } from 'react-router-dom'
function Home() { 
  return (

    <div className='w-full flex justify-center absolute top-[8%] left-0 right-0 bottom-0 items-center bg-gray-800 text-white'> 
        <div className='text-center'>
            <h1 className='text-5xl font-bold mb-4'>Welcome to CodeX Editor</h1>
            <p className='text-lg mb-8'>Your one-stop solution for all your coding needs.</p>
            <Link to='/editor' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Start Coding</Link>
        </div>
    </div>

  )
}

export default Home
