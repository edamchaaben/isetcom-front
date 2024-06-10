import React, { useState, useEffect } from 'react';
import "./utilisateur.css";
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';

function Utilisateur() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConsulter = (id) => {
 navigate('/utilisateurDetails/'+id)
  };

  const handleSupprimer = async (id) => {
     try {
      await axios.delete(`http://localhost:3002/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } 
     catch(error) {
      console.error(error);
    }
     
  };

  return (
    <>
    <div className="stands-container">
      <h1>Les utilisateurs</h1>
      <button className='button-add'><Link to="/ajouterUtilisateur" style={{ textDecoration: 'none', color: 'white' }}>Ajouter Utilisateur</Link></button>
      <div className="utilisateur-container">
        {users.map((user, index) => (
          <div key={index} className="utilisateur-card">
            <div className="utilisateur-field">
              <span className="field-name">Name: </span>
              <span className="field-value">{user.name}</span>
            </div>
            <div className="utilisateur-field">
              <span className="field-name">Email: </span>
              <span className="field-value">{user.email}</span>
            </div>
            <div className="utilisateur-field">
              <span className="field-name">Role: </span>
              <span className="field-value">{user.role}</span>
            </div>
            <div className="utilisateur-field">
              <span className="field-name">Username: </span>
              <span className="field-value">{user.username}</span>
            </div>
            <div className="utilisateur-field">
              <span className="field-name">Phone: </span>
              <span className="field-value">{user.Phone}</span>
            </div>
            <div className="button-container">
              <button className="button-consulter" onClick={() => handleConsulter(user._id)}>Consulter</button>
              <button className="button-supprimer" onClick={() => handleSupprimer(user._id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default Utilisateur;
