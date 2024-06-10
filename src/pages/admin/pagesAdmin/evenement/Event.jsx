import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './event.css';
import { useNavigate, Link } from 'react-router-dom';

function EventList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/event/all");
        setEvents(response.data);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleConsulter = (id) => {
    navigate(`/eventDetails/${id}`);
  };

  const handleSupprimer = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/event/deletebyid/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentDate = () => {
    return new Date().toISOString().slice(0, 10);
  };

  const currentDate = getCurrentDate();

  return (
    <div className="event-list-container">
      <h2>Liste des evenements</h2>
      <button className='button-add'><Link to="/ajouterEvent" style={{ textDecoration: 'none', color: 'white' }}>Ajouter Evenement</Link></button>

      {error ? (
        <div className="error-message">Error: {error}</div>
      ) : events.length > 0 ? (
        <ul className="event-list">
          {events.map(event => (
            <li key={event._id} className="event-card" style={{ borderColor: new Date(event.DateFin) < new Date(currentDate) ? 'red' : 'green' }}>
              <div className="event-content">
                <h3>{event.EventName}</h3>
                <p>{event.description}</p>
                <p>Start Date: {new Date(event.DateDebut).toLocaleDateString()}</p>
                <p>End Date: {new Date(event.DateFin).toLocaleDateString()}</p>
                <img src={`http://localhost:3002/${event.photo}`} alt="Event" className='event-image'/> 
              </div>
              <div className="button-container">
                <button className="modify-button" onClick={() => handleConsulter(event._id)}>Modifier</button>
                <button className="delete-button" onClick={() => handleSupprimer(event._id)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="loading-message">Chargement...</div>
      )}
    </div>
  );
}

export default EventList;
