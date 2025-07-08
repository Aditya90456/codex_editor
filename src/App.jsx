import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Navbar from './component/Navbar'
import Home from './component/Home'
import Editor from './component/Editor' 
import Cpp from './component/Cpp'
import { motion } from 'motion/react' 
import Prob from './component/Prob'
import TwoSum from './component/Twosum'
import { path } from 'motion/react-client'
import Ls from './component/Ls'
import Mtsa from './component/Mtsa'
import Liya from './component/Liya'
import Login from './component/Login'
import Signup from './component/Signup'
import Dashboard from './component/Dashboard'
import Logout from './component/Logout'
import Mentorship from './component/Mentorship'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            scale={{ x: 0, y: 5 }}
            transition={{ duration: 0.7, type: 'tween' }} 
          >
            <Home />
          </motion.div>
        </>
      )
    },
    {
      path: '/editor',
      element: (
        <>
          <Navbar />
          <Editor />
        </>
      )
    }, 
    {
      path: '/cpp',
      element: (
        <>
          <Navbar />
          <Cpp />
        </>
      )
    },
    {
      path:'/prob',
      element: (

        <> 
        <Navbar />
        <Prob />
        </>
      )   
    },
    {
      path:'/two-sum',
      element: (
        <>
          <Navbar />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}  

            >
              <TwoSum />
              </motion.div>
          </motion.div>
        </>
      )
    },
    {
      path: '/longest-substring',
      element: (
        <>
          <Navbar />  
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Ls />
            </motion.div>

          </motion.div>
        </>
      )
  },
  {
    path:'/median-of-two-sorted-arrays',
    element: (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Mtsa />        </motion.div>
          </motion.div> 
      </>
    )
  },
  {
    path:'/AI-topic-guide',
    element: (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}

          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Liya />
          </motion.div>
        </motion.div>
      </>
    )
  },
  {
    path:'/login',
    element: (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Login />
          </motion.div>
        </motion.div>
      </>
    ) 
  },
  {
    path:'/signup',
    element: (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Signup />
          </motion.div>
        </motion.div>
      </>
    )
  },
  {
    path:'/dashboard',

    element: (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Dashboard />
          </motion.div>
        </motion.div>
      </>
    )
  },
  {
    path:'/logout',
    element: (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          > 
            <Logout />
          </motion.div>
        </motion.div>
      </>
    )
  },
  {
    path:'/mentorship',
    element: (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Mentorship />
          </motion.div>
        </motion.div>
      </>
    )
  },
  {
    path:'/ai',
    element: (
      <>
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              <h1 className="text-4xl text-white font-bold mb-4">AI Mentorship Program</h1>
              <p className="text-white text-lg mb-4">Coming Soon</p>
            </div>
          </motion.div>
        </motion.div>
      </>
    )
  }
  ])

  return <RouterProvider router={router} />
}
export default App