import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Client from './pages/client/Client';
import LandingPage from './pages/LandingPage/LandingPage';
import EventDetail from './pages/LandingPage/EventDetail'; 
import Events from './pages/LandingPage/Events'; 
import { AuthContext } from './context/authContext';
import Auth from './pages/auth/Auth';

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/events" element={<Events />} /> 
        <Route path="/event-detail/:id" element={<EventDetail />} /> 
        {currentUser ? (
          <>
            {currentUser.role === 'admin' && <Route path="/*" element={<Admin />} />}
            {currentUser.role === 'user' && <Route path="/*" element={<Client />} />}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
