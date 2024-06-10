import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Event from './pages/Event';
import EventSelectioner from './pages/EventSelectioner';
import Profile from './pages/Profile';
import ReservationHistory from './pages/reservationHistory';

function Client() {
  return (
    <Routes>
      <Route path="/client" element={<Layout><Home /></Layout>} />
      <Route path="/events" element={<Layout><Event /></Layout>} />
      <Route path="/event-selectione/:id" element={<Layout><EventSelectioner /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/Historique" element={<Layout><ReservationHistory /></Layout>} />
    </Routes>
  );
}

export default Client;
