import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      navigate('/'); // Redirect to Home after logout
    } catch (err) {
      console.error('Logout Error: ', err.message);
    }
  };

  return (
    <nav className="bg-gray-800 p-8 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h2 className="text-white text-3xl font-bold">Book & Media Recommender</h2>
        <ul className="flex space-x-6 text-white">
          <li><Link to="/">Home</Link></li>
          
          {/* Show Add Review only if logged in */}
          {auth.currentUser && (
            <li><Link to="/add-review">Add Review</Link></li>
          )}

          <li>
            {/* Show Login/Signup if not logged in, otherwise show Logout */}
            {!auth.currentUser ? (
              <>
                <Link to="/login" className="mr-4">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
