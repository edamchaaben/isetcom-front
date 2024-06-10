import React, { useState, useEffect } from 'react';
import { useParams  , useNavigate} from 'react-router-dom';
import axios from 'axios';
import './event.css'; 

function EventDetails() {
  const [event, setEvent] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState(null); 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/event/getid/${id}`);
        setEvent(response.data);
        setUpdatedEvent(response.data); 
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value }); 
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3002/event/update/${id}`, updatedEvent);
      console.log(updatedEvent);
      navigate('/event')
    } catch (error) {
      
    }
  };

  return (
    <div className="event-details-container">
     <h2>Détails de l'événement</h2>

      {event ? (
        <div className="event-details">
          <img src={`http://localhost:3002/${updatedEvent.photo}`} className='h-60 w-full' alt='' />
          <div className="detail-row">
            <label>Nom d'evenement:</label>
            <input
              type="text"
              name="EventName"
              value={updatedEvent.EventName}
              onChange={handleInputChange}
            />
          </div>
          <div className="detail-row">
          <label>Date debut:</label>
  <input
    type="datetime-local"
    name="DateDebut"
    value={updatedEvent.DateDebut ? updatedEvent.DateDebut.substring(0, 16) : ''}
    onChange={handleInputChange}
  />
</div>
<div className="detail-row">
  <label> Date fin:</label>
  <input
    type="datetime-local"
    name="DateFin"
    value={updatedEvent.DateFin ? updatedEvent.DateFin.substring(0, 16) : ''}
    onChange={handleInputChange}
  />
          </div>
          <div className="detail-row">
            <label>Description:</label>
            <textarea
              name="description"
              value={updatedEvent.description}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleUpdate}>modifier</button>
        </div>
      ) : (
        <div className="loading-message">Chargement...</div>
      )}
    </div>
  );
}

export default EventDetails;