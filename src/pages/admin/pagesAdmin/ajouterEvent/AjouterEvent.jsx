import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ajouterEvent.css';

function AjouterEvent() {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('EventName', eventName);
      formData.append('DateDebut', startDate);
      formData.append('DateFin', endDate);
      formData.append('description', description);
      formData.append('photo', image); 

      const response = await axios.post('http://localhost:3002/event/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Event added successfully:', response.data);
      navigate('/event'); // Redirige vers la liste des événements après l'ajout
    } catch (error) {
      setError(error.message);
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="ajouter-event-container">
      <h2>Ajouter un nouvel événement</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom de l'événement:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date de début:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date de fin:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])} 
            accept="image/*" 
            required
          />
        </div>
        <button type="submit">Ajouter l'événement</button>
      </form>
    </div>
  );
}

export default AjouterEvent;
