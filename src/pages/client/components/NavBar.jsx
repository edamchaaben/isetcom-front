import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

function NavBar() {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    window.location.reload(false);
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div>
          <Link to="/" className="text-white text-xl font-bold">MonSiteWeb</Link>
        </div>
        <div className="space-x-4">
          <Link to="/events" className="text-white hover:text-gray-300">Événements</Link>
          <Link to="/profile" className="text-white hover:text-gray-300">Profil</Link>
          <Link to="/" onClick={handleLogout} className="text-white hover:text-gray-300">Déconnexion</Link>
          <Link to="/StandSelection" className="text-white hover:text-gray-300">Stand</Link>
          <Link to="/Historique" className="text-white hover:text-gray-300">Mes réservations</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
