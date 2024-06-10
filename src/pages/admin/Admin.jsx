import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pagesAdmin/home/Home';
import Utilisateur from './pagesAdmin/Utilisateurs/Utilisateur';

import Event from './pagesAdmin/evenement/Event';
import EventDetails from './pagesAdmin/evenementDetails/EventDetails';
import AjouterEvent from './pagesAdmin/ajouterEvent/AjouterEvent';
import AjouterUtilisateur from './pagesAdmin/ajouterUtilisateur/AjouterUtilisateur';
import UtilisateurDetails from './pagesAdmin/utilisateurDetails/UtilisateurDetails';
import Reservation from './pagesAdmin/resevations/Reservation';
import AdminPage from './pagesAdmin/interactive/PlanAdmin';

function Admin() {
  return (
    <Routes>
      <Route path="/admin" element={<Layout><Home /></Layout>} />
      <Route path="/utilisateur" element={<Layout><Utilisateur /></Layout>} />
      <Route path="/event" element={<Layout><Event /></Layout>} />
      <Route path="/eventDetails/:id" element={<Layout><EventDetails /></Layout>} />
      <Route path="/ajouterEvent" element={<Layout><AjouterEvent /></Layout>} />
      <Route path="/ajouterUtilisateur" element={<Layout><AjouterUtilisateur /></Layout>} />
      <Route path="/utilisateurDetails/:id" element={<Layout><UtilisateurDetails /></Layout>} />
      <Route path="/reservation" element={<Layout><Reservation /></Layout>} />
      <Route path="/parkManagement" element={<Layout><AdminPage /></Layout>} />
    </Routes>
  );
}

export default Admin;
