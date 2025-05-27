import React from 'react'
import { Link } from 'react-router-dom'
import { FaHtml5, } from 'react-icons/fa6'
import { CgCPlusPlus } from 'react-icons/cg'
import { motion } from 'framer-motion'
function Home() { 
  return (

    <div className='w-full flex justify-center absolute top-[8%] left-0 right-0 bottom-0 items-center bg-gray-800 text-white'> 
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center'>
            <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}


                              transition={{ duration: 0.9, type: 'spring', stiffness: 100 }}
            className='text-5xl font-bold mb-5'>Welcome to CodeX</motion.h1>
            <motion.p 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-lg mb-10'>Your go-to platform for web development and C++ coding.</motion.p>
            <div className="flex justify-center items-center flex-wrap">
            <Link to='/editor' className=' text-white hover:scale-110 duration-300 flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 font-bold py-3 px-4 rounded-full mr-2'> <FaHtml5 className='h-6 w-6 m-auto' />Web Development Editor </Link>
            <Link to='/cpp' className=' text-white hover:scale-110 duration-300 flex items-center justify-center bg-red-500 hover:bg-red-600  gap-3 font-bold py-3 px-4 rounded-full ml-2'> <CgCPlusPlus className='h-6 w-6 m-auto' /> C++ Editor</Link>
                        </div>
        </div>
    </div>

  )
}

export default Home
