import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Navbar from './component/Navbar'
import Home from './component/Home'
import Editor from './component/Editor' 
import Cpp from './component/Cpp'
import { motion } from 'motion/react'
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
    }
  ])

  return <RouterProvider router={router} />
}

export default App