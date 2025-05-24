import React from 'react'
import { Link } from'react-router-dom'
function Navbar() {
  return (
    <div className="bg-gray-800 w-full h-16 flex justify-between items-center px-4 py-2">
        <div className="text-white text-2xl font-bold">CodeX Editor</div>

       <div className="nav-links flex items-center">
            <Link to="/" className="text-white hover:text-gray-400 mx-4">Home</Link>
            <Link to="/editor" className="text-white hover:text-gray-400 mx-4">Editor</Link> 
        </div>
 
    </div>
  )
}

export default Navbar