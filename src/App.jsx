import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Navbar from './component/Navbar'
import Home from './component/Home'
import Editor from './component/Editor'
import Problemset from './component/Problemset'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home />
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
      path: '/++++++++++++++++++++++++++----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*******************************************problemset',
      element:(
        <>    
          <Problemset />
        
        </>
      )                         
    }
  ])

  return <RouterProvider router={router} />
}

export default App