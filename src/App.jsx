import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Navbar from './component/Navbar'
import Home from './component/Home'
import Editor from './component/Editor' 
import Cpp from './component/Cpp'
 
import Prob from './component/Prob'
import TwoSum from './component/Twosum'
import Ls from './component/Ls'
import Mtsa from './component/Mtsa'
import Liya from './component/Liya'
import Login from './component/Login'
import Signup from './component/Signup'
import Dashboard from './component/Dashboard'
import Logout from './component/Logout'
import Mentorship from './component/Mentorship'
import AI from './component/AI'
import Python from './component/Python'
import JavaScriptEditor from './component/Js' 
import Roadmap from './component/Roadmap'  
import { motion } from 'framer-motion'
import DSARoadmapLanding from './component/Roadmapdsa'
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
            <AI />
          </motion.div>
        </motion.div>
      </>
    )
  },
  {
    path:'/python',
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
            <Python />
          </motion.div>
        </motion.div>
      </>
    )
  },
  {
    path:'/js',
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
            <JavaScriptEditor />
            </motion.div>
          </motion.div>
      </>
    )
  },
  
  {
    path: '/roadmap',
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
          <Roadmap/>
          </motion.div>
          </motion.div>
          </>
    )
  },
  {
    path: '/dsaroadmap',
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
          <DSARoadmapLanding />
        </motion.div>
      </motion.div>
      </>
    )
  }
  ])

  return <RouterProvider router={router} />
}
export default App