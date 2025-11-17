import logo from '../assets/logo.png'
import './navbar.css'
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
 const { user, loading } = useAuth();

  if (loading) return <p>Loading user...</p>;


    return (
        <div className='navbar'>
            <img src={logo} />
              <h1>Welcome, {user?.userName || "Guest"} 👋</h1>
        </div>
    )
}

export default Navbar