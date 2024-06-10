import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Event() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/event/all');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleConsulter = (id) => {
    navigate(`/event-selectione/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Liste des événements</h2>
      {loading ? (
        <div className="text-center">Chargement...</div>
      ) : error ? (
        <div className="text-red-500">Erreur: {error}</div>
      ) : events.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <li key={event._id} className="bg-white shadow-md rounded p-4">
              <img src={`http://localhost:3002/${event.photo}`} alt='' className='max-h-60 w-full'/>
              <h3 className="text-xl font-bold mb-2">{event.EventName}</h3>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <p className="text-gray-700">Date de début: {new Date(event.DateDebut).toLocaleDateString()}</p>
              <p className="text-gray-700">Date de fin: {new Date(event.DateFin).toLocaleDateString()}</p>
              <div className="mt-4">
                <button onClick={() => handleConsulter(event._id)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Consulter
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>Aucun événement trouvé</div>
      )}
    </div>
  );
}

export default Event;
