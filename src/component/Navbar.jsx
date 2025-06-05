import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import Logo from '../assets/cx.png'; // Corrected import for the logo image
import axios from 'axios';

function Navbar() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user'); // Adjust the URL as needed
        setUsername(response.data[0].username || ''); // Use optional chaining to avoid undefined access
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="text-white text-[16px] font-bold bg-gray-800 w-full h-16 flex flex-row justify-evenly items-center px-4 shadow-md">
      {/* Logo Section */}
      <div className="logo flex items-center gap-2">
        <img src={Logo} alt="CodeX Logo" className="h-10 w-10" />
        <span>CodeX Editor</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links flex text-[16px] items-center gap-4"> 
        <Link to="/" className="text-white hover:text-gray-400">Home</Link>
        <Link to="/editor" className="text-white hover:text-gray-400">Web Development Editor</Link>
        <Link to="/cpp" className="text-white  ">C++ Editor</Link>      </div>
        <Link to='/AI-Topic-Guide' className="text-white hover:text-gray-400 mx-1">
        Dsa Topic Guide
        </Link> 
      {
        username ? (
          <div className="user-info flex items-center bg-gray-800 gap-2">
            <span className="text-white">Welcome, {username}</span>
            <Link to="/dashboard" className="text-white hover:text-gray-400">Dashboard</Link>
          </div>
        ) : (
          <div className="user-info flex items-center gap-2">
            <span className="text-white">Welcome, Guest</span>
            <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
            <Link to="/signup" className="text-white hover:text-gray-400">Sign Up</Link>

          </div>
        )
      }

    </div>
  );
}

export default Navbar;